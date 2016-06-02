/*! magsdk-osd-pip: v0.0.1 (webpack: v1.13.0) */
!function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var s=i(6),n=i(3),o=i(5);s.addListeners({load:function(){var t=gSTB.RDir("vmode");s.data.viewports=o.viewports[t],n.init([i(8)])},done:function(){n.navigate("pageMain")}})},function(t,e,i){"use strict";function s(t){var e,i=this;if(t=t||{},this.visible=!0,this.focusable=!0,this.$node=null,this.$body=null,this.parent=null,this.children=[],this.propagate=!!t.propagate,n.call(this,t.data),this.$node=t.$node||document.createElement("div"),this.$body=t.$body||this.$node,this.$node.className+=" component "+(t.className||""),this.id=t.id||this.$node.id||"cid"+a++,t.parent&&t.parent.add(this),t.visible===!1&&this.hide(),t.focusable===!1&&(this.focusable=!1),this.defaultEvents){t.events=t.events||{};for(e in this.defaultEvents)t.events[e]=t.events[e]||this.defaultEvents[e]}t.events&&this.addListeners(t.events),t.children&&this.add.apply(this,t.children),this.$node.addEventListener("click",function(t){0===t.button&&(i.focus(),i.events.click&&i.emit("click",{event:t})),t.stopPropagation()})}var n=i(4),o=i(3),a=0;s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype.defaultEvents=null,s.prototype.add=function(t){var e;for(e=0;e<arguments.length;e++)t=arguments[e],this.children.push(t),t.parent=this,t.$node&&null===t.$node.parentNode&&this.$body.appendChild(t.$node),this.events.add&&this.emit("add",{item:t})},s.prototype.remove=function(){this.parent&&(o.current.activeComponent===this&&(this.blur(),this.parent.focus()),this.parent.children.splice(this.parent.children.indexOf(this),1)),this.children.forEach(function(t){t.remove()}),this.removeAllListeners(),this.$node.parentNode.removeChild(this.$node),this.events.remove&&this.emit("remove")},s.prototype.focus=function(t){var e=o.current,i=e.activeComponent;return this.focusable&&this!==i?(i&&i.blur(),e.activeComponent=i=this,i.$node.classList.add("focus"),i.events.focus&&i.emit("focus",t),!0):!1},s.prototype.blur=function(){var t=o.current,e=t.activeComponent;return this.$node.classList.remove("focus"),this===e?(t.activeComponent=null,this.events.blur&&this.emit("blur"),!0):!1},s.prototype.show=function(t){return this.visible?!0:(this.$node.classList.remove("hidden"),this.visible=!0,this.events.show&&this.emit("show",t),!0)},s.prototype.hide=function(){return this.visible?(this.$node.classList.add("hidden"),this.visible=!1,this.events.hide&&this.emit("hide"),!0):!0},t.exports=s},function(t,e,i){"use strict";t.exports={back:8,"delete":46,channelPrev:1009,channelNext:9,ok:13,exit:27,up:38,down:40,left:37,right:39,pageUp:33,pageDown:34,end:35,home:36,volumeUp:107,volumeDown:109,f1:112,f2:113,f3:114,f4:115,refresh:116,frame:117,phone:119,set:120,tv:121,menu:122,web:123,mic:2032,rewind:2066,forward:2070,app:2076,usbMounted:2080,usbUnmounted:2081,playPause:2082,stop:2083,power:2085,record:2087,info:2089,mute:2192,clock:2032,audio:2071,keyboard:2076}},function(t,e,i){"use strict";var s,n=i(4);s=new n,s.current=null,s.history=[],s.pages=[],s.ids={},s.init=function(t){var e,i,s;if(t){for(this.pages=[],this.pages=t,e=0,i=t.length;i>e;e++)s=t[e],this.ids[s.id]=s,s.active&&(this.current=s);return this.events.init&&this.emit("init",{pages:t}),!0}return!1},s.parse=function(t){var e={name:"",data:[]};return e.data=t.split("/").map(decodeURIComponent),e.name=e.data.shift().slice(1),e},s.stringify=function(t,e){return e=Array.isArray(e)?e:[],t=encodeURIComponent(t),e=e.map(encodeURIComponent),e.unshift(t),e.join("/")},s.show=function(t,e){return t&&!t.active?(t.$node.classList.add("active"),t.active=!0,this.current=t,t.events.show&&t.emit("show",{page:t,data:e}),!0):!1},s.hide=function(t){return t&&t.active?(t.$node.classList.remove("active"),t.active=!1,this.current=null,t.events.hide&&t.emit("hide",{page:t}),!0):!1},s.navigate=function(t,e){var i=this.current,s=this.ids[t];return s&&!s.active?(location.hash=this.stringify(t,e),this.hide(this.current),this.show(s,e),this.events.navigate&&this.emit("navigate",{from:i,to:s}),this.history.push(s),!0):!1},s.back=function(){var t,e;return this.history.length>1&&(t=this.history.pop(),e=this.history[this.history.length-1],e&&!e.active)?(location.hash=e.id,this.hide(this.current),this.show(e),this.events.navigate&&this.emit("navigate",{from:t,to:e}),!0):!1},t.exports=s},function(t,e,i){"use strict";function s(){this.events={}}s.prototype={addListener:function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},once:function(t,e){var i=this;this.events[t]=this.events[t]||[],this.events[t].push(function s(){e.apply(this,arguments),i.removeListener(t,s)})},addListeners:function(t){var e;if("object"==typeof t)for(e in t)t.hasOwnProperty(e)&&this.addListener(e,t[e])},removeListener:function(t,e){this.events[t]&&(this.events[t]=this.events[t].filter(function(t){return t!==e}),0===this.events[t].length&&(this.events[t]=void 0))},removeAllListeners:function(t){0===arguments.length?this.events={}:t&&(this.events[t]=void 0)},emit:function(t,e,i){var s,n=this.events[t];if(n)for(s=0;s<n.length;s++)n[s].apply(this,Array.prototype.slice.call(arguments,1))}},s.prototype.constructor=s,t.exports=s},function(t,e){"use strict";var i=0,s=1,n=2,o=3,a=4,r={},c={},d={},h={};r[i]={width:200,height:160,x:60,y:40},r[s]={width:r[i].width,height:r[i].height,x:460,y:40},r[n]={width:r[i].width,height:r[i].height,x:460,y:296},r[o]={width:r[i].width,height:r[i].height,x:60,y:296},c[i]={width:200,height:160,x:60,y:40},c[s]={width:c[i].width,height:c[i].height,x:460,y:40},c[n]={width:c[i].width,height:c[i].height,x:460,y:296},c[o]={width:c[i].width,height:c[i].height,x:60,y:296},d[i]={width:300,height:170,x:80,y:70},d[s]={width:d[i].width,height:d[i].height,x:900,y:70},d[n]={width:d[i].width,height:d[i].height,x:900,y:480},d[o]={width:d[i].width,height:d[i].height,x:80,y:480},h[i]={width:1.5*d[i].width,height:1.5*d[i].height,x:1.5*d[i].x,y:1.5*d[i].y},h[s]={width:1.5*d[i].width,height:1.5*d[i].height,x:1.5*d[s].x,y:1.5*d[s].y},h[n]={width:1.5*d[i].width,height:1.5*d[i].height,x:1.5*d[n].x,y:1.5*d[n].y},h[o]={width:1.5*d[i].width,height:1.5*d[i].height,x:1.5*d[o].x,y:1.5*d[o].y},t.exports={viewports:{"480i":r,"480p":r,"576i":c,"576p":c,"720p":d,"720p60":d,"1080i":h,"1080i60":h,"1080p":h,"1080p60":h},positions:{POSITION_LEFT_TOP:i,POSITION_RIGHT_TOP:s,POSITION_RIGHT_BOTTOM:n,POSITION_LEFT_BOTTOM:o,POSITION_NONE:a}}},function(t,e,i){"use strict";var s,n,o,a,r=i(9),c=i(3),d=i(2),h=i(17),p={};i(10),window.core=window.parent.getCoreInstanse(window),window.core.once("load",function(){s.data.time.load&&s.defaultEvents.load({type:"load"})}),window.localStorage=window.parent.localStorage||window.parent.stbStorage,window.parent&&window.parent.gSTB&&(window.dvbManager=window.parent.dvbManager,window.epgManager=window.parent.epgManager,window.gSTB=window.parent.gSTB,window.pvrManager=window.parent.pvrManager,window.stbDownloadManager=window.parent.stbDownloadManager,window.stbStorage=window.parent.stbStorage,window.stbUpdate=window.parent.stbUpdate,window.stbUPnP=window.parent.stbUPnP,window.stbWebWindow=window.parent.stbWebWindow,window.stbWindowMgr=window.parent.stbWindowMgr,window.timeShift=window.parent.timeShift),s=new r({debug:!1,host:!0,screen:null,time:{init:+new Date,load:0,done:0}}),s.setScreen=function(t){return t?(t.availHeight=t.height-(t.availTop+t.availBottom),t.availWidth=t.width-(t.availLeft+t.availRight),window.moveTo(0,0),window.resizeTo(t.width,t.height),o&&o instanceof HTMLLinkElement&&document.head.removeChild(o),a&&a instanceof HTMLLinkElement&&document.head.removeChild(a),a=document.createElement("link"),a.rel="stylesheet",a.href=window.core.theme.path+t.height+".css?"+ +new Date,document.head.appendChild(a),o=document.createElement("link"),o.rel="stylesheet",o.href="css/release."+t.height+".css?"+ +new Date,document.head.appendChild(o),this.data.metrics=t,!0):!1},s.EVENT_END_OF_FILE=1,s.EVENT_GET_MEDIA_INFO=2,s.EVENT_PLAYBACK_BEGIN=4,s.EVENT_CONTENT_ERROR=5,s.EVENT_DUAL_MONO_DETECT=6,s.EVENT_INFO_GET=7,s.EVENT_SUBTITLE_LOAD_ERROR=8,s.EVENT_SUBTITLE_FIND=9,s.EVENT_HDMI_CONNECT=32,s.EVENT_HDMI_DISCONNECT=33,s.EVENT_RECORD_FINISH_SUCCESSFULL=34,s.EVENT_RECORD_FINISH_ERROR=35,s.EVENT_DVB_SCANING=40,s.EVENT_DVB_FOUND=41,s.EVENT_DVB_CHANELL_EPG_UPDATE=42,s.EVENT_DVB_ANTENNA_OFF=43,s.setScreen(h[screen.height]||h[720]);for(n in d)"volumeUp"!==n&&"volumeDown"!==n&&(p[d[n]]=!0);s.defaultEvents={load:function(t){s.data.time.load=t.timeStamp,window.core.ready&&(s.events[t.type]&&s.emit(t.type,t),c.pages.forEach(function(e){e.events[t.type]&&e.emit(t.type,t)}),s.data.time.done=+new Date,s.events.done&&s.emit("done",t))},unload:function(t){s.events[t.type]&&s.emit(t.type,t),c.pages.forEach(function(e){e.events[t.type]&&e.emit(t.type,t)})},error:function(t){},keydown:function(t){var e,i=c.current,n={keyCode:t.keyCode,stop:t.stop,shiftKey:t.shiftKey,altKey:t.altKey,type:t.type,"native":t};0!==n.keyCode&&(n.code=n.keyCode,n.shiftKey&&(n.code+=1e3),n.altKey&&(n.code+=2e3),e=i.activeComponent,e&&e!==i&&(e.events[n.type]&&e.emit(n.type,n),!n.stop&&e.propagate&&e.parent&&e.parent.events[n.type]&&e.parent.emit(n.type,n)),n.stop||(i.events[n.type]&&i.emit(n.type,n),n.stop||s.events[n.type]&&s.emit(n.type,n)),s.data.host&&p[n.code]&&t.preventDefault())},keypress:function(t){var e=c.current;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t)},click:function(t){},contextmenu:function(t){t.preventDefault()},mousewheel:function(t){var e=c.current;e.activeComponent&&e.activeComponent!==e&&e.activeComponent.events[t.type]&&e.activeComponent.emit(t.type,t),t.stop||e.events[t.type]&&e.emit(t.type,t)}};for(n in s.defaultEvents)window.addEventListener(n,s.defaultEvents[n]);s.show=function(){this.events.show&&this.emit("show"),window.core.call("app:ready")},s.exit=function(t){var e,n=i(14),o=i(13),a=c.current.activeComponent;c.current.add(e=new n({title:gettext("Exit"),events:{show:function(){this.children[0].focus()},hide:function(){a.focus()}},children:[new o({size:2,focusIndex:0,data:[{items:[{value:gettext("Exit")}],click:function(){return"function"==typeof t&&t(!0)?(e.hide(),void e.remove()):(s.events.exit&&s.emit("exit"),e.hide(),e.remove(),void core.call("exit"))}},{items:[{value:gettext("Cancel")}],click:function(){"function"==typeof t&&t(!1),e.hide(),e.remove()}}],events:{keydown:function(i){o.prototype.defaultEvents.keydown.call(this,i),i.code===d.back&&(i.stop=!0,"function"==typeof t&&t(!1),e.hide(),e.remove())}}})]})),e.show(),e.focus()},window.stbEvent={},window.stbEvent.onEvent=function(t,e){if(Array.prototype.forEach.call(window.frames,function(i){i.stbEvent&&i.stbEvent.onEvent&&i.stbEvent.onEvent(t,e)}),s.events.media){if(e)try{e=JSON.parse(e)}catch(i){}s.emit("media",{code:parseInt(t,10),info:e})}},window.stbEvent.onBroadcastMessage=function(t,e,i){Array.prototype.forEach.call(window.frames,function(s){s.stbEvent&&s.stbEvent.onBroadcastMessage&&s.stbEvent.onBroadcastMessage(t,e,i)}),s.events.message&&s.emit("message",{broadcast:!0,windowId:t,message:e,data:i})},window.stbEvent.onMessage=function(t,e,i){Array.prototype.forEach.call(window.frames,function(s){s.stbEvent&&s.stbEvent.onMessage&&s.stbEvent.onMessage(t,e,i)}),s.events.message&&s.emit("message",{broadcast:!1,windowId:t,message:e,data:i})},window.stbEvent.onMount=function(t){Array.prototype.forEach.call(window.frames,function(e){e.stbEvent&&e.stbEvent.onMount&&e.stbEvent.onMount(t)}),s.events["device:mount"]&&s.emit("device:mount",{state:t})},window.stbEvent.onMediaAvailable=function(t,e){Array.prototype.forEach.call(window.frames,function(i){i.stbEvent&&i.stbEvent.onMediaAvailable&&i.stbEvent.onMediaAvailable(t,e)}),s.events["media:available"]&&s.emit("media:available",{mime:t,url:e})},window.stbEvent.onNetworkStateChange=function(t){s.events["internet:state"]&&s.emit("internet:state",{state:t})},window.stbEvent.onWebBrowserProgress=function(t){Array.prototype.forEach.call(window.frames,function(e){e.stbEvent&&e.stbEvent.onWebBrowserProgress&&e.stbEvent.onWebBrowserProgress(t)}),s.events["browser:progress"]&&s.emit("browser:progress",{progress:t})},window.stbEvent.onWindowActivated=function(){Array.prototype.forEach.call(window.frames,function(t){t.stbEvent&&t.stbEvent.onWindowActivated&&t.stbEvent.onWindowActivated()}),s.events["window:focus"]&&s.emit("window:focus")},window.gSTB&&gSTB.SetNativeStringMode&&gSTB.SetNativeStringMode(!0),t.exports=s},function(t,e,i){"use strict";function s(t){t=t||{},this.$focusItem=null,this.viewIndex=null,this.data=[],this.type=this.TYPE_VERTICAL,this.size=5,this.cycle=!1,this.scroll=null,t.type&&(this.type=t.type),this.provider=null,t.className="list "+(t.className||""),this.type===this.TYPE_HORIZONTAL&&(t.className+=" horizontal"),o.call(this,t),this.init(t)}function n(t){var e,i;for(e=0;e<t.length;e++)i=t[e],"object"!=typeof i&&(i=t[e]={value:t[e]});return t}var o=i(1),a=i(2);s.prototype=Object.create(o.prototype),s.prototype.constructor=s,s.prototype.TYPE_VERTICAL=1,s.prototype.TYPE_HORIZONTAL=2,s.prototype.renderItemDefault=function(t,e){t.innerText=e.value},s.prototype.renderItem=s.prototype.renderItemDefault,s.prototype.defaultEvents={mousewheel:function(t){this.type===this.TYPE_VERTICAL&&t.wheelDeltaY&&this.move(t.wheelDeltaY>0?a.up:a.down),this.type===this.TYPE_HORIZONTAL&&t.wheelDeltaX&&this.move(t.wheelDeltaX>0?a.left:a.right)},keydown:function(t){switch(t.code){case a.up:case a.down:case a.right:case a.left:case a.pageUp:case a.pageDown:case a.home:case a.end:this.move(t.code);break;case a.ok:this.events["click:item"]&&this.emit("click:item",{$item:this.$focusItem,event:t})}}},s.prototype.init=function(t){var e,i,s=this,n=this.$body.children.length,o=function(t){this.data&&(s.focusItem(this),s.events["click:item"]&&s.emit("click:item",{$item:this,event:t}))};if(void 0!==t.cycle&&(this.cycle=t.cycle),t.scroll&&(this.scroll=t.scroll),t.provider&&(this.provider=t.provider),t.render&&(this.renderItem=t.render),t.size&&(this.size=t.size),this.size!==n)for(n>0&&(this.$body.innerText=null),i=0;i<this.size;i++)e=document.createElement("div"),e.index=i,e.className="item",e.addEventListener("click",o),this.$body.appendChild(e);void 0!==t.viewIndex,this.viewIndex=null,this.provider?this.provider.get(null,function(e,i){e?s.events["data:error"]&&s.emit("data:error",e):(i&&(t.data=i,s.setData(t)),s.events["data:get"]&&s.emit("data:get"))}):t.data&&this.setData(t)},s.prototype.setData=function(t){t.data&&(this.data=n(t.data)),this.viewIndex=null,this.$focusItem&&this.blurItem(this.$focusItem),void 0!==t.focusIndex&&this.data.length?this.focusIndex(t.focusIndex):this.renderView(t.viewIndex||0)},s.prototype.renderView=function(t){var e,i,s,n,o;if(this.viewIndex!==t){for(n=this.viewIndex,this.viewIndex=o=t,i=0;i<this.size;i++)e=this.$body.children[i],s=this.data[t],s?(e.data=s,e.index=t,this.renderItem(e,s),s.mark?e.classList.add("mark"):e.classList.remove("mark")):(e.data=e.index=void 0,e.innerHTML="&nbsp;",e.ready=!1),t++;return this.events["move:view"]&&this.emit("move:view",{prevIndex:n,currIndex:o}),this.events["select:item"]&&this.emit("select:item",{$item:e}),this.scroll&&this.scroll.scrollTo(this.viewIndex),!0}return!1},s.prototype.move=function(t){var e=this,i=!1;if(this.data.length)switch(t){case a.left:if(this.type!==this.TYPE_HORIZONTAL)break;i=!0;case a.up:(i||this.type===this.TYPE_VERTICAL)&&(this.$focusItem&&this.$focusItem.index>0?this.$focusItem===this.$body.firstChild?this.renderView(this.viewIndex-1):this.focusItem(this.$focusItem.previousSibling):this.provider?this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:e.$focusItem.index})}):(this.cycle&&this.move(a.end),this.events.overflow&&this.emit("overflow",{direction:t,cycle:this.cycle})));break;case a.right:if(this.type!==this.TYPE_HORIZONTAL)break;i=!0;case a.down:(i||this.type===this.TYPE_VERTICAL)&&(this.$focusItem&&this.$focusItem.index<this.data.length-1?this.$focusItem===this.$body.lastChild?this.renderView(this.viewIndex+1):this.focusItem(this.$focusItem.nextSibling):this.provider?this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:e.$focusItem.index})}):(this.cycle&&this.move(a.home),this.events.overflow&&this.emit("overflow",{direction:t,cycle:this.cycle})));break;case a.pageUp:if(this.provider)return void this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:0})});this.viewIndex<this.size?this.renderView(0):this.renderView(this.viewIndex-this.size+1),this.focusItem(this.$body.firstChild);break;case a.pageUp:if(this.provider){this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:0})});break}this.viewIndex<this.size?this.renderView(0):this.renderView(this.viewIndex-this.size+1),this.focusItem(this.$body.firstChild);break;case a.pageDown:if(this.provider){this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:i.length<e.size?i.length-1:e.size-1})});break}this.data.length>this.size?(this.viewIndex>this.data.length-2*this.size?this.renderView(this.data.length-this.size):this.renderView(this.viewIndex+this.size-1),this.focusItem(this.$body.lastChild)):this.focusItem(this.$body.children[this.data.length-1]);break;case a.home:if(this.provider){this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:0})});break}this.renderView(0),this.focusItem(this.$body.firstChild);break;case a.end:if(this.provider){this.provider.get(t,function(t,i){t?e.events["data:error"]&&e.emit("data:error",t):i&&e.setData({data:i,focusIndex:i.length<e.size?i.length-1:e.size-1})});break}this.data.length>this.size?(this.renderView(this.data.length-this.size),this.focusItem(this.$body.lastChild)):this.focusItem(this.$body.children[this.data.length-1])}},s.prototype.focusItem=function(t){var e=this.$focusItem;return t&&e!==t?(null!==e&&(e.classList.remove("focus"),this.events["blur:item"]&&this.emit("blur:item",{$item:e})),this.$focusItem=t,this.$focusItem.data=this.data[this.$focusItem.index],t.classList.add("focus"),this.events["focus:item"]&&this.emit("focus:item",{$prev:e,$curr:t}),this.events["select:item"]&&this.emit("select:item",{$item:t}),!0):!1},s.prototype.blurItem=function(t){return t?(t===this.$focusItem&&(this.$focusItem=null),t.classList.remove("focus"),this.events["blur:item"]&&this.emit("blur:item",{$item:t}),!0):!1},s.prototype.focusIndex=function(t){var e=this.viewIndex||0;t>=e+this.size?(t=t<this.data.length-1?t:this.data.length-1,this.renderView(t-this.size+1),this.focusItem(this.$body.lastChild)):e>t?(t=t>0?t:0,this.renderView(t),this.focusItem(this.$body.firstChild)):(null===this.viewIndex&&this.renderView(0),this.focusItem(this.$body.children[t-e]))},s.prototype.markItem=function(t,e){e?t.classList.add("mark"):t.classList.remove("mark"),t.data.mark=e},t.exports=s},function(t,e,i){"use strict";function s(t){var e=a.data.viewports[t];switch(t){case r.positions.POSITION_LEFT_BOTTOM:window.pmPlayerSpace.innerHTML="",window.pmPlayer.className="lb";break;case r.positions.POSITION_RIGHT_TOP:window.pmPlayerSpace.innerHTML="",window.pmPlayer.className="rt";break;case r.positions.POSITION_LEFT_TOP:window.pmPlayerSpace.innerHTML="",window.pmPlayer.className="lt";break;case r.positions.POSITION_RIGHT_BOTTOM:window.pmPlayerSpace.innerHTML="",window.pmPlayer.className="rb";break;case r.positions.POSITION_NONE:window.pmPlayer.className="none",e={width:0,height:0,x:0,y:0},window.pmPlayerSpace.classList.add("active"),window.pmPlayerSpace.innerHTML=m.data.title}return m.emit("viewport",e),I=t,e}function n(){f?(O[I].classList.remove("active"),O[I].classList.remove("audio"),window.pageMain.className="component page active",window.pmPlayer.style.background="",u.$node.style.visibility="",window.pmPlayerSpace.classList.add("active"),u.focus()):(O[I].classList.add("active"),m&&m.mime&&"content/audio"===m.mime&&O[I].classList.add("audio"),window.pageMain.className="component page active bgReposition",window.pmPlayer.style.background="transparent",u.$node.style.visibility="hidden",window.pmPlayerSpace.classList.remove("active"),l.focus(),I===r.positions.POSITION_NONE&&(window.pmPlayerSpace.classList.add("active"),window.pmPlayerSpace.innerHTML=m.data.title)),f=!f}var o=(i(3),i(2)),a=i(6),r=i(5),c=i(16),d=i(11),h=i(7),p=i(15),l=new p({$node:window.pageMain,focusable:!0}),u=new h({$node:window.pmPlayerButtonList,size:5,type:h.prototype.TYPE_HORIZONTAL,parent:l,data:[{className:"maximize",onclick:function(){window.pageMain.className="component page",w=!1,clearInterval(y),window.pmPlayerSpace.classList.remove("audio"),m.emit("maximize"),window.core.taskManager.topApp?window.core.taskManager.topApp.$iframe.style.visibility="hidden":window.core.taskManager.launcher.$iframe.style.visibility="hidden",window.core.taskManager.show(window.core.taskManager.apps[m.creator],!0),m=null}},{className:"swap",onclick:function(){m.emit("swap"),v.init({max:m.data.duration,value:0})}},{className:"pause",onclick:function(t){T?(m.emit("pause"),t.$item.className="item button play focus"):(m.emit("resume"),t.$item.className="item button pause focus"),T=!T}},{className:"layout",onclick:function(t){setTimeout(function(){f||n()},0)}},{className:"close",onclick:function(){m.emit("stop"),window.core.call("hide"),window.core.call("blur"),w=!1,T=!1,clearInterval(y),window.core.active=!1,m=null}}],render:function(t,e){t.button=new d({className:e.className,$node:t,value:""})},events:{"click:item":function(t){t.$item.data.onclick(t)}}}),v=new c({$node:window.pmPlayerProgressBar,parent:l,min:0,max:100,value:10}),m=null,w=!1,f=!1,T=!1,y=-1,I=r.positions.POSITION_RIGHT_BOTTOM,O=document.body.querySelectorAll("#pageMain > .playerSpace"),g=!1;l.addListener("show",function(){u.focus(),u.focusIndex(2)}),l.addListener("keydown",function(t){var e=null;if(f){switch(t.code){case o.back:case o.ok:n();break;case o.left:switch(I){case r.positions.POSITION_RIGHT_TOP:e=r.positions.POSITION_LEFT_TOP;break;case r.positions.POSITION_RIGHT_BOTTOM:e=r.positions.POSITION_LEFT_BOTTOM}break;case o.right:switch(I){case r.positions.POSITION_LEFT_TOP:e=r.positions.POSITION_RIGHT_TOP;break;case r.positions.POSITION_LEFT_BOTTOM:e=r.positions.POSITION_RIGHT_BOTTOM}break;case o.up:switch(I){case r.positions.POSITION_RIGHT_BOTTOM:e=r.positions.POSITION_RIGHT_TOP;break;case r.positions.POSITION_LEFT_BOTTOM:e=r.positions.POSITION_LEFT_TOP;break;case r.positions.POSITION_NONE:e=r.positions.POSITION_RIGHT_BOTTOM}break;case o.down:switch(I){case r.positions.POSITION_RIGHT_BOTTOM:window.pmPlayer.className="none",e=r.positions.POSITION_NONE;break;case r.positions.POSITION_LEFT_TOP:e=r.positions.POSITION_LEFT_BOTTOM;break;case r.positions.POSITION_RIGHT_TOP:e=r.positions.POSITION_RIGHT_BOTTOM}}null!==e&&(O[I].classList.remove("active"),O[I].classList.remove("audio"),O[I].style.display="none",O[I].offsetHeight,O[I].style.display="",s(e),O[e].classList.add("active"),m&&m.mime&&"content/audio"===m.mime&&O[e].classList.add("audio"))}}),window.core.addListener("hide",function(){f&&n(),window.pageMain.className="component page",w=!1}),window.core.addListener("intent",function(t,e){switch(t.action){case"pip":m=t,m.addListener("exit",function(){window.pageMain.className="component page",w=!1,clearInterval(y),window.core.taskManager.topApp?window.core.taskManager.topApp.$iframe.style.visibility="hidden":window.core.taskManager.launcher.$iframe.style.visibility="hidden",window.core.taskManager.show(window.core.taskManager.apps[m.creator]),m=null}),m.data.viewport=s(I),window.pmPlayerSpace.classList.remove("audio"),t.data&&t.data.duration?(v.init({max:t.data.duration,value:0}),v.show()):v.hide(),window.pageMain.className="component page",w=!1,T=!0,window.core.intent({action:"pip-active",data:m.data,mime:m.mime,silent:!0,events:{viewport:function(t){m&&m.emit("viewport",t)},block:function(t){g=t}}},function(){}),e(!1,{})}}),window.core.addListener("keydown:"+o.refresh,function(){m&&!g&&(w?(window.pmPlayerSpace.classList.remove("audio"),window.core.call("blur"),f&&n(),window.pageMain.className="component page",w=!1):(window.core.call("focus"),window.pageMain.className="component page active",clearInterval(y),m.data&&m.data.position?y=setInterval(function(){v.set(m.data.position)},900):v.hide(),w=!0,window.core.call("show"),m&&m.mime&&"content/audio"===m.mime&&window.pmPlayerSpace.classList.add("audio")))}),window.core.addListener("keydown:"+o.web,function(){window.core.call("hide"),w=!1}),t.exports=l},function(t,e,i){"use strict";function s(t){n.call(this),this.data=t||{}}var n=i(4);s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype.idName="id",s.prototype.clear=function(){var t=this.data;return Object.keys(t).length>0?(this.data={},this.events.clear&&this.emit("clear",{data:t}),!0):!1},s.prototype.init=function(t){return t?(this.clear(),this.data=t,this.events.init&&this.emit("init",{data:t}),!0):!1},s.prototype.has=function(t){return this.data.hasOwnProperty(t)},s.prototype.get=function(t){return this.data[t]},s.prototype.set=function(t,e){var i=t in this.data,s={name:t,curr:e};return i?(s.prev=this.data[t],e!==s.prev?(this.data[t]=e,this.events.change&&this.emit("change",s),!0):!1):(this.data[t]=e,this.events.change&&this.emit("change",s),!0)},s.prototype.unset=function(t){var e,i=t in this.data;return i?(e={name:t,prev:this.data[t]},delete this.data[t],this.events.change&&this.emit("change",e),!0):!1},t.exports=s},function(t,e){"use strict";if(!("classList"in document.documentElement)){var i=Array.prototype,s=i.indexOf,n=i.slice,o=i.push,a=i.splice,r=i.join;window.DOMTokenList=function(t){if(this._element=t,t.className!==this._classCache){if(this._classCache=t.className,!this._classCache)return;var e,i=this._classCache.replace(/^\s+|\s+$/g,"").split(/\s+/);for(e=0;e<i.length;e++)o.call(this,i[e])}},window.DOMTokenList.prototype={add:function(t){this.contains(t)||(o.call(this,t),this._element.className=n.call(this,0).join(" "))},contains:function(t){return-1!==s.call(this,t)},item:function(t){return this[t]||null},remove:function(t){var e=s.call(this,t);-1!==e&&(a.call(this,e,1),this._element.className=n.call(this,0).join(" "))},toString:function(){return r.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},Object.defineProperty(Element.prototype,"classList",{get:function(){return new window.DOMTokenList(this)}})}},function(t,e,i){"use strict";function s(t){t=t||{},t.className="button "+(t.className||""),n.call(this,t),t.icon&&(this.$icon=this.$body.appendChild(document.createElement("div")),this.$icon.className="icon "+t.icon),this.$text=this.$body.appendChild(document.createElement("div")),this.$text.classList.add("text"),t.value&&(this.$text.innerText=t.value)}var n=i(1),o=i(2);s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype.clickDuration=200,s.prototype.defaultEvents={click:function(){var t=this;this.$node.classList.add("click"),setTimeout(function(){t.$node.classList.remove("click")},this.clickDuration)},keydown:function(t){t.code===o.ok&&this.events.click&&this.emit("click",{event:t})}},t.exports=s},function(t,e,i){"use strict";function s(t){t=t||{},this.focusIndex=0,t.className="layout "+(t.className||""),this.data=[],o.call(this,t),this.init(t),this.addListener("keydown",function(t){switch(t.code){case a.right:this.children.length&&this.focusIndex<this.children.length-1&&this.children[++this.focusIndex].focus();break;case a.left:this.children.length&&this.focusIndex>0&&this.children[--this.focusIndex].focus();break;case a.back:this.parent.focus(),this.parent&&this.$parentItem&&this.parent.focusItem(this.$parentItem)}})}function n(t){var e,i;for(e=0;e<t.length;e++)i=t[e],"object"!=typeof i?t[e]={value:t[e],wrap:!0}:i instanceof o||i instanceof HTMLElement?t[e]={value:i,wrap:!1}:t[e].wrap=!0;return t}var o=i(1),a=i(2);s.prototype=Object.create(o.prototype),s.prototype.constructor=s,s.prototype.init=function(t){for(var e,i,s,a=this,r=n(t.data);this.$node.firstChild;)this.$node.removeChild(this.$node.firstChild);for(this.data=r,s=0;s<r.length;s++)e=r[s],"string"==typeof e.value?(i=document.createElement("div"),i.textContent=e.value,e.className&&(i.className=e.className),this.$node.appendChild(i)):e.value instanceof HTMLElement?e.wrap?(i=document.createElement("div"),e.className&&(i.className=e.className),i.appendChild(e.value),this.$node.appendChild(i)):this.$node.appendChild(e.value):e.value instanceof o&&(e.value.propagate=!0,e.value.index=this.children.length,e.value.addListener("click",function(){a.focusIndex=this.index}),e.wrap?(i=document.createElement("div"),e.className&&(i.className=e.className),i.appendChild(e.value.$node),this.$node.appendChild(i),this.children.push(e.value),e.value.parent=this):this.add(e.value))},t.exports=s},function(t,e,i){"use strict";function s(t){var e,i=this;t=t||{},this.handlers={},this.$noData=null,t.className="layoutList "+(t.className||""),t.propagate=t.propagate||!0,this.fixedData=t.fixedData||!1,t.$body=document.createElement("div"),t.$body.className="body",this.$noData=document.createElement("div"),this.$noData.className="noData hidden",n.call(this,t),this.$node.appendChild(this.$body),t.noData&&(t.noData instanceof Element?this.$noData.appendChild(t.noData):"string"==typeof t.noData&&(e=document.createElement("div"),e.innerText=t.noData,this.$noData.appendChild(e)),this.$node.appendChild(this.$noData)),this.addListener("click:item",function(t){t.$item.layout.children.length&&!t.inner&&t.$item.layout.children[t.$item.layout.focusIndex].focus(),t.inner&&(i.focus(),i.focusItem(t.$item)),i.handlers[t.$item.index]&&i.handlers[t.$item.index](t.$item)})}var n=i(7),o=i(12);s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype.renderItemDefault=function(t,e){var i,s;if(t.ready&&this.fixedData&&!t.innerHTML.length)for(s=0;s<e.items.length;s++)"string"==typeof e.items[s].value&&(t.layout.$node.childNodes[s].innerText=e.items[s].value,t.layout.$node.childNodes[s].className=e.items[s].className);else{for(;t.firstChild;)t.removeChild(t.firstChild);i=new o({focusable:!1,data:e.items}),t.appendChild(i.$node),t.layout=i,i.parent=this,i.$parentItem=t,i.addListener("click",function(){this.parent.emit("click:item",{$item:t,inner:!0})}),e.click&&(this.handlers[t.index]=e.click),t.ready=!0}t.value=e.value||{}},s.prototype.setData=function(t){n.prototype.setData.call(this,t),t.data&&t.data.length?this.$noData.classList.add("hidden"):this.$noData.classList.remove("hidden")},s.prototype.init=function(t){n.prototype.init.call(this,t),t.data&&t.data.length?this.$noData.classList.add("hidden"):this.$noData.classList.remove("hidden")},s.prototype.renderItem=s.prototype.renderItemDefault,t.exports=s},function(t,e,i){"use strict";function s(t){var e;t=t||{},t.focusable=t.focusable||!1,t.className="modalMessage "+(t.className||""),t.visible=t.visible||!1,t.$body=document.createElement("div"),t.$body.className="body",n.call(this,t),this.$node.appendChild(document.createElement("div")),this.$node.firstChild.appendChild(document.createElement("div")),this.$header=document.createElement("div"),this.$header.className="header",this.$text=this.$header.appendChild(document.createElement("div")),this.$text.classList.add("text"),this.$text.innerText=t.title||"",t.icon&&(this.$icon=this.$header.appendChild(document.createElement("div")),this.$icon.className="icon "+t.icon),e=document.createElement("div"),e.className="overlay",this.$node.firstChild.firstChild.appendChild(this.$header),this.$node.firstChild.firstChild.appendChild(this.$body),this.$node.firstChild.firstChild.appendChild(e)}var n=i(1);s.prototype=Object.create(n.prototype),
s.prototype.constructor=s,s.prototype.focus=function(){this.$node.classList.add("active"),n.prototype.focus.call(this),this.children[0]&&this.children[0]instanceof n&&this.children[0].focus()},s.prototype.blur=function(){this.$node.classList.remove("active"),n.prototype.blur.call(this)},t.exports=s},function(t,e,i){"use strict";function s(t){t=t||{},this.active=!1,this.activeComponent=null,t.className="page "+(t.className||""),n.call(this,t),this.active=this.$node.classList.contains("active"),null===this.$node.parentNode&&document.body.appendChild(this.$node),this.page=this}var n=i(1);s.prototype=Object.create(n.prototype),s.prototype.constructor=s,t.exports=s},function(t,e,i){"use strict";function s(t){t=t||{},this.max=100,this.min=0,this.value=0,this.step=1,t.focusable=t.focusable||!1,t.className="progressBar "+(t.className||""),n.call(this,t),this.$value=this.$body.appendChild(document.createElement("div")),this.$value.className="value",this.init(t)}var n=i(1);s.prototype=Object.create(n.prototype),s.prototype.constructor=s,s.prototype.set=function(t){var e=this.value;return this.value!==t&&t<=this.max&&t>=this.min?(this.value=t,t=Math.abs(this.value-this.min)/this.step,100===t&&this.events.done&&this.emit("done"),this.$value.style.width=t+"%",this.events.change&&this.emit("change",{curr:this.value,prev:e}),!0):!1},s.prototype.init=function(t){void 0!==t.max&&(this.max=t.max),void 0!==t.min&&(this.min=t.min),void 0!==t.value&&(this.value=t.value),this.step=Math.abs(this.max-this.min)/100,this.$value.style.width=Math.abs(this.min-this.value)/this.step+"%"},t.exports=s},function(t,e,i){"use strict";var s=i(5);t.exports={480:{height:480,width:720,availTop:24,availBottom:24,availRight:32,availLeft:48,playerWidth:s.viewports["480p"][s.positions.POSITION_LEFT_TOP].width,playerHeight:s.viewports["480p"][s.positions.POSITION_LEFT_TOP].height,leftTopX:s.viewports["480p"][s.positions.POSITION_LEFT_TOP].x,leftTopY:s.viewports["480p"][s.positions.POSITION_LEFT_TOP].y,rightTopX:s.viewports["480p"][s.positions.POSITION_RIGHT_TOP].x,rightTopY:s.viewports["480p"][s.positions.POSITION_RIGHT_TOP].y,rightBottomX:s.viewports["480p"][s.positions.POSITION_RIGHT_BOTTOM].x,rightBottomY:s.viewports["480p"][s.positions.POSITION_RIGHT_BOTTOM].y,leftBottomX:s.viewports["480p"][s.positions.POSITION_LEFT_BOTTOM].x,leftBottomY:s.viewports["480p"][s.positions.POSITION_LEFT_BOTTOM].y},576:{height:576,width:720,availTop:24,availBottom:24,availRight:26,availLeft:54,playerWidth:s.viewports["576p"][s.positions.POSITION_LEFT_TOP].width,playerHeight:s.viewports["576p"][s.positions.POSITION_LEFT_TOP].height,leftTopX:s.viewports["576p"][s.positions.POSITION_LEFT_TOP].x,leftTopY:s.viewports["576p"][s.positions.POSITION_LEFT_TOP].y,rightTopX:s.viewports["576p"][s.positions.POSITION_RIGHT_TOP].x,rightTopY:s.viewports["576p"][s.positions.POSITION_RIGHT_TOP].y,rightBottomX:s.viewports["576p"][s.positions.POSITION_RIGHT_BOTTOM].x,rightBottomY:s.viewports["576p"][s.positions.POSITION_RIGHT_BOTTOM].y,leftBottomX:s.viewports["576p"][s.positions.POSITION_LEFT_BOTTOM].x,leftBottomY:s.viewports["576p"][s.positions.POSITION_LEFT_BOTTOM].y},720:{height:720,width:1280,availTop:30,availBottom:30,availRight:40,availLeft:40,playerWidth:s.viewports["720p"][s.positions.POSITION_LEFT_TOP].width,playerHeight:s.viewports["720p"][s.positions.POSITION_LEFT_TOP].height,leftTopX:s.viewports["720p"][s.positions.POSITION_LEFT_TOP].x,leftTopY:s.viewports["720p"][s.positions.POSITION_LEFT_TOP].y,rightTopX:s.viewports["720p"][s.positions.POSITION_RIGHT_TOP].x,rightTopY:s.viewports["720p"][s.positions.POSITION_RIGHT_TOP].y,rightBottomX:s.viewports["720p"][s.positions.POSITION_RIGHT_BOTTOM].x,rightBottomY:s.viewports["720p"][s.positions.POSITION_RIGHT_BOTTOM].y,leftBottomX:s.viewports["720p"][s.positions.POSITION_LEFT_BOTTOM].x,leftBottomY:s.viewports["720p"][s.positions.POSITION_LEFT_BOTTOM].y},1080:{height:1080,width:1920,availTop:45,availBottom:45,availRight:60,availLeft:60,playerWidth:s.viewports["1080p"][s.positions.POSITION_LEFT_TOP].width,playerHeight:s.viewports["1080p"][s.positions.POSITION_LEFT_TOP].height,leftTopX:s.viewports["1080p"][s.positions.POSITION_LEFT_TOP].x,leftTopY:s.viewports["1080p"][s.positions.POSITION_LEFT_TOP].y,rightTopX:s.viewports["1080p"][s.positions.POSITION_RIGHT_TOP].x,rightTopY:s.viewports["1080p"][s.positions.POSITION_RIGHT_TOP].y,rightBottomX:s.viewports["1080p"][s.positions.POSITION_RIGHT_BOTTOM].x,rightBottomY:s.viewports["1080p"][s.positions.POSITION_RIGHT_BOTTOM].y,leftBottomX:s.viewports["1080p"][s.positions.POSITION_LEFT_BOTTOM].x,leftBottomY:s.viewports["1080p"][s.positions.POSITION_LEFT_BOTTOM].y}}}]);