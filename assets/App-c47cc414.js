import{j as a,d as c,r as l,a as r,e as o,L as b,N as n,O as x}from"./index-594e7971.js";import{m as g}from"./modal-55d24c64.js";import{u as d}from"./useDispatch-a835cea6.js";import"./sweetalert2.all-ad33f0f6.js";function j(){return a.jsxs("footer",{className:"bg-light text-center text-white",children:[a.jsx("div",{className:"container p-4 pb-0",children:a.jsxs("section",{className:"mb-4",children:[a.jsx("a",{className:"btn text-white btn-floating m-1",style:{backgroundColor:"#55acee"},href:"#!",role:"button",children:a.jsx("i",{className:"bi bi-twitter"})}),a.jsx("a",{className:"btn text-white btn-floating m-1",style:{backgroundColor:"#dd4b39"},href:"#!",role:"button",children:a.jsx("i",{className:"bi bi-google"})}),a.jsx("a",{className:"btn text-white btn-floating m-1",style:{backgroundColor:"#ac2bac"},href:"#!",role:"button",children:a.jsx("i",{className:"bi bi-instagram"})}),a.jsx("a",{className:"btn text-white btn-floating m-1",style:{backgroundColor:"#0082ca"},href:"#!",role:"button",children:a.jsx("i",{className:"bi bi-linkedin"})}),a.jsx("a",{className:"btn text-white btn-floating m-1",style:{backgroundColor:"#333333"},href:"#!",role:"button",children:a.jsx("i",{className:"bi bi-github"})})]})}),a.jsxs("div",{className:"text-center p-3 text-primary",style:{backgroundColor:"rgba(0, 0, 0, 0.5)"},children:["© 2023 Copyright :",a.jsx("a",{className:"text-white",href:"https://omer-khaled.github.io/OmerKhaled/",children:" omer khaled"})]})]})}function p(){const t=c(e=>e.auth.auth),i=c(e=>e.auth.user),s=d(),[m,h]=l.useState(null),u=l.useCallback(async()=>{try{const{data:e}=await r.get("https://ecomerce-kmcp.onrender.com/auth/logout",{withCredentials:!0});e.status&&s(o.logout())}catch(e){console.log(e.message)}},[s]);return l.useEffect(()=>{(async()=>{try{if(t&&i){const{data:e}=await r.get(`https://ecomerce-kmcp.onrender.com/auth/getuser/${i}`,{withCredentials:!0});e.status&&e.user&&h(e.user)}}catch{g(!1,"retrived user Data failed","click here")}})()},[t,i]),a.jsx("nav",{className:"navbar navbar-expand-lg navbar-light bg-light rounded",children:a.jsxs("div",{className:"container-fluid",children:[a.jsxs(b,{to:"/ecomerce/",className:"navbar-brand",children:[a.jsx("span",{className:"fs-2 text-primary",children:"B"}),"uy"]}),a.jsx("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:a.jsx("span",{className:"navbar-toggler-icon"})}),a.jsx("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:a.jsxs("ul",{className:"navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center",children:[a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"/ecomerce/",children:[a.jsx("i",{className:"bi bi-house-fill"})," Home"]})}),a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"shop",children:[a.jsx("i",{className:"bi bi-shop"})," Shop"]})}),a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"blog",children:[a.jsx("i",{className:"bi bi-substack"})," Blog"]})}),t?a.jsxs(a.Fragment,{children:[a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"cart",children:[a.jsx("i",{className:"bi bi-cart-fill"})," cart"]})}),a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"orders",children:[a.jsx("i",{className:"bi bi-cart-fill"})," orders"]})}),a.jsx("li",{className:"nav-item",children:a.jsxs("button",{className:"nav-link","aria-current":"page",onClick:()=>{u()},children:[a.jsx("i",{className:"bi bi-door-open-fill text-danger"})," logout"]})}),a.jsx("li",{className:"nav-item",children:m&&a.jsx("div",{className:"",children:a.jsx("img",{className:"rounded-circle ",style:{width:"50px",height:"50px",objectFit:"cover",objectPosition:"top center"},src:"https://ecomerce-kmcp.onrender.com/images/"+m.image,alt:""})})})]}):a.jsxs(a.Fragment,{children:[a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"signup",children:[a.jsx("i",{className:"bi bi-door-closed-fill"})," Sign up"]})}),a.jsx("li",{className:"nav-item",children:a.jsxs(n,{className:({isActive:e})=>e?"nav-link active":"nav-link","aria-current":"page",to:"login",children:[a.jsx("i",{className:"bi bi-door-open-fill"})," Login"]})})]})]})})]})})}function y(){const t=d(),i=c(s=>s.auth.auth);return l.useEffect(()=>{(async()=>{try{if(i===!1){const s=await r.get("https://ecomerce-kmcp.onrender.com/auth/refresh",{withCredentials:!0});s.data.status&&(r.defaults.headers.common.Authorization=`Bearer ${s.data.accessToken}`,r.defaults.headers.common["Content-Type"]="application/json",t(o.login({token:s.data.accessToken,user:s.data.user})))}}catch{t(o.logout())}})()},[t,i]),a.jsxs("main",{className:"container d-flex flex-column min-100vh",children:[a.jsx(p,{}),a.jsx(x,{}),a.jsx(j,{})]})}export{y as default};
