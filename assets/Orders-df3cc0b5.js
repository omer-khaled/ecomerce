import{r as o,d as m,a as l,j as t}from"./index-10652f01.js";import{k as n}from"./react-toastify.esm-7b674e2a.js";import{S as u}from"./sweetalert2.all-c14fc2e8.js";import{g as d}from"./gards-3b8d3d7a.js";import{O as c}from"./OrdersTable-508d690f.js";import"./Loading-f99c1e89.js";import"./adminGards-14a97f83.js";import"./Login-b98e6c44.js";import"./formik.esm-2dba3fb2.js";import"./modal-232ec21a.js";import"./useDispatch-fc7e8a64.js";function p(){const[a,i]=o.useState(null),s=m(r=>r.auth.auth);return o.useEffect(()=>{let r=!0;return(async()=>{if(s===!0){const{data:e}=await l.get("https://ecomerce-kmcp.onrender.com//order/getOrders");e.status?r&&e.orders&&i(e.orders):u.fire({title:"orders retrived Faild!",text:e.message,icon:"error"})}})(),()=>{r=!1}},[s]),t.jsxs(t.Fragment,{children:[t.jsx(c,{orders:a,admin:null}),t.jsx(n,{position:"bottom-left",autoClose:500,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})}const F=d(p);export{p as Orders,F as default};