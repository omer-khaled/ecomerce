import{j as e,N as a,d as c,r,a as n,e as o,O as d}from"./index-d8365773.js";import{u as l}from"./useDispatch-017494cc.js";function m(){return e.jsxs("aside",{className:"h-100 col-2 bg-info box p-2 position-absolute left-0 top-0 shadow-lg d-flex flex-column",children:[e.jsx("h2",{className:"fs-5 fw-bold text-primary text-capitalize text-center",children:"admin dashboard"}),e.jsx("div",{className:"bg-info box p-2 overflow-auto",children:e.jsxs("div",{className:"h-80 fs-6 box py-3 overflow-auto",children:[e.jsx(a,{end:!0,to:"/ecomerce/admin",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover  w-100 d-flex justify-content-start align-items-center rounded  px-3 py-2 ",children:[e.jsx("i",{className:"bi bi-house-fill me-4"}),e.jsx("span",{children:"Home"})]})}),e.jsx(a,{to:"/ecomerce/admin/products",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2",children:[e.jsx("i",{className:"bi bi-cart4 me-4"}),e.jsx("span",{children:"Products"})]})}),e.jsx(a,{to:"/ecomerce/admin/categories",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2",children:[e.jsx("i",{className:"bi bi-tags-fill me-4"}),e.jsx("span",{children:"Categories"})]})}),e.jsx(a,{to:"/ecomerce/admin/companies",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2",children:[e.jsx("i",{className:"bi bi-building me-4"}),e.jsx("span",{children:"Companies"})]})}),e.jsx(a,{to:"/ecomerce/admin/blogs",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2",children:[e.jsx("i",{className:"bi bi-building me-4"}),e.jsx("span",{children:"Blogs"})]})}),e.jsx(a,{to:"/ecomerce/admin/orders",className:({isActive:t})=>t?"activenav text-decoration-none":"text-decoration-none",children:e.jsxs("div",{className:"admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2",children:[e.jsx("i",{className:"bi bi-menu-button-wide-fill me-4"}),e.jsx("span",{children:"Orders"})]})})]})})]})}function h(){const t=l(),i=c(s=>s.auth.auth);return r.useEffect(()=>{(async()=>{try{if(i===!1){const s=await n.get("https://ecomerce-kmcp.onrender.com/auth/adminrefresh",{withCredentials:!0});s.data.status&&(n.defaults.headers.common.Authorization=`Bearer ${s.data.accessToken}`,n.defaults.headers.common["Content-Type"]="application/json",t(o.login(s.data.accessToken)))}}catch{t(o.logout())}})()},[t,i]),e.jsxs("section",{className:"row w-100 m-0 mx-auto b-4  d-flex",children:[e.jsx(m,{}),e.jsx("div",{className:"col-2"}),e.jsx("section",{className:"col-10 m-0 p-3 bg-dark h-100vh  overflow-auto position-relative",children:e.jsx(d,{})})]})}export{h as default};
