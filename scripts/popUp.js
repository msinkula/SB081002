// TODO: these should be in common.jsfunction addLoadEvent(func) {	var oldonload = window.onload;	if (typeof window.onload != 'function') {		window.onload = func;	}	else {		window.onload = function() {			oldonload();			func();		}	}}function addEvent( obj, type, fn ) {	if (obj.addEventListener) {		obj.addEventListener( type, fn, false );		EventCache.add(obj, type, fn);	}	else if (obj.attachEvent) {		obj["e"+type+fn] = fn;		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }		obj.attachEvent( "on"+type, obj[type+fn] );		EventCache.add(obj, type, fn);	}	else {		obj["on"+type] = obj["e"+type+fn];	}}	var EventCache = function(){	var listEvents = [];	return {		listEvents : listEvents,		add : function(node, sEventName, fHandler){			listEvents.push(arguments);		},		flush : function(){			var i, item;			for(i = listEvents.length - 1; i >= 0; i = i - 1){				item = listEvents[i];				if(item[0].removeEventListener){					item[0].removeEventListener(item[1], item[2], item[3]);				};				if(item[1].substring(0, 2) != "on"){					item[1] = "on" + item[1];				};				if(item[0].detachEvent){					item[0].detachEvent(item[1], item[2]);				};				item[0][item[1]] = null;			};		}	};}();addEvent(window,'unload',EventCache.flush);// TODO: END COMMON.JS// TODO: YOUR MOTHER.JSfunction killEvent(e) {  if(e.preventDefault) {	  if(typeof(e.preventDefault)=='function') e.preventDefault();	  if(typeof(e.stopPropagation)=='function')	e.stopPropagation();	  else e.stopPropagation = e.cancelable;  }else{	  e.returnValue = false;	  e.cancelBubble = true;  }}addEvent(window,'load',function() {	if (!document.getElementsByTagName) return false;		var lnks = document.getElementsByTagName("a");		for (var i=0; i<lnks.length; i++) {		if (lnks[i].className == "popup") { // use .className instead of getAttribute (IE doesn't like getAttribute)			addEvent(lnks[i], 'click', function(e) {				popUp(this.href);				killEvent(e);				return false;			}); 		}	}});function popUp(winURL) {  view = window.open(winURL,"Product","resizable=no,scrollbars=no,width=600,height=600");  view.focus();}