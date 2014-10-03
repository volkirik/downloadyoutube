'use strict';

let YoutubempEngine={

packageName: '',

dataStorage: function () { // GM_getValue, GM_setValue
  YoutubempEngine.packageName = YoutubempEngine.packageName||'downloadyoutubemp4';
  this.pref = Components.classes['@mozilla.org/preferences-service;1'].
    getService(Components.interfaces.nsIPrefService).
    getBranch('extensions.'+YoutubempEngine.packageName+'.');    
  this.getValue = function(prefName, defaultValue) {
    let prefType = this.pref.getPrefType(prefName);
    return (prefType == this.pref.PREF_STRING)?this.pref.getCharPref(prefName):defaultValue;
  }
  this.setValue = function(prefName, value) {
    if (typeof value == 'string') {
      this.pref.setCharPref(prefName, value);
    }
  }  
},

crossXHR: function (unsafeContentWin, chromeWindow) { // GM_xmlhttpRequest
  this.unsafeContentWin = unsafeContentWin;
  this.chromeWindow = chromeWindow;
  this.contentStartRequest = function(details) {
    if (Components.utils.waiveXrays) { // bypass xrays protection Firefox 32+
      details = Components.utils.waiveXrays(details);
    }    
    let url = details.url;
    if (typeof url != 'string' || !/^https?:\/\//.test(url)) {
      throw new Error('crossXHR: Invalid url '+url);
    }
    this.chromeWindow.setTimeout(YoutubempEngine.hitch(this, 'chromeStartRequest', details), 0);
  }
  this.chromeStartRequest = function(details) {
    let req = new this.chromeWindow.XMLHttpRequest();
    this.setupRequestEvent(this.unsafeContentWin, req, 'load', details);
    this.setupRequestEvent(this.unsafeContentWin, req, 'error', details);
    this.setupRequestEvent(this.unsafeContentWin, req, 'readystatechange', details);
    req.open(details.method, details.url);
    req.send(details.data);
  }
  this.setupRequestEvent = function(unsafeContentWin, req, event, details) {
    if (!details['on' + event]) return; //xray error
    req.addEventListener(event, function(evt) {
       let responseState = {
          __exposedProps__: {readyState:'r',responseText:'r',responseHeaders:'r',status:'r',statusText:'r'},
          responseText: req.responseText,
          responseHeaders: req.getAllResponseHeaders(),
          readyState: req.readyState,
          status: (req.readyState==4)?req.status:0,
          statusText: (req.readyState==4)?req.statusText:''
        };
        new XPCNativeWrapper(unsafeContentWin, 'setTimeout()')
          .setTimeout(function(){ details['on' + event](responseState); }, 0);
    }, false);
  }  
},
  
hitch: function (obj, method) {
  if (obj && method && (typeof method == 'string')) {
    if (!obj[method]) {
      throw 'Hitch: '+obj+'.'+method+' does not exist';
    }
    method = obj[method];
  } else if (typeof method == 'function') {
    obj = obj || {};
  } else {
    throw 'Hitch: Invalid arguments';
  }
  let staticArgs = Array.prototype.splice.call(arguments, 2, arguments.length);
  return function() {
    let args = Array.prototype.slice.call(staticArgs);
    Array.prototype.push.apply(args, arguments);
    return method.apply(obj, args);
  };
},

downloadFile: function(url, filename) {
  let nsIFilePicker = Components.interfaces.nsIFilePicker;
  let fp = Components.classes['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
  fp.defaultString = filename;
  let storage = new YoutubempEngine.dataStorage();
  let directoryString = storage.getValue('download-youtube-last-directory', null);
  let directory = null;
  if (directoryString) { // last download directory
    try {
    directory = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile).initWithPath(directoryString);
    } catch(e) { }
    if (directory === null) { // reset last download directory
      directoryString = null;
      storage.setValue('download-youtube-last-directory', '');
    }
  }
  if (directoryString === null) { // default download directory
    directory = null;
  }
   
  fp.displayDirectory = directory;
  let pos = filename.lastIndexOf('.');
  let extension = (pos>-1)?filename.substring(pos+1):'*';
  fp.appendFilter((extension=='m4a')?'Audio':'Video', '*.'+extension);
  fp.init(window, null, nsIFilePicker.modeSave);
  let fileBox = fp.show();
  try {
  if (fileBox == nsIFilePicker.returnOK || nsIFilePicker.returnReplace) {     
     let ioService = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
     let uri = ioService.newURI(url, null , null);
     let fileURI = ioService.newFileURI(fp.file);
     let persist = Components.classes['@mozilla.org/embedding/browser/nsWebBrowserPersist;1'].createInstance(Components.interfaces.nsIWebBrowserPersist);       
     let xfer = Components.classes['@mozilla.org/transfer;1'].createInstance(Components.interfaces.nsITransfer);
     let privacyContext = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsILoadContext);
     xfer.init(uri, fileURI, '', null, null, null, persist, false);  
     persist.progressListener = xfer;
     persist.saveURI(uri, null, null, null, null, fp.file, privacyContext);
     if (fp.file.parent.path != directoryString) {
        storage.setValue('download-youtube-last-directory', fp.file.parent.path);
     }
   }
   } catch(e) {}
},

