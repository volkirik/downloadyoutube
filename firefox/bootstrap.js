'use strict';

const{classes:Cc,interfaces:Ci,utils:Cu}=Components;
Cu.import('resource://gre/modules/Services.jsm');

var YoutubempEngine={

_windowtype:'navigator:browser',
packageName:'downloadyoutubemp4',

get _windows() {
	let wins=[];
	this._windowtype||(this._windowtype='navigator:browser');
	let cw=Services.wm.getEnumerator(this._windowtype);
	while (cw.hasMoreElements()) {
		let win=cw.getNext();
		win.QueryInterface(Ci.nsIDOMWindow);
		wins.push(win);
	}
	return wins;
},

handleEvent:function(e) {
	let doc=e.target;
	let win=doc.defaultView;
	win.removeEventListener('load',this,true);
	if (doc.documentElement.getAttribute('windowtype')!==this._windowtype) return;
	this.loadScript(win);
},

loadScript:function(win) {
  Services.scriptloader.loadSubScript('resource://'+YoutubempEngine.packageName+'/content/overlay.js',win,'UTF-8');
	'YoutubempEngine' in win && typeof win.YoutubempEngine.init==='function' && win.YoutubempEngine.init(YoutubempEngine.packageName);
},

unloadScript:function(win) {
	'YoutubempEngine' in win && typeof win.YoutubempEngine.uninit==='function' && win.YoutubempEngine.uninit();
},

onOpenWindow:function(aWindow) {
	let win=aWindow.docShell.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindow);
	win.addEventListener('load',this,true);
},

onCloseWindow:function(aWindow) {},

onWindowTitleChange:function(aWindow,aTitle) {},

init:function() {
	this._wm=Services.wm;
	this._wm.addListener(this);
	this._windows.forEach(function(win){this.loadScript(win)},this);
},

uninit:function() {
	if (this._wm) {
    this._wm.removeListener(this);
  }
	delete this._wm;
	this._windows.forEach(function(win){this.unloadScript(win)},this);
}

}

function startup(data,reason) {
  // resource registration
  let resource = Services.io.getProtocolHandler('resource').QueryInterface(Ci.nsIResProtocolHandler);
  let alias = Services.io.newFileURI(data.installPath);
  if (!data.installPath.isDirectory()) {
    alias = Services.io.newURI('jar:' + alias.spec + '!/', null, null);
  }
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
