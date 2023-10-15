import{r as c,a as u,j as s,L as m}from"./index-99225c5a.js";import j from"./Loading-b14edf56.js";import{S as d}from"./sweetalert2.all-7a2e22d8.js";import{a as f}from"./adminGards-093ffe52.js";const h=c.createContext({requestDone:!1,setRequestDone:()=>{}});function p(){const[e,i]=c.useState(!1),[o,n]=c.useState(null);return c.useEffect(()=>{let x=!0;return(async()=>{try{n(()=>null);const{data:r}=await u.get("https://ecomerce-kmcp.onrender.com/order/AdmingetOrders");r.orders&&x&&n(r.orders)}catch(r){d.fire({title:"error through retrived Data",text:r.message,icon:"error"})}})(),()=>{x=!1}},[e]),s.jsx(h.Provider,{value:{requestDone:e,setRequestDone:i},children:s.jsx(y,{admin:!0,orders:o})})}const g=f(p),S=Object.freeze(Object.defineProperty({__proto__:null,Orders:p,context:h,default:g},Symbol.toStringTag,{value:"Module"}));function y({orders:e,admin:i}){const{requestDone:o,setRequestDone:n}=c.useContext(h),x=c.useCallback(async t=>{try{const{data:a}=await u.get(`https://ecomerce-kmcp.onrender.com/cart/checkoutForExistsOrder/${t}?cancel_url=https://omer-khaled.github.io/ecomerce/failedPage&success_url=https://omer-khaled.github.io/ecomerce/successPage`,{headers:{"Content-Type":"application/json"},withCredentials:!0});a.url?d.fire({title:"Payment Ready For You",text:"Go To Payment",icon:"success"}).then(()=>{a.url&&(location.href=a.url)}):d.fire({title:"Cart is Empaty!",text:a.message,icon:"error"})}catch{}},[]),r=c.useCallback(async t=>{try{const{data:a}=await u.patch(`https://ecomerce-kmcp.onrender.com/order/updateStatusOrder/${t}`,{headers:{"Content-Type":"application/json"},withCredentials:!0});a.status?(d.fire({title:"Status updated Successfully",text:"Done",icon:"success"}),n(!o)):d.fire({title:"Status updated failed",text:a.message,icon:"error"})}catch{window.location.href="http://localhost:5173/failedPage"}},[o,n]);return s.jsx("section",{className:"row w-100 m-0 flex-grow-1 align-items-start my-4 ",children:e?e.length!==0?s.jsx("div",{className:"table-responsive",children:s.jsxs("table",{className:"table align-middle",children:[s.jsx("thead",{children:s.jsxs("tr",{children:[i&&s.jsx("th",{children:"actions"}),s.jsx("th",{children:"orderId"}),s.jsx("th",{children:"cart Details"}),s.jsx("th",{children:"order satus"}),s.jsx("th",{children:"paid"}),s.jsx("th",{children:"total"}),s.jsx("th",{children:"payment status"}),s.jsx("th",{children:"Time"}),s.jsx("th",{children:"Date"})]})}),s.jsx("tbody",{children:e==null?void 0:e.map(t=>s.jsxs("tr",{children:[i&&((t==null?void 0:t.status)!=="Delivered"?s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:s.jsxs("div",{className:"w-100 d-flex justify-content-start align-items-center",children:[(t==null?void 0:t.status)==="in store"&&s.jsx("i",{className:"bi bi-truck me-2 pointer",onClick:()=>{r(t==null?void 0:t._id)}}),(t==null?void 0:t.status)==="in shipping"&&s.jsx("i",{className:"bi bi-check2-circle pointer",onClick:()=>{r(t==null?void 0:t._id)}})]})}):s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:"Successfully"})),s.jsx("td",{onClick:()=>{!i&&!(t!=null&&t.paid)&&x(t==null?void 0:t._id)},className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"} pointer`,children:t==null?void 0:t._id}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:s.jsx(m,{to:`/${i?"admin/ordersCartAdmin":"ordersCart"}/${t==null?void 0:t._id}`,children:"cart details"})}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:t==null?void 0:t.status}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:String(t==null?void 0:t.paid)}),s.jsxs("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:[String(t==null?void 0:t.totalPrice)," $"]}),s.jsxs("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:[t==null?void 0:t.paymentStatus," ",t!=null&&t.paid?s.jsx("i",{className:"bi bi-check-all"}):s.jsx("i",{className:"bi bi-x"})]}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:new Date(t==null?void 0:t.createdAt).toLocaleTimeString()}),s.jsx("td",{className:`text-capitalize ${t!=null&&t.paid?"text-success":"text-danger"}`,children:new Date(t==null?void 0:t.createdAt).toLocaleDateString()})]},t==null?void 0:t._id))})]})}):s.jsx("h1",{className:"text-center w-100 text-primary text-capitalize",children:"no orders for now"}):s.jsx(j,{classNamePropert:""})})}export{y as O,S as a};