getUrlContents: function(url) {
    let	ioService = Components.classes['@mozilla.org/network/io-service;1']
    .getService(Components.interfaces.nsIIOService);
    let	scriptableStream = Components
    .classes['@mozilla.org/scriptableinputstream;1']
    .getService(Components.interfaces.nsIScriptableInputStream);
    let unicodeConverter = Components
    .classes['@mozilla.org/intl/scriptableunicodeconverter']
    .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
    unicodeConverter.charset = 'UTF-8';
    let	input = ioService.newChannel(url, 'UTF-8', null).open();
    scriptableStream.init(input);
    let	str = scriptableStream.read(input.available());
    scriptableStream.close();
    input.close();
    try {
      return unicodeConverter.ConvertToUnicode(str);
    } catch (e) {
      return str;
    }
},

contentLoad: function(e) {
    let unsafeWin = e.target.defaultView;
    if (unsafeWin.wrappedJSObject) {
      unsafeWin = unsafeWin.wrappedJSObject;
    }
    if (unsafeWin.frameElement) { // ignore frames
      return;
    }      
    let unsafeLoc = new XPCNativeWrapper(unsafeWin, 'location').location;
    let href = new XPCNativeWrapper(unsafeLoc, 'href').href;
    let scheme = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).extractScheme(href);   
    if ((scheme == 'http' || scheme == 'https') && 
    /^https?:\/\/www\.youtube\.com\//.test(href) && 
    !/^https?:\/\/www\.youtube\.com\/embed\//.test(href)) { // inject script
      let safeWin = new XPCNativeWrapper(unsafeWin);
      let sandbox = new Components.utils.Sandbox(safeWin, {'sandboxPrototype':safeWin, 'wantXrays':true});
      sandbox.unsafeWindow = unsafeWin;
      let storage = new YoutubempEngine.dataStorage();
      sandbox.GM_getValue = YoutubempEngine.hitch(storage, 'getValue');
      sandbox.GM_setValue = YoutubempEngine.hitch(storage, 'setValue');
      let xmlhttpRequester = new YoutubempEngine.crossXHR(unsafeWin, window);
      sandbox.GM_xmlhttpRequest = YoutubempEngine.hitch(xmlhttpRequester, 'contentStartRequest');      
      sandbox.GM_download = YoutubempEngine.downloadFile;
      try {
          let script = YoutubempEngine.getUrlContents('resource://'+YoutubempEngine.packageName+'/content/yt.user.js');
          Components.utils.evalInSandbox(script, sandbox);
      } catch (e) { }
    }       
},

init: function(name) {
    YoutubempEngine.packageName = name;
    let appcontent = window.document.getElementById('appcontent');    
    if (appcontent) {
        appcontent.addEventListener('DOMContentLoaded', YoutubempEngine.contentLoad, false);
    }
},

uninit: function() {
    window.removeEventListener('load', YoutubempEngine.init, false);
    window.removeEventListener('unload', YoutubempEngine.uninit, false);
    let appcontent = window.document.getElementById('appcontent');    
    if (appcontent) {
        appcontent.removeEventListener('DOMContentLoaded', YoutubempEngine.contentLoad, false);
    }    
}

}