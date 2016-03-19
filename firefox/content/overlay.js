'use strict';

let YoutubempEngine={

packageName: 'downloadyoutubemp4',
safeWin: null,
target: null,

dataStorage: function () { // GM_getValue, GM_setValue
  this.pref = Components.classes['@mozilla.org/preferences-service;1'].
    getService(Components.interfaces.nsIPrefService).
    getBranch('extensions.'+YoutubempEngine.packageName+'.');    
  this.getValue = function(prefName, defaultValue) {
    let prefType = this.pref.getPrefType(prefName);
    return (prefType == this.pref.PREF_STRING)?this.pref.getCharPref(prefName):defaultValue;
  }
  this.setValue = function(prefName, value) {
    if (typeof value == 'string') {
      sendAsyncMessage(YoutubempEngine.packageName+':setvalue', {pref:prefName,value:value});
    }
  }  
},

crossXHR: function (unsafeContentWin) { // GM_xmlhttpRequest
  this.unsafeContentWin = unsafeContentWin;
  this.contentStartRequest = function(details) {
    if (Components.utils.waiveXrays) { // bypass xrays protection Firefox 32+
      details = Components.utils.waiveXrays(details);
    }    
    let url = details.url;
    if (typeof url != 'string' || !/^https?:\/\//.test(url)) {
      throw new Error('crossXHR: Invalid url '+url);
    }
    new XPCNativeWrapper(unsafeContentWin, 'setTimeout()')
    .setTimeout(YoutubempEngine.hitch(this, 'chromeStartRequest', details), 0);
  }
  this.chromeStartRequest = function(details) {
    let req = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1']
    .createInstance(Components.interfaces.nsIXMLHttpRequest);
    this.setupRequestEvent(this.unsafeContentWin, req, 'load', details);
    this.setupRequestEvent(this.unsafeContentWin, req, 'error', details);
    this.setupRequestEvent(this.unsafeContentWin, req, 'readystatechange', details);
    req.open(details.method, details.url);
    req.send(details.data);
  }
  this.setupRequestEvent = function(unsafeContentWin, req, event, details) {
    if (!details['on' + event]) return; 
    req.addEventListener(event, function(evt) {
       let responseState = {
       // __exposedProps__ is deprecated, but it's still used for Firefox < 35
          __exposedProps__: {readyState:'r',responseText:'r',
          responseHeaders:'r',status:'r',statusText:'r'},       
          responseText: req.responseText,
          responseHeaders: req.getAllResponseHeaders(),
          readyState: req.readyState,
          status: (req.readyState==4)?req.status:0,
          statusText: (req.readyState==4)?req.statusText:''
        };
        let state = responseState;
        // __exposedProps__ alternative, cloneInto requires Firefox 35+
        if (typeof Components.utils.cloneInto == 'function') {
          state = Components.utils.cloneInto(responseState,unsafeContentWin);
        }
        new XPCNativeWrapper(unsafeContentWin, 'setTimeout()')
          .setTimeout(function(){ details['on' + event](state); }, 0);
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
    sendAsyncMessage(YoutubempEngine.packageName+':savefileas', 
    {url:url,filename:filename}, {target:YoutubempEngine.target});
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
    let input = null;
    if (typeof ioService.newChannel == 'function') { // deprecated in Firefox 48
    	input = ioService.newChannel(url, 'UTF-8', null).open();
    } else {
    	input = ioService.newChannel2(url, 'UTF-8', null, null, null, null, 
    	Components.interfaces.nsILoadInfo.SEC_NORMAL, 
    	Components.interfaces.nsIContentPolicy.TYPE_OTHER).open();
    }    
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
    YoutubempEngine.target = e.target;
    let unsafeWin = e.target.defaultView;
    if (unsafeWin.wrappedJSObject) {
      unsafeWin = unsafeWin.wrappedJSObject;
    }
    if (unsafeWin.frameElement) { // ignore frames
      return;
    }      
    let unsafeLoc = new XPCNativeWrapper(unsafeWin, 'location').location;
    let href = new XPCNativeWrapper(unsafeLoc, 'href').href;
    let scheme = Components.classes['@mozilla.org/network/io-service;1']
    .getService(Components.interfaces.nsIIOService).extractScheme(href);   
    if ((scheme == 'http' || scheme == 'https') && 
    /^https?:\/\/www\.youtube\.com\//.test(href) && 
    !/^https?:\/\/www\.youtube\.com\/embed\//.test(href)) { // inject script
      let safeWin = new XPCNativeWrapper(unsafeWin);
      YoutubempEngine.safeWin = e.target.defaultView;
      let sandbox = new Components.utils.Sandbox(safeWin, 
      {'sandboxPrototype':safeWin, 'wantXrays':true});
      var unsafeWindowGetter = new sandbox.Function('return window.wrappedJSObject || window;');
      Object.defineProperty(sandbox, 'unsafeWindow', {get: unsafeWindowGetter});
      let storage = new YoutubempEngine.dataStorage();
      sandbox.GM_getValue = YoutubempEngine.hitch(storage, 'getValue');
      sandbox.GM_setValue = YoutubempEngine.hitch(storage, 'setValue');
      let xmlhttpRequester = new YoutubempEngine.crossXHR(unsafeWin);
      sandbox.GM_xmlhttpRequest = YoutubempEngine.hitch(xmlhttpRequester, 'contentStartRequest');      
      sandbox.GM_download = YoutubempEngine.downloadFile;
      try {
          let script = YoutubempEngine.getUrlContents(
          'resource://'+YoutubempEngine.packageName+'/content/yt.user.js');
          Components.utils.evalInSandbox(script, sandbox);
      } catch (e) { }
    }       
},

inject: function(event) {
  let doc = event.originalTarget;
  if (doc.nodeName != '#document') return; // only documents 
  YoutubempEngine.contentLoad(event);
  //removeEventListener('DOMContentLoaded', YoutubempEngine.inject);
},

init: function() {
  addEventListener('DOMContentLoaded', YoutubempEngine.inject);
},

uninit: function() {
  removeEventListener('DOMContentLoaded', YoutubempEngine.inject);
}

}

// addMessageListener(YoutubempEngine.packageName+':init', YoutubempEngine.init);
// addMessageListener(YoutubempEngine.packageName+':uninit', YoutubempEngine.uninit);

addEventListener('DOMContentLoaded', YoutubempEngine.inject);