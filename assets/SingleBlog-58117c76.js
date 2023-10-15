import{d as v,c as C,r as m,a as j,j as e,g as S}from"./index-10652f01.js";import{m as i}from"./modal-232ec21a.js";import"./sweetalert2.all-c14fc2e8.js";function E(){const u=v(t=>t.auth.user),{id:d}=C(),[c,p]=m.useState(null),[x,g]=m.useState(null),[b,y]=m.useState(""),[h,f]=m.useState(null),N=async()=>{var t,n,r,o;try{const a=await j.put(`https://ecomerce-kmcp.onrender.com//blog/addComment/${d}`,JSON.stringify({comment:b}),{withCredentials:!0});a.status&&(p(a.data.blog),g(a.data.blog.comments),i(a.data.status,"comment added",a.data.message),f(null),y(""))}catch(a){a&&i((n=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:n.status,"comment added",(o=(r=a==null?void 0:a.response)==null?void 0:r.data)==null?void 0:o.message)}},w=async t=>{var n,r,o,a;try{const s=await j.delete(`https://ecomerce-kmcp.onrender.com//blog/deleteComment/${d}?blogId=${t}`,{withCredentials:!0});s.status&&(p(s.data.blog),g(s.data.blog.comments),i(s.data.status,"comment deleted",s.data.message))}catch(s){s&&i((r=(n=s==null?void 0:s.response)==null?void 0:n.data)==null?void 0:r.status,"comment deleted",(a=(o=s==null?void 0:s.response)==null?void 0:o.data)==null?void 0:a.message)}};return m.useEffect(()=>{let t=!0;return(async()=>{var n,r,o,a;try{const s="blog/getSingleBlog/",{data:l}=await j.get(`https://ecomerce-kmcp.onrender.com//${s}${d}`,{withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}});l.status&&t&&l.blog&&(p(l.blog),g(l.blog.comments))}catch(s){s&&i((r=(n=s==null?void 0:s.response)==null?void 0:n.data)==null?void 0:r.status,"retive data",(a=(o=s==null?void 0:s.response)==null?void 0:o.data)==null?void 0:a.message)}})(),()=>{t=!1}},[d]),e.jsx("main",{className:"m-0 p-0 w-100 row mt-3",children:c?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"col-12 col-lg-8 d-flex mx-atuo justify-content-start align-items-start flex-column",children:[e.jsx("img",{className:"img-fluid rounded",style:{objectFit:"cover",objectPosition:"top center"},src:"https://ecomerce-kmcp.onrender.com//images/"+(c==null?void 0:c.image),alt:c==null?void 0:c.title}),e.jsx("h1",{className:"w-100 text-capitalize my-3 text-center",children:c.title}),e.jsx("h1",{className:"w-100 text-capitalize",children:c.sumary}),e.jsx("div",{dangerouslySetInnerHTML:{__html:c.content}})]}),e.jsx("div",{className:"col-12 col-lg-4 mx-atuo",children:e.jsxs("div",{className:"bg-dark rounded p-1",children:[e.jsx("p",{className:"text-primary text-capitalize text-start fs-3",children:"comments"}),x&&(x.length!==0?x.map(t=>{var n,r,o,a;return e.jsxs("div",{className:"w-100 d-flex justify-content-center align-items-start flex-column position-relative",children:[e.jsxs("div",{className:"w-100 d-flex justify-content-start",children:[e.jsxs("div",{className:"bg-white rounded-2 shadow-sm d-flex justify-content-start align-items-start flex-column bg-primary p-2",children:[e.jsx("img",{className:"img-fluid rounded-circle",style:{width:"80px",height:"80px",objectFit:"cover",objectPosition:"top center"},src:"https://ecomerce-kmcp.onrender.com//images/"+((n=t==null?void 0:t.user)==null?void 0:n.image),alt:(r=t==null?void 0:t.user)==null?void 0:r.name}),e.jsx("p",{className:"text-start text-capitalize text-center p-0 m-0",children:(o=t==null?void 0:t.user)==null?void 0:o.name})]}),e.jsx("p",{className:"flex-grow-1 text-start text-capitalize p-2 m-0",children:t==null?void 0:t.comment})]}),((a=t==null?void 0:t.user)==null?void 0:a._id.toString())===(u==null?void 0:u.toString())&&e.jsx("i",{className:"position-absolute bi bi-trash-fill text-danger top-0 end-0 pt-1 pointer",onClick:()=>{w(t==null?void 0:t._id)}}),e.jsx("hr",{className:"my-1 mx-0 w-100 bg-primary"})]},t==null?void 0:t._id)}):e.jsx("p",{className:"fs-5 text-capitalize text-center text-primary",children:"comments is empty"})),e.jsxs("form",{onSubmit:t=>{t.preventDefault(),h||N()},className:"mt-2 w-100 d-flex justify-content-between align-items-center",children:[e.jsx("input",{value:b,type:"text",onChange:t=>{y(t.target.value),/^[\w|\s]{3,}$/.test(t.target.value)?f(null):f("should be required at least 3char")},className:"border-1 flex-grow-1 me-1 p-1 rounded form-control",name:"",id:""}),e.jsx("button",{type:"submit",className:"btn btn-primary",children:"+add"})]}),h&&e.jsx("p",{className:"invalid-feedback",children:h})]})})]}):e.jsx(S,{classNamePropert:"loader"})})}export{E as default};
