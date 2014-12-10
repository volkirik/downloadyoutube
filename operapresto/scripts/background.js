opera.extension.onmessage = function(event) {
  var action = event.data.action;
  //opera.postError(action);
  
  xhrequest=function(event) {
    var xhr = new XMLHttpRequest();
    xhr.open(event.data.method, event.data.url, false);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status >= 301 && this.status < 400) { //redirects 
          var location=this.getResponseHeader('Location');
          if (location) {
            //opera.postError(this.status);
            //opera.postError(this.getAllResponseHeaders());
            event.data.url=location;
            xhrequest(event);
            return;
          }
        }
        event.source.postMessage({
          action:action+'-response', 
          responseText:this.responseText||'', 
          readyState:this.readyState, 
          status:this.status, 
          responseHeaders:this.getAllResponseHeaders()
        });
        //opera.postError(this.status);
        //opera.postError(event.data.url);
        //opera.postError(this.getAllResponseHeaders());
      }
    };
    xhr.send();  
  }
  
  if (action.indexOf('xhr') == 0) {
    xhrequest(event);
  }
};
