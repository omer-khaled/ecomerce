import{c as m,r as i,d,a as n,j as e}from"./index-99225c5a.js";import{S as l}from"./sweetalert2.all-7a2e22d8.js";import{a as u}from"./adminGards-093ffe52.js";import{C as p}from"./CartOrderUI-6e47b0ac.js";import"./Login-ce269f9f.js";import"./formik.esm-61ab1a81.js";import"./modal-ce0b874b.js";import"./useDispatch-38e48ee3.js";import"./CardProduct-8959dd22.js";import"./react-toastify.esm-9b2d9dc9.js";import"./Loading-b14edf56.js";function f(){const{id:o}=m(),[s,c]=i.useState(),a=d(t=>t.auth.auth);return i.useEffect(()=>{let t=!0;return(async()=>{if(a===!0){const{data:r}=await n.get(`https://ecomerce-kmcp.onrender.com/order/getSingleOrderAdmin/${o}`,{withCredentials:!0});console.log(r),r.status?t&&r.order&&c(r.order):l.fire({title:"orders retrived Faild!",text:r.message,icon:"error"})}})(),()=>{t=!1}},[a,o]),e.jsx(e.Fragment,{children:e.jsx("section",{className:"w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 h-100",children:s&&e.jsx(p,{products:s})})})}const P=u(f);export{f as CartOrder,P as default};