import{c as F,r as c,u as I,d as $,a as S,j as e}from"./index-10652f01.js";import{c as R,a as C,u as E}from"./formik.esm-2dba3fb2.js";import{m as x}from"./modal-232ec21a.js";import{R as T,m as q,f as D}from"./quill.snow-4b26aa7c.js";import{S as L}from"./sweetalert2.all-c14fc2e8.js";import U from"./Loading-f99c1e89.js";function V(){const{id:p}=F(),[n,v]=c.useState(null),[b,g]=c.useState(),[y,j]=c.useState(),[h,N]=c.useState(null),k=I(),f=$(t=>t.auth.auth),[d,w]=c.useState(""),B=R({title:C().required("required Feild").matches(/\w{3,}/,"should has at least 3 character"),sumary:C().required("required Feild").matches(/\w{3,}/,"should has at least 3 character")}),s=E({initialValues:n?{title:n.title,sumary:n.sumary}:{title:"",sumary:""},enableReinitialize:!0,validationSchema:B,onSubmit:async t=>{var i,o,m,u;if(f)try{const a=new FormData;y&&a.append("image",y),t.title&&t.sumary&&d&&(a.append("title",t==null?void 0:t.title),a.append("sumary",t==null?void 0:t.sumary),a.append("content",d));const r="blog/editBlog",l=await S.put(`https://ecomerce-kmcp.onrender.com//${r}/${p}`,a,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}});x(l.data.status,"Adding Blog",l.data.message).then(()=>{k("/ecomerce/admin/blogs")})}catch(a){a&&x((o=(i=a==null?void 0:a.response)==null?void 0:i.data)==null?void 0:o.status,"Adding Blog",(u=(m=a==null?void 0:a.response)==null?void 0:m.data)==null?void 0:u.message)}else L.fire({title:"shuold be login first",icon:"error"})}});return c.useEffect(()=>{let t=!0;return(async()=>{var i,o,m,u,a;if(f)try{const r="blog/getSingleBlog/",{data:l}=await S.get(`https://ecomerce-kmcp.onrender.com//${r}${p}`,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}});l.status&&t&&l.blog&&(w(l.blog.content),v(l.blog),g("https://ecomerce-kmcp.onrender.com//images/"+((i=l.blog)==null?void 0:i.image)))}catch(r){r&&x((m=(o=r==null?void 0:r.response)==null?void 0:o.data)==null?void 0:m.status,"retive data",(a=(u=r==null?void 0:r.response)==null?void 0:u.data)==null?void 0:a.message)}})(),()=>{t=!1}},[p,f]),e.jsx("div",{className:`${n?"":"h-100vh"} flex-grow-1 p-2 rounded-2 bg-primary d-flex justify-content-start align-items-center flex-column`,children:n?e.jsxs("form",{onSubmit:t=>{t.preventDefault(),s.handleSubmit()},className:"bg-light p-4 rounded w-100 h-100 d-flex justify-content-start align-items-center flex-column",children:[e.jsx("h1",{className:"text-primary text-start text-capitalize bg-light mb-3",children:"update Blog"}),e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("label",{htmlFor:"exampleInputTitle",className:"input-group-text",children:"Title"}),e.jsx("input",{type:"text",className:"form-control",value:s.values.title||"",name:"title",onChange:s.handleChange,onBlur:s.handleBlur,id:"exampleInputTitle"}),e.jsx("div",{className:"invalid-feedback",children:s.touched.title&&s.errors.title&&s.errors.title})]}),e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("label",{htmlFor:"exampleInputsumary",className:"input-group-text",children:"Sumary"}),e.jsx("input",{type:"text",className:"form-control",value:s.values.sumary||"",name:"sumary",onChange:s.handleChange,onBlur:s.handleBlur,id:"exampleInputsumary"}),e.jsx("div",{className:"invalid-feedback",children:s.touched.sumary&&s.errors.sumary&&s.errors.sumary})]}),e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("label",{htmlFor:"exampleInputimageCategor1",className:"input-group-text",children:"image"}),e.jsx("input",{type:"file",className:"form-control",id:"exampleInputimageCategor1",onChange:t=>{if(t.target.files){const i=t.target.files[0],o=["image/jpeg","image/png","image/jpg"];if(i)if(o.includes(i.type)){const m=URL.createObjectURL(i);j(t.target.files[0]),g(m),N(null)}else g(null),j(null),N("invalid file only png jpg jpeg")}}}),e.jsx("div",{className:"invalid-feedback",children:h&&h})]}),b&&!h&&e.jsx("img",{src:b,style:{width:"150px",height:"150px",display:"block",marginBottom:"10px"},alt:"presonal Image"}),e.jsx("div",{className:"w-100 flex-grow-1 mb-3",children:e.jsx(T,{className:"box",modules:q,formats:D,theme:"snow",value:d||(n?n.content:""),onChange:w})}),e.jsx("button",{type:"submit",className:"btn btn-primary w-100",children:"Submit"})]}):e.jsx(U,{classNamePropert:"loader"})})}export{V as default};
