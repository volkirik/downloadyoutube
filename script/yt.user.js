// ==UserScript==
// @name Download YouTube Videos as MP4
// @description Adds a button that lets you download YouTube videos.
// @homepageURL https://openuserjs.org/scripts/volkan-k/Download_YouTube_Videos_as_MP4
// @author Gantt, volkan-k
// @copyright 2018, volkan-k (https://openuserjs.org/users/volkan-k)
// @version 2.1
// @date 2018-06-20
// @namespace http://googlesystem.blogspot.com
// @include http://www.youtube.com/*
// @include https://www.youtube.com/*
// @exclude http://www.youtube.com/embed/*
// @exclude https://www.youtube.com/embed/*
// @match http://www.youtube.com/*
// @match https://www.youtube.com/*
// @match http://s.ytimg.com/yts/jsbin/*
// @match https://s.ytimg.com/yts/jsbin/*
// @match http://manifest.googlevideo.com/*
// @match https://manifest.googlevideo.com/*
// @match http://*.googlevideo.com/videoplayback*
// @match https://*.googlevideo.com/videoplayback*
// @match http://*.youtube.com/videoplayback*
// @match https://*.youtube.com/videoplayback*
// @connect googlevideo.com
// @connect ytimg.com
// @connect cloudflare.com
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_download
// @grant GM_info
// @grant GM_openInTab
// @grant unsafeWindow
// @run-at document-end
// @license     MIT
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAB3RJTUUH2wMOCgIoGUYEAQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAAGSUExURfi/JO/v797e3sbGxq2traWlpZSUlJycnNbW1oyEhIRaWow5OZQhIZwYGKUQEKUICK0ICJQxMYxKSoxzc4x7e4RCQpQYGKUAAK0AALUAAL0AAK0QEIxra5QpKa0YGIxSUsYAAKUhIZR7e87Ozr0ICJRSUr29vYxjY6U5OaUpKa0hIb21tZwAALUICO/Ozu/GxqUxMZSEhLUYGO/W1r0YGKVCQpQQEL0pKffe3vfW1pxra5Q5OcZCQvfn585CQr2trZx7e8ZSUs5SUq05Oc5jY9ZjY84AAKWMjM5zc957e60pKdaMjOelpbWcnLWUlLVCQsYYGMYICNbOzpQICMYhIbV7e5xaWt6cnPfv79bGxt6lpe+9vc5KSs6lpb0xMc6EhM69vbUxMbUhIb1aWs61tcZaWuecnMYxMb1KSsZjY96UlNa1td7W1r17e9a9vZwQEN6trb1jY8YQENZra+fOzr1zc85aWufe3t6MjMY5OdZaWt61tdZ7e+/n5+e9vc6MjMZra+/e3ue1tdalpd7GxrUpKalL4aAAAAABdFJOUwBA5thmAAACxklEQVR42uXX/1/SQBgH8NuAoEQ2ijgbBivJLznBAiUUKiyJSgOVAk0tKZKw75mRRt/7v4MBY8ezjW39Vs8v8rqHz/u1jbvbidC/XL8KmcpOqVT6nSjXjooGw8WfFd+QWGfE4oLbtbr++PdMOy0BDYLjEj/0xevfWIyVAI7b/aIj/9WHsRrA8Yf9bqSexVgD4Lic9kWE/LgPwPGfNfJHDO4P8Iuq+S2M9QD8oUp+nxEAcFCtfgIA/14x/9ElAKDQbNQAwN9VAiYEABy0OgsAWAnB/AcBAtVWawkAfJ4CD0BQADZavYcQgI9h3CCQjpD5PcEgwG+SwLRhIL0vz78SjAPEU3hrHODfyX4I6rUJIP0G3oExoNwFXpoB+HwXmDEFpF9IwKA5YK+Tp9fMAdUOsC6YA553gKcmgdTfAhV1oMQqADndQDmJ0AZLAsFnCIV3VYDHJLAjDkZKciAaFz/lCeBJB1glgXBrNLndBWLJ9uZGAI+keTBLANL8SnWAzWRniAC2pG+6lQF0hfjTqCIBrEvjDwiggFSLuIUoLY0vEwAbUcsnc/LlnO02HGvEz+hXEeJ5Yj+4L2vNkxOJDSnlQzliIq2synr3embiUBjmw0FyU83KX04Ob+9aAK/Ppd5deZloz4HFlCHzt3sX0x2a6LcvQb4ab8r7i+DVdqvnCq/D5ZzqdhfAcr5B9wD0PNwPEu0ZnLwK9oPgNfCQJ2fhhhITJ3E8BjeUOXA+QNQlBh5xLjemVCgKjzgzNIJFjWF4yJoKhafgIWt6VHGmjgR0HvMuTipPdWQJ6AImbBRSE8aY/sC4er5xFx5vHyB4YRRpFWUf0AL4c+dHkHZRFo9TDeB9Aa3Llwjr8FlFwB+wO/rHm0VbPae9mPini/O5h/XGxatw2I6fGHAOuhiGZVxO98lTdgutP94yaIvVdqxZdpvFYTT9X9UfqQQlTXlm8wkAAAAASUVORK5CYII=
// @require 	https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require 	https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require 	https://cdnjs.cloudflare.com/ajax/libs/filesize/3.6.1/filesize.min.js
// ==/UserScript==

