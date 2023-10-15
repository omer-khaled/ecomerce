import{r as e,d,a as n,j as s,L as x,g as o}from"./index-19290a20.js";import{S as h}from"./sweetalert2.all-9dcc25ec.js";import{a as m}from"./adminGards-99dc29e6.js";import"./Login-908d2cd0.js";import"./formik.esm-18368b5d.js";import"./modal-2d4d4cf4.js";import"./useDispatch-50e21e5b.js";function p(){const[a,i]=e.useState(null),c=d(t=>t.auth.auth);return e.useEffect(()=>{let t=!0;return(async()=>{try{if(c){i(()=>null);const{data:r}=await n.get("http://localhost:3002/order/lastestOrders",{withCredentials:!0});r.orders&&t&&i(r.orders)}}catch(r){h.fire({title:"error through retrived Data",text:r.message,icon:"error"})}})(),()=>{t=!1}},[c]),s.jsxs("main",{className:"w-100 flex-grow-1 m-0 align-items-start my-4 row",children:[s.jsx("section",{className:"col-6 box p-2",children:s.jsx("iframe",{className:"w-100",style:{background:"#FFFFFF",border:"none",borderRadius:"2px",boxShadow:"0 2px 10px 0 rgba(70, 76, 79, .2)"},height:"480",src:"https://charts.mongodb.com/charts-ecomercefullstack-ehqle/embed/charts?id=652a8cf0-f394-42de-8391-fdb72f11fad3&maxDataAge=60&theme=light&autoRefresh=true"})}),s.jsx("section",{className:"col-6  box p-2",children:s.jsx("iframe",{className:"w-100",style:{background:"#FFFFFF",border:"none",borderRadius:"2px",boxShadow:"0 2px 10px 0 rgba(70, 76, 79, .2)"},height:"480",src:"https://charts.mongodb.com/charts-ecomercefullstack-ehqle/embed/charts?id=652a9026-140a-4b70-8fdd-df8deb8d28d2&maxDataAge=60&theme=light&autoRefresh=true"})}),s.jsx("section",{className:"col-12  box p-2",children:a?a.length!==0?s.jsx("div",{className:"table-responsive",children:s.jsxs("table",{className:"table align-middle",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[s.jsx("th",{children:"actions"}),s.jsx("th",{children:"orderId"}),s.jsx("th",{children:"cart Details"}),s.jsx("th",{children:"order satus"}),s.jsx("th",{children:"paid"}),s.jsx("th",{children:"total"}),s.jsx("th",{children:"payment status"}),s.jsx("th",{children:"Time"}),s.jsx("th",{children:"Date"})]})}),s.jsx("tbody",{children:a==null?void 0:a.map(t=>s.jsxs("tr",{children:[(t==null?void 0:t.status)!=="Delivered"?s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:s.jsxs("div",{className:"w-100 d-flex justify-content-start align-items-center",children:[(t==null?void 0:t.status)==="in store"&&s.jsx("i",{className:"bi bi-truck me-2 pointer"}),(t==null?void 0:t.status)==="in shipping"&&s.jsx("i",{className:"bi bi-check2-circle pointer"})]})}):s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:"Successfully"}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"} pointer`,children:t==null?void 0:t._id}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:s.jsx(x,{to:`/ecomerce/admin/ordersCartAdmin/${t==null?void 0:t._id}`,children:"cart details"})}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:t==null?void 0:t.status}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:String(t==null?void 0:t.paid)}),s.jsxs("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:[String(t==null?void 0:t.totalPrice)," $"]}),s.jsxs("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:[t==null?void 0:t.paymentStatus," ",t!=null&&t.paid?s.jsx("i",{className:"bi bi-check-all"}):s.jsx("i",{className:"bi bi-x"})]}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:new Date(t==null?void 0:t.createdAt).toLocaleTimeString()}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:new Date(t==null?void 0:t.createdAt).toLocaleDateString()})]},t==null?void 0:t._id))})]})}):s.jsx("h1",{className:"text-center w-100 text-primary text-capitalize",children:"no orders for now"}):s.jsx(o,{classNamePropert:""})})]})}const $=m(p);export{p as AdminHome,$ as default};
