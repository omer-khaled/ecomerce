import{u as h,j as s,a as x}from"./index-99225c5a.js";import{c as b,a as g,u as j}from"./formik.esm-61ab1a81.js";import{m as d}from"./modal-ce0b874b.js";import"./sweetalert2.all-7a2e22d8.js";function f(){var i,l,n;const u=h(),p=b({email:g().email("invalid email").required("email should be required").matches(/^[\w\W]+@gmail\.com$/,"invalid email")}),a=j({initialValues:{email:null},validationSchema:p,onSubmit:async t=>{var r,m,o,c;try{const e=await x.post("https://ecomerce-kmcp.onrender.com/auth/resetPassword",t,{withCredentials:!0});d(e.data.status,"ResetPassword",e.data.message).then(()=>{e.data.status&&u("/ecomerce/login",{replace:!0})})}catch(e){e&&d((m=(r=e==null?void 0:e.response)==null?void 0:r.data)==null?void 0:m.status,"ResetPassword",(c=(o=e==null?void 0:e.response)==null?void 0:o.data)==null?void 0:c.message)}}});return s.jsx("section",{className:"row w-100 m-0 flex-grow-1 my-4 justify-content-center align-items-start p-3",children:s.jsxs("form",{className:"d-flex flex-column",onSubmit:t=>{t.preventDefault(),a.handleSubmit()},children:[s.jsxs("div",{className:"input-group mb-3",children:[s.jsx("span",{className:"input-group-text",id:"basic-addon1",children:"Email"}),s.jsx("input",{type:"email",className:"form-control",name:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp",onChange:a==null?void 0:a.handleChange,onBlur:a==null?void 0:a.handleBlur}),s.jsx("div",{className:"invalid-feedback",children:((i=a==null?void 0:a.touched)==null?void 0:i.email)&&((l=a==null?void 0:a.errors)==null?void 0:l.email)&&((n=a==null?void 0:a.errors)==null?void 0:n.email)})]}),s.jsx("button",{type:"submit",className:"btn btn-primary mx-auto",children:"Submit"})]})})}export{f as default};