(function() {
	var FORMAT_LABEL = {
		'5': 'FLV 240p',
		'18': 'MP4 360p',
		'22': 'MP4 720p',
		'34': 'FLV 360p',
		'35': 'FLV 480p',
		'37': 'MP4 1080p',
		'38': 'MP4 2160p',
		'43': 'WebM 360p',
		'44': 'WebM 480p',
		'45': 'WebM 720p',
		'46': 'WebM 1080p',
		'135': 'MP4 480p - no audio',
		'137': 'MP4 1080p - no audio',
		'138': 'MP4 2160p - no audio',
		'139': 'M4A 48kbps - audio',
		'140': 'M4A 128kbps - audio',
		'141': 'M4A 256kbps - audio',
		'264': 'MP4 1440p - no audio',
		'266': 'MP4 2160p - no audio',
		'298': 'MP4 720p60 - no audio',
		'299': 'MP4 1080p60 - no audio'
	};
	var FORMAT_TYPE = {
		'5': 'flv',
		'18': 'mp4',
		'22': 'mp4',
		'34': 'flv',
		'35': 'flv',
		'37': 'mp4',
		'38': 'mp4',
		'43': 'webm',
		'44': 'webm',
		'45': 'webm',
		'46': 'webm',
		'135': 'mp4',
		'137': 'mp4',
		'138': 'mp4',
		'139': 'm4a',
		'140': 'm4a',
		'141': 'm4a',
		'264': 'mp4',
		'266': 'mp4',
		'298': 'mp4',
		'299': 'mp4'
	};
	var FORMAT_ORDER = ['5', '34', '18', '43', '35', '135', '44', '22', '298', '45', '37', '137', '299', '46', '264', '38', '138', '266', '139', '140', '141'];
	var FORMAT_RULE = {
		'flv': 'all',
		'mp4': 'all',
		'webm': 'all',
		'm4a': 'all'
	};
	// all=display all versions, max=only highest quality version, none=no version  
	// the default settings show all MP4,FLV and WebM videos
	var SHOW_DASH_FORMATS = false;
	var BUTTON_TEXT = {
		'ar': 'تنزيل',
		'cs': 'Stáhnout',
		'de': 'Herunterladen',
		'en': 'Download',
		'es': 'Descargar',
		'fr': 'Télécharger',
		'hi': 'डाउनलोड',
		'hu': 'Letöltés',
		'id': 'Unduh',
		'it': 'Scarica',
		'ja': 'ダウンロード',
		'ko': '내려받기',
		'pl': 'Pobierz',
		'pt': 'Baixar',
		'ro': 'Descărcați',
		'ru': 'Скачать',
		'tr': 'İndir',
		'zh': '下载',
		'zh-TW': '下載'
	};
	var BUTTON_TOOLTIP = {
		'ar': 'تنزيل هذا الفيديو',
		'cs': 'Stáhnout toto video',
		'de': 'Dieses Video herunterladen',
		'en': 'Download this video',
		'es': 'Descargar este vídeo',
		'fr': 'Télécharger cette vidéo',
		'hi': 'वीडियो डाउनलोड करें',
		'hu': 'Videó letöltése',
		'id': 'Unduh video ini',
		'it': 'Scarica questo video',
		'ja': 'このビデオをダウンロードする',
		'ko': '이 비디오를 내려받기',
		'pl': 'Pobierz plik wideo',
		'pt': 'Baixar este vídeo',
		'ro': 'Descărcați acest videoclip',
		'ru': 'Скачать это видео',
		'tr': 'Bu videoyu indir',
		'zh': '下载此视频',
		'zh-TW': '下載此影片'
	};
	var DECODE_RULE = [0, 50, -2, 0, -3]; // positive = swap , zero = reverse, negative=slice
	var RANDOM = 7489235179; // Math.floor(Math.random()*1234567890);
	var CONTAINER_ID = 'download-youtube-video' + RANDOM;
	var LISTITEM_ID = 'download-youtube-video-fmt' + RANDOM;
	var BUTTON_ID = 'download-youtube-video-button' + RANDOM;
	var DEBUG_ID = 'download-youtube-video-debug-info';
	var STORAGE_URL = 'download-youtube-script-url';
	var STORAGE_CODE = 'download-youtube-signature-code';
	var STORAGE_DASH = 'download-youtube-dash-enabled';
	var isDecodeRuleUpdated = false;
	var DIALOG_ID='yt_download'+RANDOM;
	var dl_handle, download_div,progressbar,progressLabel;
	var is_downloading=false;

	if (typeof GM_openInTab === "undefined") {
		GM_openInTab = window.open;
	}
	
	if (typeof GM_info.downloadMode === "undefined") {
		GM_info.downloadMode = "browser";
	}

	start();

	function start() {
		var pagecontainer = document.getElementById('page-container');
		if (!pagecontainer) {
			pagecontainer = document.getElementsByTagName('ytd-app');
		}
		if (!pagecontainer) return;
		if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();
		var isAjax = /class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
		var logocontainer = document.getElementById('logo-container');
		if (logocontainer && !isAjax) { // fix for blocked videos
			isAjax = (' ' + logocontainer.className + ' ').indexOf(' spf-link ') >= 0;
		}
		var content = document.getElementById('content');
		if (isAjax && content) { // Ajax UI
			var mo = window.MutationObserver || window.WebKitMutationObserver;
			if (typeof mo !== 'undefined') {
				var observer = new mo(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.addedNodes !== null) {
							for (var i = 0; i < mutation.addedNodes.length; i++) {
								if (mutation.addedNodes[i].id == 'watch7-main-container') { // || id=='watch7-container'
									run();
									break;
								}
							}
						}
					});
				});
				observer.observe(content, {
					childList: true,
					subtree: true
				}); // old value: pagecontainer
			} else { // MutationObserver fallback for old browsers
				pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
			}
		}
	}

	function onNodeInserted(e) {
		if (e && e.target && (e.target.id == 'watch7-main-container')) { // || id=='watch7-container'
			run();
		}
	}

	function add_download_button() {
		if (document.getElementById("dl-button-2018")) {
			return;
		}
		if (document.querySelector("div.ytp-right-controls") === null) {
			return;
		}
		document.querySelector("div.ytp-right-controls").insertAdjacentHTML("afterBegin",
			'<button class="ytp-button" id="dl-button-2018" style="" title="Download">' +
			'<img style="display: block; margin: auto;" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ3NS4wNzggNDc1LjA3NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc1LjA3OCA0NzUuMDc3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ2Ny4wODMsMzE4LjYyN2MtNS4zMjQtNS4zMjgtMTEuOC03Ljk5NC0xOS40MS03Ljk5NEgzMTUuMTk1bC0zOC44MjgsMzguODI3Yy0xMS4wNCwxMC42NTctMjMuOTgyLDE1Ljk4OC0zOC44MjgsMTUuOTg4ICAgIGMtMTQuODQzLDAtMjcuNzg5LTUuMzI0LTM4LjgyOC0xNS45ODhsLTM4LjU0My0zOC44MjdIMjcuNDA4Yy03LjYxMiwwLTE0LjA4MywyLjY2OS0xOS40MTQsNy45OTQgICAgQzIuNjY0LDMyMy45NTUsMCwzMzAuNDI3LDAsMzM4LjA0NHY5MS4zNThjMCw3LjYxNCwyLjY2NCwxNC4wODUsNy45OTQsMTkuNDE0YzUuMzMsNS4zMjgsMTEuODAxLDcuOTksMTkuNDE0LDcuOTloNDIwLjI2NiAgICBjNy42MSwwLDE0LjA4Ni0yLjY2MiwxOS40MS03Ljk5YzUuMzMyLTUuMzI5LDcuOTk0LTExLjgsNy45OTQtMTkuNDE0di05MS4zNThDNDc1LjA3OCwzMzAuNDI3LDQ3Mi40MTYsMzIzLjk1NSw0NjcuMDgzLDMxOC42Mjd6ICAgICBNMzYwLjAyNSw0MTQuODQxYy0zLjYyMSwzLjYxNy03LjkwNSw1LjQyNC0xMi44NTQsNS40MjRzLTkuMjI3LTEuODA3LTEyLjg0Ny01LjQyNGMtMy42MTQtMy42MTctNS40MjEtNy44OTgtNS40MjEtMTIuODQ0ICAgIGMwLTQuOTQ4LDEuODA3LTkuMjM2LDUuNDIxLTEyLjg0N2MzLjYyLTMuNjIsNy44OTgtNS40MzEsMTIuODQ3LTUuNDMxczkuMjMyLDEuODExLDEyLjg1NCw1LjQzMSAgICBjMy42MTMsMy42MSw1LjQyMSw3Ljg5OCw1LjQyMSwxMi44NDdDMzY1LjQ0Niw0MDYuOTQyLDM2My42MzgsNDExLjIyNCwzNjAuMDI1LDQxNC44NDF6IE00MzMuMTA5LDQxNC44NDEgICAgYy0zLjYxNCwzLjYxNy03Ljg5OCw1LjQyNC0xMi44NDgsNS40MjRjLTQuOTQ4LDAtOS4yMjktMS44MDctMTIuODQ3LTUuNDI0Yy0zLjYxMy0zLjYxNy01LjQyLTcuODk4LTUuNDItMTIuODQ0ICAgIGMwLTQuOTQ4LDEuODA3LTkuMjM2LDUuNDItMTIuODQ3YzMuNjE3LTMuNjIsNy44OTgtNS40MzEsMTIuODQ3LTUuNDMxYzQuOTQ5LDAsOS4yMzMsMS44MTEsMTIuODQ4LDUuNDMxICAgIGMzLjYxNywzLjYxLDUuNDI3LDcuODk4LDUuNDI3LDEyLjg0N0M0MzguNTM2LDQwNi45NDIsNDM2LjcyOSw0MTEuMjI0LDQzMy4xMDksNDE0Ljg0MXoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNMjI0LjY5MiwzMjMuNDc5YzMuNDI4LDMuNjEzLDcuNzEsNS40MjEsMTIuODQ3LDUuNDIxYzUuMTQxLDAsOS40MTgtMS44MDgsMTIuODQ3LTUuNDIxbDEyNy45MDctMTI3LjkwOCAgICBjNS44OTktNS41MTksNy4yMzQtMTIuMTgyLDMuOTk3LTE5Ljk4NmMtMy4yMy03LjQyMS04Ljg0Ny0xMS4xMzItMTYuODQ0LTExLjEzNmgtNzMuMDkxVjM2LjU0M2MwLTQuOTQ4LTEuODExLTkuMjMxLTUuNDIxLTEyLjg0NyAgICBjLTMuNjItMy42MTctNy45MDEtNS40MjYtMTIuODQ3LTUuNDI2aC03My4wOTZjLTQuOTQ2LDAtOS4yMjksMS44MDktMTIuODQ3LDUuNDI2Yy0zLjYxNSwzLjYxNi01LjQyNCw3Ljg5OC01LjQyNCwxMi44NDdWMTY0LjQ1ICAgIGgtNzMuMDg5Yy03Ljk5OCwwLTEzLjYxLDMuNzE1LTE2Ljg0NiwxMS4xMzZjLTMuMjM0LDcuODAxLTEuOTAzLDE0LjQ2NywzLjk5OSwxOS45ODZMMjI0LjY5MiwzMjMuNDc5eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />' +
			'</button>');
		document.getElementById("dl-button-2018").addEventListener("click", show_the_menu, false)
	}
	setInterval(add_download_button, 1000);

	function addStyle_external(css_link, once) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		if (once && $("link[href='" + css_link + "']").length > 0) {
			return;
		}
		style = document.createElement('link');
		style.setAttribute("rel", "stylesheet");
		style.setAttribute("type", "text/css");
		style.setAttribute("id", "gm_added_style1");
		style.setAttribute("href", css_link);
		head.appendChild(style);
	}

	function addGlobalStyle(css, once, id) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		if (once && document.getElementById(id)) {
			return;
		}
		style = document.createElement('style');
		style.setAttribute("type", "text/css");
		style.setAttribute("id", id);
		style.innerHTML = css;
		head.appendChild(style);
	}

	function show_the_menu() {
		/*if (document.querySelector("#download2018")){
			element=document.querySelector("#download2018");
			element.parentNode.removeChild(element);
		}*/
		if ($('div.ytp-popup').length > 0) {
			show_ytp_popup();
			return;
		}
		if ($('#download2018').length > 0 && $('#download2018').dialog('isOpen')) {
			$('#download2018').dialog('close');
			return;
		}
		addStyle_external('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css', true);
		var maxZ = Math.max.apply(null,
			$.map($('body *'), function(e, n) {
				if ($(e).css('position') != 'static')
					return parseInt($(e).css('z-index')) || 1;
			})
		);
		addGlobalStyle(".ui-dialog { z-index: " + (maxZ + 1) + "; position: absolute} #download2018 {background-color: white; font-size: 14px;}", true, 'gm_added_style_download');
		download_div = $("<div title='Youtube Video Download' id='download2018'></div>").dialog({
			width: "auto",
			close: function(event, ui) {
				if (document.getElementById("listitems2018")) {
					// move it
					document.getElementsByTagName("body")[0].appendChild(document.getElementById("listitems2018"));
					document.getElementById("listitems2018").setAttribute('style', 'display:none;');
				}
				$(this).dialog('destroy').remove();
			}
		}); // width & height: auto, set child height.
		download_div.height(150).width(200);
		/*if (download_div.width() < 650) {
			download_div.width(650);
		}*/
		download_div.parent().position({
			my: "center center",
			at: "center center",
			of: window
		});
		if (document.getElementById("listitems2018")) {
			// move it
			document.getElementById("download2018").appendChild(document.getElementById("listitems2018"));
			document.getElementById("listitems2018").setAttribute('style', '');
		}
	}

	function show_ytp_popup() {
		if ($('#download2018').length > 0 && $('#download2018').dialog('isOpen')) {
			$('#download2018').dialog('close');
		}
		if ($("#listitems2018").length > 0) {
			var set_height = ($("#listitems2018 a").length * 33) + 12;
			addGlobalStyle(".ytp-big-mode #download_popup{right: 24px; bottom: 70px;}#download_popup{right: 12px; bottom: 49px;}", true, 'gm_added_style_ytdpopup');
			$("div.ytp-settings-menu").before('<div id="download_popup" class="ytp-popup ytp-contextmenu" data-visual-id="1990" style="width: 190px; height: ' + set_height + 'px; top: auto; left: auto;">' +
				'<div class="ytp-panel" style="width: 190px; height: ' + set_height + 'px;">' +
				'<div class="ytp-panel-menu" role="menu" style="height: ' + set_height + 'px;">' +
				'</div></div></div>');
			$("#listitems2018 a").each(function() {
				$(this).attr("target", "_blank");
				$(this).attr("class", "ytp-menuitem");
				$(this).attr("role", "menuitem");
				$(this).find("span").contents().unwrap();
				var the_link = this.outerHTML.replace(this.innerHTML, '%...xox...%');
				$("#download_popup div.ytp-panel-menu").append(the_link.replace('%...xox...%', '<div class="ytp-menuitem-label">' + $(this).html() + '</div>'));
				//console.log($(this)[0].outerHTML); //for debug
			});
			if (typeof GM_download !== 'undefined') {
				$("div#download_popup div.ytp-panel-menu a").each(function() {
					/*var url = $(this).attr("href");
					if (url.indexOf('clen=') > 0 && url.indexOf('dur=') > 0 && url.indexOf('gir=') > 0 &&
						url.indexOf('lmt=') > 0) {*/
						$(this)[0].addEventListener('click', downloadVideoNatively, false);
					//}
				});
			}
			$(document).click(function(event) {
				var target = $(event.target);
				if (target != $("#download_popup") && this != $("#dl-button-2018") &&
					target.parents('#download_popup').length === 0 &&
					target.parents('#dl-button-2018').length === 0) {
					$("#download_popup").hide();
					//console.log(event.target);
				}
			});
			$("#player-api").mouseleave(function(event) {
					$("#download_popup").hide();
			});
			$("#listitems2018").remove();
		} else {
			$("div[data-visual-id='1990']").toggle();
		}
	}

	function downloadVideoNatively(e) {
		if ($.inArray(GM_info.downloadMode, ["native", "browser"]) === -1) {
			debug("GM_info.downloadMode = "+GM_info.downloadMode+" ; downloadVideoNatively() Exiting!");
			return;
		}
		var elem = e.currentTarget;
		e.returnValue = false;
		if (e.preventDefault) {
			e.preventDefault();
		}
		var link = $(elem).attr('href');
		var name = $(elem).attr('download');
		name = name.replace(/[\\<>:"\/|?*]*/g, "");
		if (link && name) {
			if (typeof GM_download !== 'undefined') {
				if (GM_info.downloadMode==="native"){
					open_download_dialog();
					if (is_downloading===false){
						dl_handle=GM_download({
							url: link,
							name: name,
							onerror: gm_dl_error,
							onload: gm_dl_load,
							onprogress: gm_dl_progress,
							ontimeout: gm_dl_timeout
						});
						dl_handle.my_filename=name;
						is_downloading=true;
					}
				} else {
					GM_download(link, name); // browser handles
				}
				debug("Downloading should start now.. File Name = "+name+" ; File URL = "+link);
			} else {
				GM_openInTab(link);
				debug("Download link should be opened in new tab now.. File Name = "+name+" ; File URL = "+link);
			}
		}
		return false;
	}

	function open_download_dialog() {
		if ($('#' + DIALOG_ID).length > 0 && $('#' + DIALOG_ID).dialog('isOpen')) {
			$('#' + DIALOG_ID).dialog('close').remove();
		}
		var dialogButtons = [{
			text: "Cancel Download",
			click: cancel_download
		}];
		addStyle_external('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css', true, true);
		addGlobalStyle("#progressbar"+RANDOM+"{margin-top: 20px;}.progress-label"+RANDOM+"{font-weight: bold; text-shadow: 1px 1px 0 #fff;}", true,'gm_added_style_ytdl');
		download_div = $("<div title='File Download' id='" + DIALOG_ID + "'></div>").dialog({
			resizable: false,
			closeText: "Continue in background",
			buttons: dialogButtons,
			close: function(event, ui) {
				$(this).dialog('destroy').remove();
			}
		});
		$("button.ui-dialog-titlebar-close").tooltip();
		$('#' + DIALOG_ID).append('<div class="progress-label'+RANDOM+'">Starting download...</div>'
			+'<div id="extrainfo'+RANDOM+'"></div>'
			+'<div id="progressbar'+RANDOM+'"></div>');
/*		$("#master" + RANDOM).slider({
			value: volume,
			create: function() {
				$("#handle" + RANDOM).text(' = %' + $(this).slider("value"));
			},
			slide: function(event, ui) {
				$("#handle" + RANDOM).text(' = %' + ui.value);
				SetVolume(ui.value);
			}
		});*/
		progressbar = $( "#progressbar"+RANDOM );
		progressLabel = $( ".progress-label"+RANDOM );
		progressbar.progressbar({
			value: false,
			change: function() {
				progressLabel.text("Current Progress: " + progressbar.progressbar("value") + "%");
			},
			complete: function() {
				progressLabel.text("Complete!");
				change_button_to_close();
			}
		});
	}

	function gm_dl_progress(response) {
		if ($('#' + DIALOG_ID).length === 0 || !$('#' + DIALOG_ID).dialog('isOpen')) {
			return;
		}
		if (response.lengthComputable===false){
			return;
		}
		//console.log(response);
		var fs_html="<p>File size: "+filesize(response.total)+"</p>";
		if (typeof dl_handle.my_filename === "string"){
			fs_html+="<p>File name: "+dl_handle.my_filename+"</p>";
		}
		if ($("#extrainfo"+RANDOM).html()!==fs_html){
			$("#extrainfo"+RANDOM).html(fs_html);
		}
		var val = Math.floor(response.done/response.total*100);

		progressbar.progressbar("value", val);
	}

	function gm_dl_load(response) {
		is_downloading=false;
		if ($('#' + DIALOG_ID).length === 0 || !$('#' + DIALOG_ID).dialog('isOpen')) {
			return;
		}
		progressbar.progressbar( "value", 100 );
		change_button_to_close();
	}

	function gm_dl_timeout(response) {
		is_downloading=false;
		if ($('#' + DIALOG_ID).length === 0 || !$('#' + DIALOG_ID).dialog('isOpen')) {
			return;
		}
		progressbar.progressbar( "value", false );
		progressLabel.text( "Download time-out!" );
		change_button_to_close();
	}

	function gm_dl_error(response) {
		is_downloading=false;
		if ($('#' + DIALOG_ID).length === 0 || !$('#' + DIALOG_ID).dialog('isOpen')) {
			return;
		}
		progressbar.progressbar( "value", false );
		progressLabel.text( "Download error!" );
		change_button_to_close();
	}

	function change_button_to_close() {
		download_div.dialog("option", "buttons", [{
			text: "Close",
			click: function(event, ui) {
				$(this).dialog('close');
			}
		}]);
		download_div.dialog( "option", "closeText", "Close" );
	}

	function cancel_download() {
		is_downloading=false;
		dl_handle.abort();
		if ($('#' + DIALOG_ID).length === 0 || !$('#' + DIALOG_ID).dialog('isOpen')) {
			return;
		}
		download_div.dialog("close");
	}

	function run() {
		//console.log("run() called"); // for debug
		if (document.getElementById(CONTAINER_ID)) return; // check download container

		var videoID, videoFormats, videoAdaptFormats, videoManifestURL, scriptURL = null;
		var isSignatureUpdatingStarted = false;
		var operaTable = new Array();
		var language = document.documentElement.getAttribute('lang');
		var textDirection = 'left';
		if (document.body.getAttribute('dir') == 'rtl') {
			textDirection = 'right';
		}
		if (document.getElementById('watch7-action-buttons')) { // old UI
			fixTranslations(language, textDirection);
		}
		//console.log("193");    
		// obtain video ID, formats map   

		var args = null;
		var usw = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window; // Firefox, Opera<15
		if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.args) {
			args = usw.ytplayer.config.args;
		}
		if (args) {
			videoID = args['video_id'];
			videoFormats = args['url_encoded_fmt_stream_map'];
			videoAdaptFormats = args['adaptive_fmts'];
			videoManifestURL = args['dashmpd'];
			debug('Info: Standard mode. videoID ' + (videoID ? videoID : 'none') + '; ');
		}
		if (usw.ytplayer && usw.ytplayer.config && usw.ytplayer.config.assets) {
			scriptURL = usw.ytplayer.config.assets.js;
		}
		//console.log("211");
		if (videoID == null) { // unsafeWindow workaround (Chrome, Opera 15+)
			var buffer = document.getElementById(DEBUG_ID + '2');
			if (buffer) {
				while (buffer.firstChild) {
					buffer.removeChild(buffer.firstChild);
				}
			} else {
				buffer = createHiddenElem('pre', DEBUG_ID + '2');
			}
			injectScript('if(ytplayer&&ytplayer.config&&ytplayer.config.args){document.getElementById("' + DEBUG_ID + '2").appendChild(document.createTextNode(\'"video_id":"\'+ytplayer.config.args.video_id+\'", "js":"\'+ytplayer.config.assets.js+\'", "dashmpd":"\'+ytplayer.config.args.dashmpd+\'", "url_encoded_fmt_stream_map":"\'+ytplayer.config.args.url_encoded_fmt_stream_map+\'", "adaptive_fmts":"\'+ytplayer.config.args.adaptive_fmts+\'"\'));}');
			var code = buffer.innerHTML;
			if (code) {
				videoID = findMatch(code, /\"video_id\":\s*\"([^\"]+)\"/);
				videoFormats = findMatch(code, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
				videoFormats = videoFormats.replace(/&amp;/g, '\\u0026');
				videoAdaptFormats = findMatch(code, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
				videoAdaptFormats = videoAdaptFormats.replace(/&amp;/g, '\\u0026');
				videoManifestURL = findMatch(code, /\"dashmpd\":\s*\"([^\"]+)\"/);
				scriptURL = findMatch(code, /\"js\":\s*\"([^\"]+)\"/);
			}
			debug('Info: Injection mode. videoID ' + (videoID ? videoID : 'none') + '; ');
		}
		// console.log("234");
		if (videoID == null) { // if all else fails
			var bodyContent = document.body.innerHTML;
			if (bodyContent != null) {
				videoID = findMatch(bodyContent, /\"video_id\":\s*\"([^\"]+)\"/);
				videoFormats = findMatch(bodyContent, /\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/);
				videoAdaptFormats = findMatch(bodyContent, /\"adaptive_fmts\":\s*\"([^\"]+)\"/);
				videoManifestURL = findMatch(bodyContent, /\"dashmpd\":\s*\"([^\"]+)\"/);
				if (scriptURL == null) {
					scriptURL = findMatch(bodyContent, /\"js\":\s*\"([^\"]+)\"/);
					if (scriptURL) {
						scriptURL = scriptURL.replace(/\\/g, '');
					}
				}
			}
			debug('Info: Brute mode. videoID ' + (videoID ? videoID : 'none') + '; ');
		}
		// console.log("251");
		debug('Info: url ' + window.location.href + '; useragent ' + window.navigator.userAgent);

		if (videoID == null || videoFormats == null || videoID.length == 0 || videoFormats.length == 0) {
			debug('Error: No config information found. YouTube must have changed the code.');
			return;
		}

		// Opera 12 extension message handler
		if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined') {
			opera.extension.onmessage = function(event) {
				var index = findMatch(event.data.action, /xhr\-([0-9]+)\-response/);
				if (index && operaTable[parseInt(index, 10)]) {
					index = parseInt(index, 10);
					var trigger = (operaTable[index])['onload'];
					if (typeof trigger === 'function' && event.data.readyState == 4) {
						if (trigger) {
							trigger(event.data);
						}
					}
				}
			}
		}

		if (!isDecodeRuleUpdated) {
			DECODE_RULE = getDecodeRules(DECODE_RULE);
			isDecodeRuleUpdated = true;
		}
		if (scriptURL) {
			scriptURL = absoluteURL(scriptURL);
			debug('Info: Full script URL: ' + scriptURL);
			fetchSignatureScript(scriptURL);
		}

		// video title
		var videoTitle = document.title || 'video';
		videoTitle = videoTitle.replace(/\s*\-\s*YouTube$/i, '').replace(/'/g, '\'').replace(/^\s+|\s+$/g, '').replace(/\.+$/g, '');
		videoTitle = videoTitle.replace(/[:"\?\*]/g, '').replace(/[\|\\\/]/g, '_'); // Mac, Linux, Windows
		if (((window.navigator.userAgent || '').toLowerCase()).indexOf('windows') >= 0) {
			videoTitle = videoTitle.replace(/#/g, '').replace(/&/g, '_'); // Windows
		} else {
			videoTitle = videoTitle.replace(/#/g, '%23').replace(/&/g, '%26'); //  Mac, Linux
		}

		// parse the formats map
		var sep1 = '%2C',
			sep2 = '%26',
			sep3 = '%3D';
		if (videoFormats.indexOf(',') > -1 || videoFormats.indexOf('&') > -1 || videoFormats.indexOf('\\u0026') > -1) {
			sep1 = ',';
			sep2 = (videoFormats.indexOf('&') > -1) ? '&' : '\\u0026';
			sep3 = '=';
		}
		var videoURL = new Array();
		var videoSignature = new Array();
		if (videoAdaptFormats) {
			//console.log(videoAdaptFormats);
			videoFormats = videoFormats + sep1 + videoAdaptFormats;
		}
		var videoFormatsGroup = videoFormats.split(sep1);
		for (var i = 0; i < videoFormatsGroup.length; i++) {
			var videoFormatsElem = videoFormatsGroup[i].split(sep2);
			var videoFormatsPair = new Array();
			for (var j = 0; j < videoFormatsElem.length; j++) {
				var pair = videoFormatsElem[j].split(sep3);
				if (pair.length == 2) {
					videoFormatsPair[pair[0]] = pair[1];
				}
			}
			if (videoFormatsPair['url'] == null) continue;
			var url = unescape(unescape(videoFormatsPair['url'])).replace(/\\\//g, '/').replace(/\\u0026/g, '&');
			if (videoFormatsPair['itag'] == null) continue;
			var itag = videoFormatsPair['itag'];
			var sig = videoFormatsPair['sig'] || videoFormatsPair['signature'];
			if (sig) {
				url = url + '&signature=' + sig;
				videoSignature[itag] = null;
			} else if (videoFormatsPair['s']) {
				url = url + '&signature=' + decryptSignature(videoFormatsPair['s']);
				videoSignature[itag] = videoFormatsPair['s'];
			}
			if (url.toLowerCase().indexOf('ratebypass') == -1) { // speed up download for dash
				url = url + '&ratebypass=yes';
			}
			if (url.toLowerCase().indexOf('http') == 0) { // validate URL
				videoURL[itag] = url + '&title=' + videoTitle;
			}
		}

		var showFormat = new Array();
		for (var category in FORMAT_RULE) {
			var rule = FORMAT_RULE[category];
			for (var index in FORMAT_TYPE) {
				if (FORMAT_TYPE[index] == category) {
					showFormat[index] = (rule == 'all');
				}
			}
			if (rule == 'max') {
				for (var i = FORMAT_ORDER.length - 1; i >= 0; i--) {
					var format = FORMAT_ORDER[i];
					if (FORMAT_TYPE[format] == category && videoURL[format] != undefined) {
						showFormat[format] = true;
						break;
					}
				}
			}
		}

		var dashPref = getPref(STORAGE_DASH);
		if (dashPref == '1') {
			SHOW_DASH_FORMATS = true;
		} else if (dashPref != '0') {
			setPref(STORAGE_DASH, '0');
		}

		var downloadCodeList = [];
		for (var i = 0; i < FORMAT_ORDER.length; i++) {
			var format = FORMAT_ORDER[i];
			if (format == '37' && videoURL[format] == undefined) { // hack for dash 1080p
				if (videoURL['137']) {
					format = '137';
				}
				showFormat[format] = showFormat['37'];
			} else if (format == '38' && videoURL[format] == undefined) { // hack for dash 4K
				if (videoURL['138'] && !videoURL['266']) {
					format = '138';
				}
				showFormat[format] = showFormat['38'];
			}
			if (!SHOW_DASH_FORMATS && format.length > 2) continue;
			if (videoURL[format] != undefined && FORMAT_LABEL[format] != undefined && showFormat[format]) {
				downloadCodeList.push({
					url: videoURL[format],
					sig: videoSignature[format],
					format: format,
					label: FORMAT_LABEL[format]
				});
				debug('Info: itag' + format + ' url:' + videoURL[format]);
			}
		}

		if (downloadCodeList.length == 0) {
			debug('Error: No download URL found. Probably YouTube uses encrypted streams.');
			return; // no format
		}

		/*// find parent container
		var newWatchPage=false;
		var parentElement=document.getElementById('watch7-action-buttons');
		if (parentElement==null) {
		  parentElement=document.getElementById('watch8-secondary-actions');
		  if (parentElement==null) {
		    debug('DYVAM Error - No container for adding the download button. YouTube must have changed the code.');
		    return;
		  } else {
		    newWatchPage=true;
		  }
		}*/

		// get button labels
		var buttonText = (BUTTON_TEXT[language]) ? BUTTON_TEXT[language] : BUTTON_TEXT['en'];
		var buttonLabel = (BUTTON_TOOLTIP[language]) ? BUTTON_TOOLTIP[language] : BUTTON_TOOLTIP['en'];

		/*  // generate download code for regular interface
		  var mainSpan=document.createElement('span');

		  if (newWatchPage) {
		    var spanIcon=document.createElement('span');
		    spanIcon.setAttribute('class', 'yt-uix-button-icon-wrapper');
		    var imageIcon=document.createElement('img');
		    imageIcon.setAttribute('src', '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
		    imageIcon.setAttribute('class', 'yt-uix-button-icon');
		    imageIcon.setAttribute('style', 'width:20px;height:20px;background-size:20px 20px;background-repeat:no-repeat;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABG0lEQVRYR+2W0Q3CMAxE2wkYAdiEEWADmIxuACMwCmzABpCTEmRSO7YTQX+ChECV43t2nF7GYeHPuLD+0AKwC/DnWMAp/N5qimkBuAfBdRTF/+2/AV6ZYFUxVYuicAfoHegd6B3oHfhZB+ByF+JyV8FkrAB74pqH3DU5L3iGoBURhdVODIQF4EjEkWLmmhYALOQgNIBcHHke4buhxXAAaFnaAhqbQ5QAOHHkwhZ8balkx1ICCiEBWNZ+CivdB7REHIC2ZjZK2oWklDDdB1NSdCd/Js2PqQMpSIKYVcM8kE6QCwDBNRCqOBJrW0CL8kCYxL0A1k6YxWsANAiXeC2ABOEWbwHAWrwxpzgkmA/JtIqnxTOElmPnjlkc4A3FykAhA42AxwAAAABJRU5ErkJggg==);');
		    spanIcon.appendChild(imageIcon);
		    mainSpan.appendChild(spanIcon);
		  }

		  var spanButton=document.createElement('span');
		  spanButton.setAttribute('class', 'yt-uix-button-content');
		  spanButton.appendChild(document.createTextNode(buttonText+' '));
		  mainSpan.appendChild(spanButton);
		  
		  if (!newWatchPage) { // old UI
		    var imgButton=document.createElement('img');
		    imgButton.setAttribute('class', 'yt-uix-button-arrow');
		    imgButton.setAttribute('src', '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
		    mainSpan.appendChild(imgButton);
		  }*/

		var listItems = document.createElement('ol');
		listItems.setAttribute('id', 'listitems2018');
		listItems.setAttribute('style', 'display:none;');
		listItems.setAttribute('class', 'yt-uix-button-menu');
		for (var i = 0; i < downloadCodeList.length; i++) {
			var listItem = document.createElement('li');
			var listLink = document.createElement('a');
			listLink.setAttribute('style', 'text-decoration:none;');
			listLink.setAttribute('href', downloadCodeList[i].url);
			listLink.setAttribute('download', videoTitle + '.' + FORMAT_TYPE[downloadCodeList[i].format]);
			var listButton = document.createElement('span');
			listButton.setAttribute('class', 'yt-uix-button-menu-item');
			listButton.setAttribute('loop', i + '');
			listButton.setAttribute('id', LISTITEM_ID + downloadCodeList[i].format);
			listButton.appendChild(document.createTextNode(downloadCodeList[i].label));
			listLink.appendChild(listButton);
			listItem.appendChild(listLink);
			listItems.appendChild(listItem);
		}
		document.getElementsByTagName("body")[0].appendChild(listItems);
		//console.log("is everything ok?");

		/*  var buttonElement=document.createElement('button');
		  buttonElement.setAttribute('id', BUTTON_ID);
		  if (newWatchPage) {
		    buttonElement.setAttribute('class', 'yt-uix-button  yt-uix-button-size-default yt-uix-button-opacity yt-uix-tooltip');
		  } else { // old UI
		    buttonElement.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-text');
		    buttonElement.setAttribute('style', 'margin-top:4px; margin-left:'+((textDirection=='left')?5:10)+'px;');
		  }
		  buttonElement.setAttribute('data-tooltip-text', buttonLabel);  
		  buttonElement.setAttribute('type', 'button');
		  buttonElement.setAttribute('role', 'button');
		  buttonElement.addEventListener('click', function(){return false;}, false);
		  buttonElement.appendChild(mainSpan);
		  var containerSpan=document.createElement('span');
		  containerSpan.setAttribute('id', CONTAINER_ID);
		  containerSpan.appendChild(document.createTextNode(' '));
		  containerSpan.appendChild(buttonElement);
		                                            
		  // add the button
		  if (!newWatchPage) { // watch7
		    parentElement.appendChild(containerSpan);
		  } else { // watch8
		    parentElement.insertBefore(containerSpan, parentElement.firstChild);
		  }*/

		// REPLACEWITH if (!isSignatureUpdatingStarted) {
		for (var i = 0; i < downloadCodeList.length; i++) {
			addFileSize(downloadCodeList[i].url, downloadCodeList[i].format);
		}
		// } 

		if (typeof GM_download !== 'undefined') {
			for (var i = 0; i < downloadCodeList.length; i++) {
				var downloadFMT = document.getElementById(LISTITEM_ID + downloadCodeList[i].format);
				var url = (downloadCodeList[i].url).toLowerCase();
				if (url.indexOf('clen=') > 0 && url.indexOf('dur=') > 0 && url.indexOf('gir=') > 0 &&
					url.indexOf('lmt=') > 0) {
					downloadFMT.addEventListener('click', downloadVideoNatively, false);
				}
			}
		}

		addFromManifest();

		function downloadVideoNatively(e) {
			var elem = e.currentTarget;
			e.returnValue = false;
			if (e.preventDefault) {
				e.preventDefault();
			}
			var loop = elem.getAttribute('loop');
			if (loop) {
				GM_download(downloadCodeList[loop].url, videoTitle + '.' + FORMAT_TYPE[downloadCodeList[loop].format]);
			}
			return false;
		}

		function addFromManifest() { // add Dash URLs from manifest file
			var formats = ['137', '138', '140']; // 137=1080p, 138=4k, 140=m4a
			var isNecessary = true;
			for (var i = 0; i < formats.length; i++) {
				if (videoURL[formats[i]]) {
					isNecessary = false;
					break;
				}
			}
			if (videoManifestURL && SHOW_DASH_FORMATS && isNecessary) {
				var matchSig = findMatch(videoManifestURL, /\/s\/([a-zA-Z0-9\.]+)\//i);
				if (matchSig) {
					var decryptedSig = decryptSignature(matchSig);
					if (decryptedSig) {
						videoManifestURL = videoManifestURL.replace('/s/' + matchSig + '/', '/signature/' + decryptedSig + '/');
					}
				}
				videoManifestURL = absoluteURL(videoManifestURL);
				debug('Info: manifestURL ' + videoManifestURL);
				crossXmlHttpRequest({
					method: 'GET',
					url: videoManifestURL, // check if URL exists
					onload: function(response) {
						if (response.readyState === 4 && response.status === 200 && response.responseText) {
							debug('Info: maniestFileContents ' + response.responseText);
							var lastFormatFromList = downloadCodeList[downloadCodeList.length - 1].format;
							debug('Info: lastformat: ' + lastFormatFromList);
							for (var i = 0; i < formats.length; i++) {
								k = formats[i];
								if (videoURL[k] || showFormat[k] == false) continue;
								var regexp = new RegExp('<BaseURL>(http[^<]+itag\\/' + k + '[^<]+)<\\/BaseURL>', 'i');
								var matchURL = findMatch(response.responseText, regexp);
								debug('Info: matchURL itag= ' + k + ' url= ' + matchURL);
								if (!matchURL) continue;
								matchURL = matchURL.replace(/&amp\;/g, '&');
								// ...
								downloadCodeList.push({
									url: matchURL,
									sig: videoSignature[k],
									format: k,
									label: FORMAT_LABEL[k]
								});
								var downloadFMT = document.getElementById(LISTITEM_ID + lastFormatFromList);
								var clone = downloadFMT.parentNode.parentNode.cloneNode(true);
								clone.firstChild.firstChild.setAttribute('id', LISTITEM_ID + k);
								clone.firstChild.setAttribute('href', matchURL);
								downloadFMT.parentNode.parentNode.parentNode.appendChild(clone);
								downloadFMT = document.getElementById(LISTITEM_ID + k);
								downloadFMT.firstChild.nodeValue = FORMAT_LABEL[k];
								addFileSize(matchURL, k);
								lastFormatFromList = k;
							}
						}
					}
				});
			}
		}

		function injectStyle(code) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.appendChild(document.createTextNode(code));
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		function injectScript(code) {
			var script = document.createElement('script');
			script.type = 'application/javascript';
			script.textContent = code;
			document.body.appendChild(script);
			document.body.removeChild(script);
		}

		function debug(str) {
			if (!str.includes('DYVAM')){
				str="DYVAM - "+str;
			}
			console.log(str);
			var debugElem = document.getElementById(DEBUG_ID);
			if (!debugElem) {
				debugElem = createHiddenElem('div', DEBUG_ID);
			}
			debugElem.appendChild(document.createTextNode(str + ' '));
		}

		function createHiddenElem(tag, id) {
			var elem = document.createElement(tag);
			elem.setAttribute('id', id);
			elem.setAttribute('style', 'display:none;');
			document.body.appendChild(elem);
			return elem;
		}

		function fixTranslations(language, textDirection) {
			if (/^af|bg|bn|ca|cs|de|el|es|et|eu|fa|fi|fil|fr|gl|hi|hr|hu|id|it|iw|kn|lv|lt|ml|mr|ms|nl|pl|ro|ru|sl|sk|sr|sw|ta|te|th|uk|ur|vi|zu$/.test(language)) { // fix international UI
				var likeButton = document.getElementById('watch-like');
				if (likeButton) {
					var spanElements = likeButton.getElementsByClassName('yt-uix-button-content');
					if (spanElements) {
						spanElements[0].style.display = 'none'; // hide like text
					}
				}
				var marginPixels = 10;
				if (/^bg|ca|cs|el|eu|hr|it|ml|ms|pl|sl|sw|te$/.test(language)) {
					marginPixels = 1;
				}
				injectStyle('#watch7-secondary-actions .yt-uix-button{margin-' + textDirection + ':' + marginPixels + 'px!important}');
			}
		}

		function findMatch(text, regexp) {
			var matches = text.match(regexp);
			return (matches) ? matches[1] : null;
		}

		function isString(s) {
			return (typeof s === 'string' || s instanceof String);
		}

		function isInteger(n) {
			return (typeof n === 'number' && n % 1 == 0);
		}

		function absoluteURL(url) {
			var link = document.createElement('a');
			link.href = url;
			return link.href;
		}

		function getPref(name) { // cross-browser GM_getValue
			var a = '',
				b = '';
			try {
				a = typeof GM_getValue.toString;
				b = GM_getValue.toString()
			} catch (e) {}
			if (typeof GM_getValue === 'function' &&
				(a === 'undefined' || b.indexOf('not supported') === -1)) {
				return GM_getValue(name, null); // Greasemonkey, Tampermonkey, Firefox extension
			} else {
				var ls = null;
				try {
					ls = window.localStorage || null
				} catch (e) {}
				if (ls) {
					return ls.getItem(name); // Chrome script, Opera extensions
				}
			}
			return;
		}

		function setPref(name, value) { //  cross-browser GM_setValue
			var a = '',
				b = '';
			try {
				a = typeof GM_setValue.toString;
				b = GM_setValue.toString()
			} catch (e) {}
			if (typeof GM_setValue === 'function' &&
				(a === 'undefined' || b.indexOf('not supported') === -1)) {
				GM_setValue(name, value); // Greasemonkey, Tampermonkey, Firefox extension
			} else {
				var ls = null;
				try {
					ls = window.localStorage || null
				} catch (e) {}
				if (ls) {
					return ls.setItem(name, value); // Chrome script, Opera extensions
				}
			}
		}

		function crossXmlHttpRequest(details) { // cross-browser GM_xmlhttpRequest
			if (typeof GM_xmlhttpRequest === 'function') { // Greasemonkey, Tampermonkey, Firefox extension, Chrome script
				GM_xmlhttpRequest(details);
			} else if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined' &&
				typeof opera.extension.postMessage !== 'undefined') { // Opera 12 extension
				var index = operaTable.length;
				opera.extension.postMessage({
					'action': 'xhr-' + index,
					'url': details.url,
					'method': details.method
				});
				operaTable[index] = details;
			} else if (typeof window.opera === 'undefined' && typeof XMLHttpRequest === 'function') { // Opera 15+ extension
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (details['onload']) {
							details['onload'](xhr);
						}
					}
				}
				xhr.open(details.method, details.url, true);
				xhr.send();
			}
		}

		function addFileSize(url, format) {

			function updateVideoLabel(size, format) {
				var elem = document.getElementById(LISTITEM_ID + format);
				if (elem) {
					size = parseInt(size, 10);
					if (size >= 1073741824) {
						size = parseFloat((size / 1073741824).toFixed(1)) + ' GB';
					} else if (size >= 1048576) {
						size = parseFloat((size / 1048576).toFixed(1)) + ' MB';
					} else {
						size = parseFloat((size / 1024).toFixed(1)) + ' KB';
					}
					if (elem.childNodes.length > 1) {
						elem.lastChild.nodeValue = ' (' + size + ')';
					} else if (elem.childNodes.length == 1) {
						elem.appendChild(document.createTextNode(' (' + size + ')'));
					}
				}
			}

			var matchSize = findMatch(url, /[&\?]clen=([0-9]+)&/i);
			if (matchSize) {
				updateVideoLabel(matchSize, format);
			} else {
				try {
					crossXmlHttpRequest({
						method: 'HEAD',
						url: url,
						onload: function(response) {
							if (response.readyState == 4 && response.status == 200) { // add size
								var size = 0;
								if (typeof response.getResponseHeader === 'function') {
									size = response.getResponseHeader('Content-length');
								} else if (response.responseHeaders) {
									var regexp = new RegExp('^Content\-length: (.*)$', 'im');
									var match = regexp.exec(response.responseHeaders);
									if (match) {
										size = match[1];
									}
								}
								if (size) {
									updateVideoLabel(size, format);
								}
							}
						}
					});
				} catch (e) {}
			}
		}

		function findSignatureCode(sourceCode) {
			debug('Info: signature start ' + getPref(STORAGE_CODE));
			var signatureFunctionName =
				findMatch(sourceCode,
					/\.set\s*\("signature"\s*,\s*([a-zA-Z0-9_$][\w$]*)\(/) ||
				findMatch(sourceCode,
					/\.sig\s*\|\|\s*([a-zA-Z0-9_$][\w$]*)\(/) ||
				findMatch(sourceCode,
					/\.signature\s*=\s*([a-zA-Z_$][\w$]*)\([a-zA-Z_$][\w$]*\)/) //old
				||
				findMatch(sourceCode,
					/\|\|\s*"signature"\s*,\s*([a-zA-Z0-9_$][\w$]*)\(/); //new
			if (signatureFunctionName == null) return setPref(STORAGE_CODE, 'error');
			signatureFunctionName = signatureFunctionName.replace('$', '\\$');
			var regCode = new RegExp(signatureFunctionName + '\\s*=\\s*function' +
				'\\s*\\([\\w$]*\\)\\s*{[\\w$]*=[\\w$]*\\.split\\(""\\);\n*(.+);return [\\w$]*\\.join');
			var regCode2 = new RegExp('function \\s*' + signatureFunctionName +
				'\\s*\\([\\w$]*\\)\\s*{[\\w$]*=[\\w$]*\\.split\\(""\\);\n*(.+);return [\\w$]*\\.join');
			var functionCode = findMatch(sourceCode, regCode) || findMatch(sourceCode, regCode2);
			debug('Info: signaturefunction ' + signatureFunctionName + ' -- ' + functionCode);
			if (functionCode == null) return setPref(STORAGE_CODE, 'error');

			var reverseFunctionName = findMatch(sourceCode,
				/([\w$]*)\s*:\s*function\s*\(\s*[\w$]*\s*\)\s*{\s*(?:return\s*)?[\w$]*\.reverse\s*\(\s*\)\s*}/);
			debug('Info: reversefunction ' + reverseFunctionName);
			if (reverseFunctionName) reverseFunctionName = reverseFunctionName.replace('$', '\\$');
			var sliceFunctionName = findMatch(sourceCode,
				/([\w$]*)\s*:\s*function\s*\(\s*[\w$]*\s*,\s*[\w$]*\s*\)\s*{\s*(?:return\s*)?[\w$]*\.(?:slice|splice)\(.+\)\s*}/);
			debug('Info: slicefunction ' + sliceFunctionName);
			if (sliceFunctionName) sliceFunctionName = sliceFunctionName.replace('$', '\\$');

			var regSlice = new RegExp('\\.(?:' + 'slice' + (sliceFunctionName ? '|' + sliceFunctionName : '') +
				')\\s*\\(\\s*(?:[a-zA-Z_$][\\w$]*\\s*,)?\\s*([0-9]+)\\s*\\)'); // .slice(5) sau .Hf(a,5)
			var regReverse = new RegExp('\\.(?:' + 'reverse' + (reverseFunctionName ? '|' + reverseFunctionName : '') +
				')\\s*\\([^\\)]*\\)'); // .reverse() sau .Gf(a,45)
			var regSwap = new RegExp('[\\w$]+\\s*\\(\\s*[\\w$]+\\s*,\\s*([0-9]+)\\s*\\)');
			var regInline = new RegExp('[\\w$]+\\[0\\]\\s*=\\s*[\\w$]+\\[([0-9]+)\\s*%\\s*[\\w$]+\\.length\\]');
			var functionCodePieces = functionCode.split(';');
			var decodeArray = [];
			for (var i = 0; i < functionCodePieces.length; i++) {
				functionCodePieces[i] = functionCodePieces[i].trim();
				var codeLine = functionCodePieces[i];
				if (codeLine.length > 0) {
					var arrSlice = codeLine.match(regSlice);
					var arrReverse = codeLine.match(regReverse);
					debug(i + ': ' + codeLine + ' --' + (arrSlice ? ' slice length ' + arrSlice.length : '') + ' ' + (arrReverse ? 'reverse' : ''));
					if (arrSlice && arrSlice.length >= 2) { // slice
						var slice = parseInt(arrSlice[1], 10);
						if (isInteger(slice)) {
							decodeArray.push(-slice);
						} else return setPref(STORAGE_CODE, 'error');
					} else if (arrReverse && arrReverse.length >= 1) { // reverse
						decodeArray.push(0);
					} else if (codeLine.indexOf('[0]') >= 0) { // inline swap
						if (i + 2 < functionCodePieces.length &&
							functionCodePieces[i + 1].indexOf('.length') >= 0 &&
							functionCodePieces[i + 1].indexOf('[0]') >= 0) {
							var inline = findMatch(functionCodePieces[i + 1], regInline);
							inline = parseInt(inline, 10);
							decodeArray.push(inline);
							i += 2;
						} else return setPref(STORAGE_CODE, 'error');
					} else if (codeLine.indexOf(',') >= 0) { // swap
						var swap = findMatch(codeLine, regSwap);
						swap = parseInt(swap, 10);
						if (isInteger(swap) && swap > 0) {
							decodeArray.push(swap);
						} else return setPref(STORAGE_CODE, 'error');
					} else return setPref(STORAGE_CODE, 'error');
				}
			}

			if (decodeArray) {
				setPref(STORAGE_URL, scriptURL);
				setPref(STORAGE_CODE, decodeArray.toString());
				DECODE_RULE = decodeArray;
				debug('Info: signature ' + decodeArray.toString() + ' ' + scriptURL);
				// update download links and add file sizes
				for (var i = 0; i < downloadCodeList.length; i++) {
					var elem = document.getElementById(LISTITEM_ID + downloadCodeList[i].format);
					var url = downloadCodeList[i].url;
					var sig = downloadCodeList[i].sig;
					if (elem && url && sig) {
						url = url.replace(/\&signature=[\w\.]+/, '&signature=' + decryptSignature(sig));
						elem.parentNode.setAttribute('href', url);
						addFileSize(url, downloadCodeList[i].format);
					}
				}
			}
		}

		function isValidSignatureCode(arr) { // valid values: '5,-3,0,2,5', 'error'
			if (!arr) return false;
			if (arr == 'error') return true;
			arr = arr.split(',');
			for (var i = 0; i < arr.length; i++) {
				if (!isInteger(parseInt(arr[i], 10))) return false;
			}
			return true;
		}

		function fetchSignatureScript(scriptURL) {
			var storageURL = getPref(STORAGE_URL);
			var storageCode = getPref(STORAGE_CODE);
			if (!(/,0,|^0,|,0$|\-/.test(storageCode))) storageCode = null; // hack for only positive items
			if (storageCode && isValidSignatureCode(storageCode) && storageURL &&
				scriptURL == absoluteURL(storageURL)) return;
			try {
				debug('DYVAM fetch ' + scriptURL);
				isSignatureUpdatingStarted = true;
				crossXmlHttpRequest({
					method: 'GET',
					url: scriptURL,
					onload: function(response) {
						debug('DYVAM fetch status ' + response.status);
						if (response.readyState === 4 && response.status === 200 && response.responseText) {
							findSignatureCode(response.responseText);
						}
					}
				});
			} catch (e) {}
		}

		function getDecodeRules(rules) {
			var storageCode = getPref(STORAGE_CODE);
			if (storageCode && storageCode != 'error' && isValidSignatureCode(storageCode)) {
				var arr = storageCode.split(',');
				for (var i = 0; i < arr.length; i++) {
					arr[i] = parseInt(arr[i], 10);
				}
				rules = arr;
				debug('Info: signature ' + arr.toString() + ' ' + scriptURL);
			}
			return rules;
		}

		function decryptSignature(sig) {
			//console.log(DECODE_RULE); // for debug
			function swap(a, b) {
				var c = a[0];
				a[0] = a[b % a.length];
				a[b] = c;
				return a
			};

			function decode(sig, arr) { // encoded decryption
				if (!isString(sig)) return null;
				var sigA = sig.split('');
				for (var i = 0; i < arr.length; i++) {
					var act = arr[i];
					if (!isInteger(act)) return null;
					sigA = (act > 0) ? swap(sigA, act) : ((act == 0) ? sigA.reverse() : sigA.slice(-act));
				}
				var result = sigA.join('');
				return result;
			}

			if (sig == null) return '';
			var arr = DECODE_RULE;
			if (arr) {
				var sig2 = decode(sig, arr);
				if (sig2) return sig2;
			} else {
				setPref(STORAGE_URL, '');
				setPref(STORAGE_CODE, '');
			}
			return sig;
		}

	}

})();