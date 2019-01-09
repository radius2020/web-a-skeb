!function(){"use strict";var t,e;!function(){function t(t,e,s){var i=e.x,n=e.y,h=s.x-i,o=s.y-n;if(0!==h||0!==o){var a=((t.x-i)*h+(t.y-n)*o)/(h*h+o*o);a>1?(i=s.x,n=s.y):a>0&&(i+=h*a,n+=o*a)}return(h=t.x-i)*h+(o=t.y-n)*o}function e(e,s){var i=e.length-1,n=[e[0]];return function e(s,i,n,h,o){for(var a,r=h,l=i+1;l<n;l++){var c=t(s[l],s[i],s[n]);c>r&&(a=l,r=c)}r>h&&(a-i>1&&e(s,i,a,h,o),o.push(s[a]),n-a>1&&e(s,a,n,h,o))}(e,0,i,s,n),n.push(e[i]),n}function s(t,s,i){if(t.length<=2)return t;var n=void 0!==s?s*s:1;return t=e(t=i?t:function(t,e){for(var s,i,n,h,o,a=t[0],r=[a],l=1,c=t.length;l<c;l++)s=t[l],n=a,h=void 0,o=void 0,h=(i=s).x-n.x,o=i.y-n.y,h*h+o*o>e&&(r.push(s),a=s);return a!==s&&r.push(s),r}(t,n),n)}"function"==typeof define&&define.amd?define(function(){return s}):"undefined"!=typeof module?(module.exports=s,module.exports.default=s):"undefined"!=typeof self?self.simplify=s:window.simplify=s}(),t="undefined"!=typeof window?window:void 0,e=function(t,e){function s(s){if(this.hasDeviceMotion="ondevicemotion"in t,this.options={threshold:15,timeout:1e3},"object"==typeof s)for(var i in s)s.hasOwnProperty(i)&&(this.options[i]=s[i]);if(this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null,"function"==typeof e.CustomEvent)this.event=new e.CustomEvent("shake",{bubbles:!0,cancelable:!0});else{if("function"!=typeof e.createEvent)return!1;this.event=e.createEvent("Event"),this.event.initEvent("shake",!0,!0)}}return s.prototype.reset=function(){this.lastTime=new Date,this.lastX=null,this.lastY=null,this.lastZ=null},s.prototype.start=function(){this.reset(),this.hasDeviceMotion&&t.addEventListener("devicemotion",this,!1)},s.prototype.stop=function(){this.hasDeviceMotion&&t.removeEventListener("devicemotion",this,!1),this.reset()},s.prototype.devicemotion=function(e){var s,i,n,h=e.accelerationIncludingGravity;if(null===this.lastX&&null===this.lastY&&null===this.lastZ)return this.lastX=h.x,this.lastY=h.y,void(this.lastZ=h.z);s=Math.abs(this.lastX-h.x),i=Math.abs(this.lastY-h.y),n=Math.abs(this.lastZ-h.z),(s>this.options.threshold&&i>this.options.threshold||s>this.options.threshold&&n>this.options.threshold||i>this.options.threshold&&n>this.options.threshold)&&(new Date).getTime()-this.lastTime.getTime()>this.options.timeout&&(t.dispatchEvent(this.event),this.lastTime=new Date),this.lastX=h.x,this.lastY=h.y,this.lastZ=h.z},s.prototype.handleEvent=function(t){if("function"==typeof this[t.type])return this[t.type](t)},s},"function"==typeof define&&define.amd?define(function(){return e(t,t.document)}):"undefined"!=typeof module&&module.exports?module.exports=e(t,t.document):t.Shake=e(t,t.document);class s{constructor(t){this.path=[t],this.erasedPaths=[],this._lastAngle=null}get lastPoint(){return this.path[this.path.length-1]}moveTo(t){t={x:parseFloat(t.x),y:parseFloat(t.y)};const e=Math.atan2(t.x-this.lastPoint.x,t.y-this.lastPoint.y);e===this._lastAngle&&this.path.pop(),this._lastAngle=e,this.path.push(t)}simplifyPath(){this.path=simplify(this.path,.5)}shake(){return this.path.length>1&&(this.erasedPaths.push(this.path),this.path=[this.lastPoint],!0)}}window.customElements.define("touch-knob",class extends HTMLElement{constructor(){super(),this._angle=1,this._canDraw=!0,this._rotations=0,this._scale=10,this._TWO_PI=2*Math.PI,this.min=0,this.max=298,this._drawState=this._drawState.bind(this),this._onMousedown=this._onMousedown.bind(this),this._onMousemove=this._onMousemove.bind(this),this._onMouseup=this._onMouseup.bind(this),this._onPointerdown=this._onPointerdown.bind(this),this._onPointermove=this._onPointermove.bind(this),this._onPointerup=this._onPointerup.bind(this),this._onTouchend=this._onTouchend.bind(this),this._onTouchmove=this._onTouchmove.bind(this),this._onTouchstart=this._onTouchstart.bind(this)}get value(){return this.hasAttribute("value")?this.getAttribute("value"):0}set value(t){this.setAttribute("value",t)}connectedCallback(){this.style.setProperty("transform","rotate("+this._angle+"rad)"),"PointerEvent"in window?this.addEventListener("pointerdown",this._onPointerdown):(this.addEventListener("touchstart",this._onTouchstart),this.addEventListener("mousedown",this._onMousedown))}disconnectedCallback(){this.removeEventListener("pointerdown",this._onPointerdown),this.removeEventListener("touchstart",this._onTouchstart),this.removeEventListener("mousedown",this._onMousedown)}_onMousedown(t){this._touchX=t.clientX,this._touchY=t.clientY,this._handleStart(),document.addEventListener("mousemove",this._onMousemove),document.addEventListener("mouseup",this._onMouseup)}_onMousemove(t){t.preventDefault(),this._touchX=t.clientX,this._touchY=t.clientY,this._handleMove()}_onMouseup(t){t.preventDefault(),document.removeEventListener("mousemove",this._onMousemove),document.removeEventListener("mouseup",this._onMouseup),this._handleEnd()}_onTouchstart(t){t.preventDefault(),window.oncontextmenu=(()=>!1),this._touchX=t.changedTouches[0].clientX,this._touchY=t.changedTouches[0].clientY,this._handleStart(),this.addEventListener("touchmove",this._onTouchmove),this.addEventListener("touchend",this._onTouchend),this.addEventListener("touchcancel",this._onTouchend)}_onTouchmove(t){t.preventDefault(),this._touchX=t.targetTouches[0].clientX,this._touchY=t.targetTouches[0].clientY,this._handleMove()}_onTouchend(t){t.preventDefault(),window.oncontextmenu=null,this.removeEventListener("touchmove",this._onTouchmove),this.removeEventListener("touchend",this._onTouchend),this.removeEventListener("touchcancel",this._onTouchend),this._handleEnd()}_onPointerdown(t){t.preventDefault(),window.oncontextmenu=(()=>!1),this._touchX=t.clientX,this._touchY=t.clientY,this.setPointerCapture(t.pointerId),this._handleStart(),this.addEventListener("pointermove",this._onPointermove),this.addEventListener("pointerup",this._onPointerup),this.addEventListener("pointercancel",this._onPointerup)}_onPointermove(t){t.preventDefault(),this._touchX=t.clientX,this._touchY=t.clientY,this._handleMove()}_onPointerup(t){t.preventDefault(),window.oncontextmenu=null,this.releasePointerCapture(t.pointerId),this.removeEventListener("pointermove",this._onPointermove),this.removeEventListener("pointerup",this._onPointerup),this.removeEventListener("pointercancel",this._onPointerup),this._handleEnd()}_handleStart(){this._centerX=this.offsetLeft-this.scrollLeft+this.clientLeft+this.offsetWidth/2,this._centerY=this.offsetTop-this.scrollTop+this.clientTop+this.offsetHeight/2,this._initialAngle=this._angle,this._initialValue=parseFloat(this.value),this._initialTouchAngle=Math.atan2(this._touchY-this._centerY,this._touchX-this._centerX),this._attemptedAngle=this._angle,this._attemptedRotations=this._rotations,this._attemptedValue=this.value;const t=new CustomEvent("touch-knob-start",{bubbles:!0});this.dispatchEvent(t)}_handleMove(){!0===this._canDraw&&(this._canDraw=!1,window.requestAnimationFrame(this._drawState));const t=new CustomEvent("touch-knob-move",{bubbles:!0});this.dispatchEvent(t)}_handleEnd(){const t=new CustomEvent("touch-knob-end",{bubbles:!0});this.dispatchEvent(t)}_drawState(){const t=this._attemptedAngle;this._attemptedAngle=this._initialAngle-this._initialTouchAngle+Math.atan2(this._touchY-this._centerY,this._touchX-this._centerX),this._attemptedAngle=this._attemptedAngle-this._TWO_PI*Math.floor((this._attemptedAngle+Math.PI)/this._TWO_PI),t>-1.57&&t<0&&this._attemptedAngle>=0&&this._attemptedAngle<=1.57?this._attemptedRotations++:t<1.57&&t>0&&this._attemptedAngle<=0&&this._attemptedAngle>=-1.57&&this._attemptedRotations--,this._attemptedAngle>=0?this._attemptedValue=(this._attemptedAngle+this._TWO_PI*this._attemptedRotations)*this._scale:this._attemptedAngle<0&&(this._attemptedValue=(this._attemptedAngle+this._TWO_PI*(this._attemptedRotations+1))*this._scale),this._attemptedValue>=this.min&&this._attemptedValue<=this.max&&(this.value=this._attemptedValue,this._rotations=this._attemptedRotations,this._angle=this._attemptedAngle,this.style.setProperty("transform",`rotate(${this._angle}rad)`)),this._canDraw=!0}}),window.customElements.define("skeb-case",class extends HTMLElement{constructor(){super(),this._canDraw=!0,this._lastSketchAngle=null,this._onShake=this._onShake.bind(this),this._optimizeSketch=this._optimizeSketch.bind(this),this._requestOptimizeSketch=this._requestOptimizeSketch.bind(this),this._requestUpdateSketch=this._requestUpdateSketch.bind(this),this._toggleDetail=this._toggleDetail.bind(this),this._updateSketch=this._updateSketch.bind(this)}connectedCallback(){this._sketchModel=new s({x:10,y:10}),this._screen=this.querySelector(".screen"),this._activeSketch=this.querySelector(".active-sketch"),this._path=this.querySelector(".sketch-path"),this._stylus=this.querySelector(".sketch-stylus"),this._horzKnob=this.querySelector(".horz-knob"),this._vertKnob=this.querySelector(".vert-knob"),this.addEventListener("touch-knob-move",this._requestUpdateSketch,{capture:!1,passive:!0}),this.addEventListener("touch-knob-end",this._requestOptimizeSketch,{capture:!1,passive:!0}),this._shakeDetector=new Shake({threshold:5,timeout:200}),this._shakeDetector.start(),window.addEventListener("shake",this._onShake,{capture:!1,passive:!0}),this._shakeButton=this.querySelector(".button-shake"),this._shakeButton.addEventListener("click",this._onShake,{capture:!1,passive:!0}),this._detailButton=this.querySelector(".button-detail"),this._detailButton.addEventListener("click",this._toggleDetail,{capture:!1,passive:!0})}disconnectedCallback(){this.removeEventListener("touch-knob-move",this._requestUpdateSketch),this.removeEventListener("touch-knob-end",this._requestOptimizeSketch),window.removeEventListener("shake",this._onShake,{capture:!1,passive:!0}),this._shakeButton.removeEventListener("click",this._onShake,{capture:!1,passive:!0}),this._shakeDetector.stop(),this._detailButton.removeEventListener("click",this._toggleDetail,{capture:!1,passive:!0})}_requestUpdateSketch(){!0===this._canDraw&&(this._canDraw=!1,window.requestAnimationFrame(this._updateSketch))}_requestOptimizeSketch(){!0===this._canDraw&&(this._canDraw=!1,window.requestAnimationFrame(this._optimizeSketch))}_updateSketch(){this._sketchModel.moveTo({x:this._horzKnob.value,y:this._vertKnob.value}),this._drawSketch(),this._canDraw=!0}_optimizeSketch(){this._sketchModel.simplifyPath(),this._drawSketch(),this._canDraw=!0}_drawSketch(){const t=this._sketchModel.path,e=t[0];let s=`M ${e.x-2} ${e.y-2} M ${e.x+2} ${e.y+2} M ${e.x} ${e.y}`;for(let e=1;e<t.length;e++){const i=t[e];s+=` L ${i.x} ${i.y}`}this._path.setAttribute("d",s);const i=this._sketchModel.lastPoint;this._stylus.setAttribute("x1",i.x),this._stylus.setAttribute("x2",i.x),this._stylus.setAttribute("y1",i.y),this._stylus.setAttribute("y2",i.y)}_onShake(){if(this._sketchModel.shake()){const t=document.createElementNS("http://www.w3.org/2000/svg","path"),e=this._sketchModel.path[0],s=`M ${e.x-2} ${e.y-2} M ${e.x+2} ${e.y+2} M ${e.x} ${e.y}`;t.setAttributeNS(null,"d",s),t.classList.add("sketch-path");const i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.classList.add("erased-sketch"),i.setAttributeNS(null,"preserveAspectRatio","none"),i.setAttributeNS(null,"x","0"),i.setAttributeNS(null,"y","0"),i.setAttributeNS(null,"viewBox","0 0 300 300"),i.setAttributeNS(null,"height","100%"),i.style.opacity="1",i.appendChild(this._path),this._path=t,this._activeSketch.insertBefore(this._path,this._stylus),this._screen.insertBefore(i,this._activeSketch)}this._screen.querySelectorAll(".erased-sketch").forEach(t=>{let e=Number.parseFloat(t.style.opacity);if(e<=0)this._screen.removeChild(t);else{const s=1-(e-=.21);t.style.opacity=e,t.style.filter="blur("+s+"vw)"}})}_toggleDetail(){switch(this._detailButton.value){case"fast":this._screen.classList.add("fast"),this._screen.classList.remove("fanciest"),this._screen.classList.remove("fancy"),this._detailButton.textContent="✨ Fancy",this._detailButton.value="fancy";break;case"fancy":this._screen.classList.add("fancy"),this._screen.classList.remove("fanciest"),this._screen.classList.remove("fast"),this._detailButton.textContent="🌈 Fanciest",this._detailButton.value="fanciest";break;case"fanciest":this._screen.classList.add("fanciest"),this._screen.classList.remove("fancy"),this._screen.classList.remove("fast"),this._detailButton.textContent="🚀 Fast",this._detailButton.value="fast"}}}),window.customElements.define("toggle-fullscreen",class extends HTMLElement{constructor(){super(),this._onFullscreenchange=this._onFullscreenchange.bind(this),this._toggleFullscreen=this._toggleFullscreen.bind(this)}connectedCallback(){document.addEventListener("fullscreenchange",this._onFullscreenchange,{capture:!1,passive:!0}),this._fullscreenButton=this.querySelector(".button-fullscreen"),this._fullscreenButton.addEventListener("click",this._toggleFullscreen,{capture:!1,passive:!0})}disconnectedCallback(){this._fullscreenButton.removeEventListener("click",this._toggleFullscreen)}_onFullscreenchange(){null!==document.fullscreenElement?this._fullscreenButton.textContent="⤵️ Normal screen":this._fullscreenButton.textContent="⤴️ Fullscreen"}_toggleFullscreen(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()}}),"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("/sw.js").then(function(t){})})}();
//# sourceMappingURL=bundle.js.map