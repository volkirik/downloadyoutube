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
  let nsIFilePicker = Components.interfaces.nsIFilePicker;
  let fp = Components.classes['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
  fp.defaultString = filename;
  let directoryString = YoutubempEngine.getValue({data:{pref:'download-youtube-last-directory'}});
  let directory = null;
  if (directoryString) { // last download directory
    try {
    directory = Components.classes['@mozilla.org/file/local;1'].
    createInstance(Components.interfaces.nsIFile).initWithPath(directoryString);
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
  
  var windowMediator = Components.classes['@mozilla.org/appshell/window-mediator;1'].
  getService(Components.interfaces.nsIWindowMediator);
  var window = windowMediator.getMostRecentWindow(null);
  
  fp.init(window, null, nsIFilePicker.modeSave);
  let fileBox = fp.show();
  try {
  if (fileBox == nsIFilePicker.returnOK || nsIFilePicker.returnReplace) {     
     let ioService = Components.classes['@mozilla.org/network/io-service;1'].
     getService(Components.interfaces.nsIIOService);
     let uri = ioService.newURI(url, null , null);
     let fileURI = ioService.newFileURI(fp.file);
     let persist = Components.classes['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Components.interfaces.nsIWebBrowserPersist);       
     let xfer = Components.classes['@mozilla.org/transfer;1'].createInstance(Components.interfaces.nsITransfer);
     let privacyContext = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsILoadContext);
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
  let settings = Components.classes['@mozilla.org/preferences-service;1'].
    getService(Components.interfaces.nsIPrefService).
    getBranch('extensions.'+YoutubempEngine.packageName+'.');
  let prefType = settings.getPrefType(pref);
  return (prefType == settings.PREF_STRING)?settings.getCharPref(pref):null;
},

setValue: function(message) {
  let pref = message.data.pref;
  let value = message.data.value;
  let settings = Components.classes['@mozilla.org/preferences-service;1'].
    getService(Components.interfaces.nsIPrefService).
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
