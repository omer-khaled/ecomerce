import{b as w,u as x,j as e,a as b}from"./index-1d0856ad.js";import{c as g,a as j,u as N}from"./formik.esm-279f610a.js";import{m as u}from"./modal-2776d013.js";import"./sweetalert2.all-4987a2e1.js";function C(){var r,n,o;const[p]=w(),m=x(),h=g({password:j().required("password should be required").matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\w\W]{8,}$/,"invalid password should at least 8 chareacter and one number , one charater one special")}),a=N({initialValues:{password:null},validationSchema:h,onSubmit:async t=>{var d,c,i,l;try{const s=await b.post(`https://ecomerce-kmcp.onrender.com/auth/changePassword?token=${p.get("token")}`,t,{withCredentials:!0});u(s.data.status,"ResetPassword",s.data.message).then(()=>{s.data.status&&m("/login",{replace:!0})})}catch(s){s&&u((c=(d=s==null?void 0:s.response)==null?void 0:d.data)==null?void 0:c.status,"ResetPassword",(l=(i=s==null?void 0:s.response)==null?void 0:i.data)==null?void 0:l.message)}}});return e.jsx("section",{className:"row w-100 m-0 flex-grow-1 my-4 justify-content-center align-items-start p-3",children:e.jsxs("form",{className:"d-flex flex-column",onSubmit:t=>{t.preventDefault(),a.handleSubmit()},children:[e.jsxs("div",{className:"input-group mb-3",children:[e.jsx("span",{className:"input-group-text",id:"basic-addon1",children:"password"}),e.jsx("input",{type:"password",className:"form-control",name:"password",id:"exampleInputEmail1","aria-describedby":"emailHelp",onChange:a==null?void 0:a.handleChange,onBlur:a==null?void 0:a.handleBlur}),e.jsx("div",{className:"invalid-feedback",children:((r=a==null?void 0:a.touched)==null?void 0:r.password)&&((n=a==null?void 0:a.errors)==null?void 0:n.password)&&((o=a==null?void 0:a.errors)==null?void 0:o.password)})]}),e.jsx("button",{type:"submit",className:"btn btn-primary mx-auto",children:"Chnage"})]})})}export{C as default};
