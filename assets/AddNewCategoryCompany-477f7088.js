import{r as d,u as C,d as S,j as e,a as w}from"./index-19290a20.js";import{c as v,a as F,u as I}from"./formik.esm-18368b5d.js";import{m as y}from"./modal-2d4d4cf4.js";import{S as k}from"./sweetalert2.all-9dcc25ec.js";function D({name:i}){const[p,u]=d.useState(),[l,g]=d.useState(),[m,c]=d.useState(null),h=C(),j=S(a=>a.auth.auth),N=v({name:F().required("required Feild").matches(/\w{3,}/,"should has at least 3 character")}),s=I({initialValues:{name:null},validationSchema:N,onSubmit:async a=>{var r,n,o,f;if(j)try{const t=new FormData;if(!l)return c("required feild");a.name&&l&&(t.append("name",a==null?void 0:a.name),t.append("image",l));let x="category/addCategory";i!=="category"&&(x="company/addCompany");const b=await w.post(`http://localhost:3002/${x}`,t,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}});y(b.data.status,"Adding"+i,b.data.message).then(()=>{h(i==="category"?"/ecomerce/admin/categories":"/ecomerce/admin/companies")})}catch(t){t&&y((n=(r=t==null?void 0:t.response)==null?void 0:r.data)==null?void 0:n.status,"Adding Category",(f=(o=t==null?void 0:t.response)==null?void 0:o.data)==null?void 0:f.message)}else k.fire({title:"shuold be login first",icon:"error"})}});return e.jsx("div",{className:"p-4 rounded-2 position-absolute top-0 start-0 bottom-0 end-0 bg-primary d-flex justify-content-center align-items-center flex-column",children:e.jsxs("form",{onSubmit:a=>{a.preventDefault(),s.handleSubmit()},className:"bg-light p-4 w-50",children:[e.jsxs("h1",{className:"text-primary text-start text-capitalize bg-light mb-3",children:["Add ",i]}),e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("label",{htmlFor:"exampleInputNameCategor1",className:"input-group-text",children:"Name"}),e.jsx("input",{type:"text",className:"form-control",name:"name",onChange:s.handleChange,onBlur:s.handleBlur,id:"exampleInputNameCategor1"}),e.jsx("div",{className:"invalid-feedback",children:s.touched.name&&s.errors.name&&s.errors.name})]}),e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("label",{htmlFor:"exampleInputimageCategor1",className:"input-group-text",children:"image"}),e.jsx("input",{type:"file",className:"form-control",id:"exampleInputimageCategor1",onChange:a=>{if(a.target.files){const r=a.target.files[0],n=["image/jpeg","image/png","image/jpg"];if(r)if(n.includes(r.type)){const o=URL.createObjectURL(r);g(a.target.files[0]),u(o),c(null)}else u(null),g(null),c("invalid file only png jpg jpeg")}}}),e.jsx("div",{className:"invalid-feedback",children:m&&m})]}),p&&!m&&e.jsx("img",{src:p,style:{width:"150px",height:"150px",display:"block",marginBottom:"10px"},alt:"presonal Image"}),e.jsx("button",{type:"submit",className:"btn btn-primary w-100",children:"Submit"})]})})}export{D as default};
