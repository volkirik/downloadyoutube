'use strict';

const{classes:Cc,interfaces:Ci,utils:Cu}=Components;
Cu.import('resource://gre/modules/Services.jsm');

var YoutubempEngine={

packageName:'downloadyoutubemp4',
frameName:'',

init:function() {
	 let mm = Cc['@mozilla.org/globalmessagemanager;1'].getService(Ci.nsIMessageListenerManager);
	 YoutubempEngine.frameName = 'chrome://'+YoutubempEngine.packageName+'/content/overlay.js'+'?' + Math.random();
	 mm.loadFrameScript(YoutubempEngine.frameName, true); // workaround for frame caching bug - https://bugzilla.mozilla.org/show_bug.cgi?id=1051238
	 mm.broadcastAsyncMessage(YoutubempEngine.packageName+':init', YoutubempEngine.packageName);
	 mm.addMessageListener(YoutubempEngine.packageName+':savefileas', YoutubempEngine.saveFileAs);	 
	 mm.addMessageListener(YoutubempEngine.packageName+':setvalue', YoutubempEngine.setValue);
},

uninit:function() {
	 let mm = Cc['@mozilla.org/globalmessagemanager;1'].getService(Ci.nsIMessageListenerManager);
	 mm.broadcastAsyncMessage(YoutubempEngine.packageName+':uninit', '');
	 mm.removeMessageListener(YoutubempEngine.packageName+':savefileas', YoutubempEngine.saveFileAs);	 
	 mm.removeMessageListener(YoutubempEngine.packageName+':setvalue', YoutubempEngine.setValue);	 
	 mm.removeDelayedFrameScript(YoutubempEngine.frameName); // frame script is not loaded into any new tabs
},

saveFileAs: function(message) {
  let url = message.data.url;
  let filename = message.data.filename;
  //let win = message.objects.target;
  let nsIFilePicker = Ci.nsIFilePicker;
  let fp = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
  fp.defaultString = filename;
  let directoryString = YoutubempEngine.getValue({data:{pref:'download-youtube-last-directory'}});
  let directory = null;
  if (directoryString) { // last download directory
    try {
    directory = Cc['@mozilla.org/file/local;1'].
    createInstance(Ci.nsIFile).initWithPath(directoryString);
    } catch(e) { }
    if (directory === null) { // reset last download directory
      directoryString = null;
      YoutubempEngine.setValue({data:{pref:'download-youtube-last-directory', value:''}});
    }
  }
  if (directoryString === null) { // default download directory
    directory = null;
  }
  
  fp.displayDirectory = directory;
  let pos = filename.lastIndexOf('.');
  let extension = (pos>-1)?filename.substring(pos+1):'*';
  fp.appendFilter((extension=='m4a')?'Audio':'Video', '*.'+extension);
  
  var windowMediator = Cc['@mozilla.org/appshell/window-mediator;1'].
  getService(Ci.nsIWindowMediator);
  var window = windowMediator.getMostRecentWindow(null);
  
  fp.init(window, null, nsIFilePicker.modeSave);
  let fileBox = fp.show();
  try {
  if (fileBox == nsIFilePicker.returnOK || nsIFilePicker.returnReplace) {     
     let ioService = Cc['@mozilla.org/network/io-service;1'].
     getService(Ci.nsIIOService);
     let uri = ioService.newURI(url, null , null);
     let fileURI = ioService.newFileURI(fp.file);
     let persist = Cc['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Ci.nsIWebBrowserPersist);       
     let xfer = Cc['@mozilla.org/transfer;1'].createInstance(Ci.nsITransfer);
     let privacyContext = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIWebNavigation).QueryInterface(Ci.nsILoadContext);
     xfer.init(uri, fileURI, '', null, null, null, persist, false);  
     persist.progressListener = xfer;
     try { // Firefox 36+ (new parameter in Firefox 36: aReferrerPolicy)
      persist.saveURI(uri, null, null, 0, null, null, fp.file, privacyContext);
     } catch(e) { // Firefox <36 -> only 7 parameters
      persist.saveURI(uri, null, null, null, null, fp.file, privacyContext);
     }               
     if (fp.file.parent.path != directoryString) {
        YoutubempEngine.setValue({data:{pref:'download-youtube-last-directory', value:fp.file.parent.path}});
     }
   }
   } catch(e) { }
},

getValue: function(message) {
  let pref = message.data.pref;
  let settings = Cc['@mozilla.org/preferences-service;1'].
    getService(Ci.nsIPrefService).
    getBranch('extensions.'+YoutubempEngine.packageName+'.');
  let prefType = settings.getPrefType(pref);
  return (prefType == settings.PREF_STRING)?settings.getCharPref(pref):null;
},

setValue: function(message) {
  let pref = message.data.pref;
  let value = message.data.value;
  let settings = Cc['@mozilla.org/preferences-service;1'].
    getService(Ci.nsIPrefService).
    getBranch('extensions.'+YoutubempEngine.packageName+'.');  
  settings.setCharPref(pref, value);
}
}

function startup(data,reason) {
  let alias = Services.io.newFileURI(data.installPath);
  if (!data.installPath.isDirectory()) {
    alias = Services.io.newURI('jar:' + alias.spec + '!/', null, null);
  }
  // resource registration
  let resource = Services.io.getProtocolHandler('resource').QueryInterface(Ci.nsIResProtocolHandler);
  resource.setSubstitution(YoutubempEngine.packageName, alias);  
	YoutubempEngine.init();
}

function shutdown(data,reason) {
  // remove resource registration
  let resource = Services.io.getProtocolHandler('resource').QueryInterface(Ci.nsIResProtocolHandler);
  resource.setSubstitution(YoutubempEngine.packageName, null);
	YoutubempEngine.uninit();
}

function install(data,reason) {}
function uninstall(data,reason) {}
