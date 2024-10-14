!function(){"use strict";var e,t={954:function(e,t,s){var n=window.wp.domReady,a=s.n(n),o=window.wp.apiFetch,i=s.n(o),r=window.wp.url;const d=new Audio(hyve.audio.click),l=new Audio(hyve.audio.ping);var h=class{constructor(){this.isInitialToggle=!0,this.hasSuggestions=!1,this.messages=[],this.threadID=null,this.runID=null,this.recordID=null,this.renderUI(),this.setupListeners(),this.restoreStorage()}restoreStorage(){if(null===window.localStorage.getItem("hyve-chat"))return;const e=JSON.parse(window.localStorage.getItem("hyve-chat"));e.timestamp&&(864e5<new Date-new Date(e.timestamp)||null===e.threadID?window.localStorage.removeItem("hyve-chat"):(this.messages=e.messages,this.threadID=e.threadID,this.recordID=e.recordID,this.isInitialToggle=!1,this.messages.forEach((e=>{this.addMessage(e.time,e.message,e.sender,e.id,!1)}))))}updateStorage(){const e=this.messages.filter((e=>null===e.id)).slice(-20);window.localStorage.setItem("hyve-chat",JSON.stringify({timestamp:new Date,messages:e,threadID:this.threadID,recordID:this.recordID}))}add(e,t,s=null){const n=new Date;"user"===t&&(e=this.sanitize(e)),e=this.addTargetBlank(e),this.messages.push({time:n,message:e,sender:t,id:s}),this.addMessage(n,e,t,s),this.updateStorage(),"user"===t&&(this.sendRequest(e),this.hasSuggestions&&this.removeSuggestions())}sanitize(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}addTargetBlank(e){const t=document.createElement("div");return t.innerHTML=e,t.querySelectorAll("a").forEach((e=>{e.target="_blank"})),t.querySelectorAll("img").forEach((e=>{const t=document.createElement("a");t.href=e.src,t.target="_blank",t.appendChild(e.cloneNode(!0)),e.parentNode.replaceChild(t,e)})),t.innerHTML}setThreadID(e){this.threadID=e}setRunID(e){this.runID=e}setRecordID(e){this.recordID=e}setLoading(e){const t=document.querySelector("#hyve-text-input"),s=document.querySelector(".hyve-send-button button");t.disabled=e,s.disabled=e}async getResponse(e){try{const t=await i()({path:(0,r.addQueryArgs)(`${window.hyve.api}/chat`,{thread_id:this.threadID,run_id:this.runID,record_id:this.recordID,message:e}),headers:{"Cache-Control":"no-cache"}});if(t.error)return this.add("Sorry, I am not able to process your request at the moment. Please try again.","bot"),void this.removeMessage(this.runID);if("in_progress"===t.status)return void setTimeout((async()=>{await this.getResponse(e)}),2e3);this.removeMessage(this.runID),"completed"===t.status&&(this.add(t.message,"bot"),this.setLoading(!1)),"failed"===t.status&&(this.add("Sorry, I am not able to process your request at the moment. Please try again.","bot"),this.setLoading(!1))}catch(e){this.add("Sorry, I am not able to process your request at the moment. Please try again.","bot"),this.setLoading(!1)}}async sendRequest(e){try{this.setLoading(!0);const t=await i()({path:`${window.hyve.api}/chat`,method:"POST",data:{message:e,...null!==this.threadID?{thread_id:this.threadID}:{},...null!==this.recordID?{record_id:this.recordID}:{}}});if(t.error)return this.add("Sorry, I am not able to process your request at the moment. Please try again.","bot"),void this.setLoading(!1);t.thread_id!==this.threadID&&this.setThreadID(t.thread_id),t.record_id!==this.recordID&&this.setRecordID(t.record_id),this.setRunID(t.query_run),this.add("Typing...","bot",t.query_run),await this.getResponse(e)}catch(e){this.add("Sorry, I am not able to process your request at the moment. Please try again.","bot"),this.setLoading(!1)}}addAudioPlayback(e){e.play()}addMessage(e,t,s,n,a=!0){const o=document.getElementById("hyve-message-box"),i=new Date(e),r=`${String(i.getDate()).padStart(2,0)}/${String(i.getMonth()+1).padStart(2,0)}/${i.getFullYear()} ${String(i.getHours()).padStart(2,0)}:${String(i.getMinutes()).padStart(2,0)} ${12<=i.getHours()?"PM":"AM"}`;let d=`<div>${t}</div>`;null===n&&(d+=`<time datetime="${e}">${r}</time>`);const h=this.createElement("div",{className:`hyve-${s}-message`,innerHTML:d});"bot"===s&&window.hyve.colors?.assistant_background&&h.classList.add("is-dark"),"user"===s&&window.hyve.colors?.user_background&&h.classList.add("is-dark"),"user"!==s||window.hyve.colors?.user_background||void 0===window.hyve.colors?.user_background||h.classList.add("is-light"),null!==n&&(h.id=`hyve-message-${n}`),o.appendChild(h),o.scrollTop=o.scrollHeight,a&&this.addAudioPlayback(l)}removeMessage(e){const t=document.getElementById(`hyve-message-${e}`);t&&t.remove()}toggleChatWindow(e){const t=["hyve-open","hyve-close","hyve-window"].map((e=>document.getElementById(e)));if(e){t[0].style.display="none",t[1].style.display="block",t[2].style.display="block";const e=document.getElementById("hyve-message-box");e.scrollTop=e.scrollHeight}else t[0].style.display="block",t[1].style.display="none",t[2].style.display="none";if(this.addAudioPlayback(d),window.hyve.welcome&&""!==window.hyve.welcome&&this.isInitialToggle){this.isInitialToggle=!1;const e=window.hyve.welcome;setTimeout((()=>{this.add(e,"bot"),this.addSuggestions()}),1e3)}}addSuggestions(){const e=window.hyve?.predefinedQuestions;if(!Array.isArray(e))return;const t=e.filter((e=>""!==e.trim()));if(0===t.length)return;const s=document.getElementById("hyve-message-box");let n=["<span>Not sure where to start?</span>"];t.forEach((e=>{n.push(`<button>${e}</button>`)}));const a=this.createElement("div",{className:"hyve-suggestions",innerHTML:n.join("")});window.hyve.colors?.user_background&&a.classList.add("is-dark"),window.hyve.colors?.user_background||void 0===window.hyve.colors?.user_background||a.classList.add("is-light"),a.querySelectorAll("button").forEach((e=>{e.addEventListener("click",(()=>{this.add(e.textContent,"user")}))})),s.appendChild(a),this.hasSuggestions=!0}removeSuggestions(){const e=document.querySelector(".hyve-suggestions");e&&(e.remove(),this.hasSuggestions=!1)}setupListeners(){const e=document.getElementById("hyve-open"),t=document.getElementById("hyve-close"),s=document.getElementById("hyve-text-input"),n=document.getElementById("hyve-send-button");s&&n&&(e&&t&&(e.addEventListener("click",(()=>this.toggleChatWindow(!0))),t.addEventListener("click",(()=>this.toggleChatWindow(!1)))),s.addEventListener("keydown",(e=>{13===e.keyCode&&""!==s.value.trim()&&(this.add(s.value,"user"),s.value="")})),n.addEventListener("click",(()=>{""!==s.value.trim()&&(this.add(s.value,"user"),s.value="")})))}createElement(e,t,...s){const n=document.createElement(e);return Object.assign(n,t),s.forEach((e=>{"string"==typeof e?n.appendChild(document.createTextNode(e)):n.appendChild(e)})),n}renderUI(){const e=this.createElement("button",{className:"collapsible open",innerText:"💬"}),t=this.createElement("div",{className:"hyve-bar-open",id:"hyve-open"},e),s=this.createElement("button",{className:"collapsible close",innerHTML:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" focusable="false"><path d="M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"></path></svg>'}),n=this.createElement("div",{className:"hyve-bar-close",id:"hyve-close"},s);window.hyve.colors?.icon_background&&n.classList.add("is-dark"),window.hyve.colors?.icon_background||void 0===window.hyve.colors?.icon_background||n.classList.add("is-light");const a=this.createElement("div",{className:"hyve-window",id:"hyve-window"});window.hyve.colors?.chat_background&&a.classList.add("is-dark");const o=this.createElement("div",{className:"hyve-message-box",id:"hyve-message-box"}),i=this.createElement("div",{className:"hyve-input-box"}),r=this.createElement("div",{className:"hyve-write"}),d=this.createElement("input",{className:"hyve-input-text",type:"text",id:"hyve-text-input",placeholder:"Write a reply..."}),l=this.createElement("div",{className:"hyve-send-button",id:"hyve-send-button"},this.createElement("button",{className:"hyve-send-message",innerHTML:'<svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M31.083 16.589c0.105-0.167 0.167-0.371 0.167-0.589s-0.062-0.421-0.17-0.593l0.003 0.005c-0.030-0.051-0.059-0.094-0.091-0.135l0.002 0.003c-0.1-0.137-0.223-0.251-0.366-0.336l-0.006-0.003c-0.025-0.015-0.037-0.045-0.064-0.058l-28-14c-0.163-0.083-0.355-0.132-0.558-0.132-0.691 0-1.25 0.56-1.25 1.25 0 0.178 0.037 0.347 0.104 0.5l-0.003-0.008 5.789 13.508-5.789 13.508c-0.064 0.145-0.101 0.314-0.101 0.492 0 0.69 0.56 1.25 1.25 1.25 0 0 0 0 0.001 0h-0c0.001 0 0.002 0 0.003 0 0.203 0 0.394-0.049 0.563-0.136l-0.007 0.003 28-13.999c0.027-0.013 0.038-0.043 0.064-0.058 0.148-0.088 0.272-0.202 0.369-0.336l0.002-0.004c0.030-0.038 0.060-0.082 0.086-0.127l0.003-0.006zM4.493 4.645l20.212 10.105h-15.88zM8.825 17.25h15.88l-20.212 10.105z"></path></svg>'}));a.appendChild(o),r.appendChild(d),i.appendChild(r),i.appendChild(l),a.appendChild(i);const h=document.querySelectorAll("#hyve-chat");if(!0===Boolean(window?.hyve?.isEnabled)||0<h.length)return h.forEach((e=>{e.remove()})),document.body.appendChild(a),document.body.appendChild(t),void document.body.appendChild(n);const c=document.querySelector("#hyve-inline-chat");c&&c.appendChild(a)}};a()((()=>{new h}))}},s={};function n(e){var a=s[e];if(void 0!==a)return a.exports;var o=s[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,s,a,o){if(!s){var i=1/0;for(h=0;h<e.length;h++){s=e[h][0],a=e[h][1],o=e[h][2];for(var r=!0,d=0;d<s.length;d++)(!1&o||i>=o)&&Object.keys(n.O).every((function(e){return n.O[e](s[d])}))?s.splice(d--,1):(r=!1,o<i&&(i=o));if(r){e.splice(h--,1);var l=a();void 0!==l&&(t=l)}}return t}o=o||0;for(var h=e.length;h>0&&e[h-1][2]>o;h--)e[h]=e[h-1];e[h]=[s,a,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={57:0,350:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var a,o,i=s[0],r=s[1],d=s[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(a in r)n.o(r,a)&&(n.m[a]=r[a]);if(d)var h=d(n)}for(t&&t(s);l<i.length;l++)o=i[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(h)},s=self.webpackChunkhyve_lite=self.webpackChunkhyve_lite||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var a=n.O(void 0,[350],(function(){return n(954)}));a=n.O(a)}();