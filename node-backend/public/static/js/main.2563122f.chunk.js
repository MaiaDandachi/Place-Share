(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[1],[,,,,,,,,,,,function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(0),l=Object(n.createContext)({isLoggedIn:!1,userId:null,token:null,login:function(){},logout:function(){}})},,,,function(e,t,a){"use strict";var n=a(0),l=a.n(n);a(38);t.a=function(e){return l.a.createElement("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay")},l.a.createElement("div",{className:"lds-dual-ring"}))}},,,function(e,t,a){"use strict";var n=a(0),l=a.n(n),c=a(7),r=a.n(c);a(28);t.a=function(e){return r.a.createPortal(l.a.createElement("div",{className:"backdrop",onClick:e.onPress}),document.getElementById("backdrop-hook"))}},,,,function(e,t,a){e.exports=a(39)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,function(e,t,a){},function(e,t,a){},,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(7),r=a.n(c),u=(a(27),a(1)),o=a(8),i=a(10),s=a(18),m=a(41);a(29);var E=function(e){var t=l.a.createElement(m.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0},l.a.createElement("aside",{className:"side-drawer",onClick:e.onClick},e.children));return r.a.createPortal(t,document.getElementById("drawer-hook"))};a(32);var d=function(e){return l.a.createElement("header",{className:"main-header"},e.children)},f=a(11);a(33);var g=function(e){var t=Object(n.useContext)(f.a);return l.a.createElement("ul",{className:"nav-links"},l.a.createElement("li",null,l.a.createElement(o.c,{to:"/",exact:!0},"All Users")),t.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{to:"/".concat(t.userId,"/places")}," My Places")),t.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{to:"/places/new"}," Add Place")),!t.isLoggedIn&&l.a.createElement("li",null,l.a.createElement(o.c,{to:"/auth"}," Authenticate")),t.isLoggedIn&&l.a.createElement("li",null," ",l.a.createElement("button",{onClick:t.logout}," LOG OUT ")))};a(37);var b,v=function(e){var t=Object(n.useState)(!1),a=Object(i.a)(t,2),c=a[0],r=a[1];function u(){r(!1)}return l.a.createElement(l.a.Fragment,null,c&&l.a.createElement(s.a,{onPress:u}),l.a.createElement(E,{show:c,onClick:u},l.a.createElement("nav",{className:"main-navigation__draer-nav"},l.a.createElement(g,null))),l.a.createElement(d,null,l.a.createElement("button",{className:"main-navigation__menu-btn",onClick:function(){r(!0)}},l.a.createElement("span",null),l.a.createElement("span",null),l.a.createElement("span",null)),l.a.createElement("h1",{className:"main-navigation__title"},l.a.createElement(o.b,{to:"/"},"Your Places")),l.a.createElement("nav",{className:"main-navigation__header-nav"},l.a.createElement(g,null))))},p=a(15),h=l.a.lazy((function(){return Promise.all([a.e(0),a.e(8)]).then(a.bind(null,72))})),k=l.a.lazy((function(){return Promise.all([a.e(0),a.e(5)]).then(a.bind(null,69))})),I=l.a.lazy((function(){return Promise.all([a.e(0),a.e(7)]).then(a.bind(null,73))})),O=l.a.lazy((function(){return Promise.all([a.e(0),a.e(6)]).then(a.bind(null,70))})),j=l.a.lazy((function(){return Promise.all([a.e(0),a.e(4)]).then(a.bind(null,71))}));var w=function(){var e,t=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],l=t[1],c=Object(n.useState)(!1),r=Object(i.a)(c,2),u=r[0],o=r[1],s=Object(n.useState)(),m=Object(i.a)(s,2),E=m[0],d=m[1],f=Object(n.useCallback)((function(e,t,a){l(t),o(e);var n=a||new Date((new Date).getTime()+36e5);d(n),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,expiration:n.toISOString()}))}),[]),g=Object(n.useCallback)((function(){l(null),d(null),o(null),localStorage.removeItem("userData")}),[]);return Object(n.useEffect)((function(){if(E){var e=E.getTime()-(new Date).getTime();b=setTimeout(g,e)}else clearTimeout(b)}),[a,g,E]),Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.expiration)>new Date&&f(e.userId,e.token,new Date(e.expiration))}),[f]),{token:a,login:f,logout:g,userId:u}}(),a=t.token,c=t.login,r=t.logout,s=t.userId;return e=a?l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(h,null)),l.a.createElement(u.b,{path:"/:userId/places",exact:!0},l.a.createElement(I,null)),l.a.createElement(u.b,{path:"/places/new",exact:!0},l.a.createElement(k,null)),l.a.createElement(u.b,{path:"/places/:placeId"},l.a.createElement(O,null)),l.a.createElement(u.a,{to:"/"})):l.a.createElement(u.d,null,l.a.createElement(u.b,{path:"/",exact:!0},l.a.createElement(h,null)),l.a.createElement(u.b,{path:"/:userId/places",exact:!0},l.a.createElement(I,null)),l.a.createElement(u.b,{path:"/auth"},l.a.createElement(j,null)),l.a.createElement(u.a,{to:"/auth"})),l.a.createElement(f.a.Provider,{value:{isLoggedIn:!!a,token:a,userId:s,login:c,logout:r}},l.a.createElement(o.a,null,l.a.createElement(v,null),l.a.createElement("main",null,l.a.createElement(n.Suspense,{fallback:l.a.createElement("div",{className:"center"},l.a.createElement(p.a,null))},e))))};r.a.render(l.a.createElement(w,null),document.getElementById("root"))}],[[22,2,3]]]);
//# sourceMappingURL=main.2563122f.chunk.js.map