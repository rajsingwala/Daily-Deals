(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[36],{114:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(217);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,c=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(o){a=!0,c=o}finally{try{n||null==s.return||s.return()}finally{if(a)throw c}}return r}}(e,t)||Object(n.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},1240:function(e,t,r){"use strict";r.r(t);var n=r(114),a=r(21),c=r.n(a),i=r(30),s=r(2),o=r(29),l=r(40),u=r(23),d=r(24),b=r(38),j=r(10),h=r(37),m=r.n(h),p=r(3),f=function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post("/create-or-update-user",{},{headers:{authtoken:t}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.default=function(){var e=Object(s.useState)(""),t=Object(n.a)(e,2),r=t[0],a=t[1],h=Object(u.c)(d.b),m=Object(j.f)(),g=Object(u.b)();Object(s.useEffect)((function(){null!==h&&m.push("/")}),[h]);var O=function(){var e=Object(i.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),r){e.next=4;break}return b.b.error("Email is required"),e.abrupt("return");case 4:return n={url:"https://daily-deals0.herokuapp.com/register/complete-registration",handleCodeInApp:!0},e.next=7,l.a.sendSignInLinkToEmail(r,n);case 7:b.b.success("Email has been sent to ".concat(r," click on link to complete registration")),window.localStorage.setItem("emailForRegister",r),a("");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){l.a.signInWithPopup(l.b).then(function(){var e=Object(i.a)(c.a.mark((function e(t){var r,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.user,console.log(r),e.next=4,r.getIdTokenResult();case 4:n=e.sent,f(n.token).then((function(e){g(Object(d.i)({name:r.displayName,email:e.data.email,token:n.token,photo:r.photoURL,role:e.data.role,_id:e.data._id}))})).catch((function(e){return console.log(e)})),m.push("/");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){return b.b.error(e.message)}))};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"register",children:Object(p.jsxs)("div",{className:"register_container",style:{height:"24rem"},children:[Object(p.jsx)("div",{className:"register_background"}),Object(p.jsx)("div",{className:"register_content",children:Object(p.jsx)("h1",{children:"Create Account"})}),Object(p.jsxs)("div",{className:"register_form",children:[Object(p.jsx)("input",{type:"email",placeholder:"Enter Email",onChange:function(e){return a(e.target.value)},value:r,autoFocus:!0}),Object(p.jsxs)("div",{className:"new_here",style:{marginTop:"1rem"},children:["Already an User?"," ",Object(p.jsx)(o.b,{to:"/login",style:{marginLeft:"0.4rem"},children:"Login"})]}),Object(p.jsx)("div",{className:"register_btn",onClick:O,children:Object(p.jsx)("span",{children:"REGISTER"})}),Object(p.jsx)("div",{className:"register_btn2",onClick:v,children:Object(p.jsx)("span",{children:"REGISTER WITH GOOGLE"})})]})]})}),Object(p.jsx)("div",{className:"register_mobile",children:Object(p.jsxs)("div",{className:"register_container_mobile2",style:{height:"24rem"},children:[Object(p.jsx)("div",{className:"register_background_mobile2"}),Object(p.jsx)("div",{className:"register_content",children:Object(p.jsx)("h1",{children:"Create Account"})}),Object(p.jsxs)("div",{className:"register_form",children:[Object(p.jsx)("input",{type:"email",placeholder:"Enter Email",onChange:function(e){return a(e.target.value)},value:r,autoFocus:!0}),Object(p.jsxs)("div",{className:"new_here",style:{marginTop:"1rem"},children:["Already an User?"," ",Object(p.jsx)(o.b,{to:"/login",style:{marginLeft:"0.4rem"},children:"Login"})]}),Object(p.jsx)("div",{className:"register_btn",onClick:O,children:Object(p.jsx)("span",{children:"REGISTER"})}),Object(p.jsx)("div",{className:"register_btn2",onClick:v,children:Object(p.jsx)("span",{children:"REGISTER WITH GOOGLE"})})]})]})})]})}},217:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(218);function a(e,t){if(e){if("string"===typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},218:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))}}]);
//# sourceMappingURL=36.85a9cf6c.chunk.js.map