import{c as d,r as i,d as m,a as n,j as e}from"./index-99225c5a.js";import{S as u}from"./sweetalert2.all-7a2e22d8.js";import{g as l}from"./gards-40b5e5be.js";import{C as f}from"./CartOrderUI-6e47b0ac.js";import"./CardProduct-8959dd22.js";import"./react-toastify.esm-9b2d9dc9.js";import"./useDispatch-38e48ee3.js";import"./Loading-b14edf56.js";function p(){const{id:s}=d(),[o,c]=i.useState(),a=m(r=>r.auth.auth);return i.useEffect(()=>{let r=!0;return(async()=>{if(a===!0){const{data:t}=await n.get(`https://ecomerce-kmcp.onrender.com/order/getSingleOrder/${s}`,{withCredentials:!0});t.status?r&&t.order&&c(t.order):u.fire({title:"orders retrived Faild!",text:t.message,icon:"error"})}})(),()=>{r=!1}},[a,s]),e.jsx(e.Fragment,{children:e.jsx("section",{className:"w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 h-100",children:o&&e.jsx(f,{products:o})})})}const E=l(p);export{p as CartOrder,E as default};