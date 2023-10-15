import{r as a,d as w,a as x,j as e,L as g}from"./index-19290a20.js";import{S as d}from"./sweetalert2.all-9dcc25ec.js";import B from"./Loading-86366f05.js";import{a as v}from"./adminGards-99dc29e6.js";import"./Login-908d2cd0.js";import"./formik.esm-18368b5d.js";import"./modal-2d4d4cf4.js";import"./useDispatch-50e21e5b.js";function C(){const[r,m]=a.useState(null),[n,u]=a.useState(1),[h,p]=a.useState(null),[j,b]=a.useState(!0),f=w(t=>t.auth.auth),[l,N]=a.useState(""),c=a.useCallback(async(t,i,o)=>{try{m(()=>null);const{data:s}=await x.get(`http://localhost:3002/blog/getBlogsPagination?page=${o}${t?`&title=${t}`:""}`);s.blogs&&Number.isInteger(s.numberOfPage)&&i&&(m(s.blogs),p(s.numberOfPage))}catch(s){d.fire({title:"error through retrived Data",text:s.message,icon:"error"})}},[]),y=a.useCallback(t=>{d.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then(async i=>{if(i.isConfirmed){const{data:o}=await x.delete(`http://localhost:3002/blog/deleteBlog/${t}`,{withCredentials:!0});o.status&&(b(s=>!s),d.fire("Deleted!","Your file has been deleted.","success"))}})},[]);return a.useEffect(()=>{let t=!0,i=null;return l?i=setTimeout(()=>{(async()=>await c(l,t,n))()},700):(async()=>await c(null,t,n))(),()=>{i&&clearTimeout(i),t=!1}},[l,j,n,f,c]),e.jsxs("section",{className:"row w-100 m-0 align-items-start my-4",children:[e.jsxs("div",{className:" d-flex justify-content-between align-items-center mb-3",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text",id:"inputGroup-sizing-sm",children:"Title"}),e.jsx("input",{type:"text",onChange:t=>{N(t.target.value)},className:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-sm"})]})}),e.jsxs(g,{to:"/ecomerce/admin/blogs/addblog",className:" btn btn-primary d-flex justify-content-center",children:[e.jsx("i",{className:"bi bi-plus-square-fill me-2"}),"Add"]})]}),r?r.length!==0?e.jsxs(e.Fragment,{children:[h&&e.jsx("nav",{className:"mt-3 d-flex justify-content-center","aria-label":"Page navigation example",children:e.jsxs("ul",{className:"pagination me-auto",children:[n>1&&e.jsx("li",{className:"page-item",children:e.jsxs("button",{className:"page-link",onClick:()=>{u(t=>t-1)},children:[" ",e.jsx("span",{"aria-hidden":"true",children:"«"})]})}),e.jsx("li",{className:"page-item",children:e.jsx("button",{className:"page-link",children:n})}),n<h&&e.jsx("li",{className:"page-item",children:e.jsx("button",{className:"page-link",onClick:()=>{u(t=>t+1)},children:e.jsx("span",{"aria-hidden":"true",children:"»"})})})]})}),e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-bordered align-middle",border:1,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"actions"}),e.jsx("th",{children:"BlogID"}),e.jsx("th",{children:"image"}),e.jsx("th",{children:"title"}),e.jsx("th",{children:"sumary"})]})}),e.jsx("tbody",{children:r==null?void 0:r.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs("div",{className:"d-flex justify-content-center align-items-center",children:[e.jsx(g,{to:`/ecomerce/admin/blogs/UpdateBlog/${t==null?void 0:t._id}`,className:"p-0",children:e.jsx("span",{className:"bi bi-pencil-square text-success me-2"})}),e.jsx("button",{className:"p-0",onClick:()=>{y(t==null?void 0:t._id)},children:e.jsx("span",{className:"bi bi-trash-fill text-danger"})})]})}),e.jsx("td",{className:"text-truncate",children:t==null?void 0:t._id}),e.jsx("td",{children:e.jsx("img",{className:"img-fluid",src:"http://localhost:3002/images/"+(t==null?void 0:t.image),alt:t==null?void 0:t.title})}),e.jsx("td",{className:"text-truncate",children:t==null?void 0:t.title}),e.jsx("td",{className:"text-truncate",children:t==null?void 0:t.sumary})]},t==null?void 0:t._id))})]})})]}):e.jsx("h1",{className:"text-center w-100 text-primary text-capitalize",children:"no blogs for now"}):e.jsx(B,{classNamePropert:""})]})}const O=v(C);export{C as Blog,O as default};
