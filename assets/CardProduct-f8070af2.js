import{j as s,f as x,L as h}from"./index-10652f01.js";import{Q as b}from"./react-toastify.esm-7b674e2a.js";import{u as c}from"./useDispatch-fc7e8a64.js";function N({product:e,auth:m,order:a,qty:t}){var i,n,l;const r=c();return s.jsx("div",{className:"col box mb-2",children:s.jsxs("div",{className:"card position-relative",children:[s.jsx("img",{className:"img-fluid",style:{maxHeight:"250px",objectFit:"contain",objectPosition:"top"},src:"https://ecomerce-kmcp.onrender.com//images/"+(e==null?void 0:e.imageUrl),alt:e==null?void 0:e.title}),s.jsxs("div",{className:"card-body",children:[s.jsx("h5",{className:"card-title w-100 text-primary text-truncate",children:e==null?void 0:e.title}),s.jsx("p",{className:"card-text w-100",children:((i=e==null?void 0:e.description)==null?void 0:i.length)>100?e==null?void 0:e.description.slice(0,99):e==null?void 0:e.description}),a&&s.jsxs("p",{className:"card-text w-100",children:["number of pecies = ",s.jsx("span",{className:"text-primary",children:t})," peice"]}),m&&!a&&s.jsx("button",{onClick:()=>{r(x.addToCart(e==null?void 0:e._id)).then(()=>{b.success(`${e==null?void 0:e.title} added successfully`,{position:"bottom-left",autoClose:500,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})})},className:"btn btn-primary d-block w-100",children:"Add to Cart"})]}),s.jsxs("div",{className:"card-footer d-flex justify-content-between align-content-center",children:[s.jsxs("span",{className:"rounded border-1 bg-primary text-dark p-2 letterSpaceing",children:[" ",(n=e==null?void 0:e.category)==null?void 0:n.name]}),s.jsxs("span",{className:"rounded border-1 bg-primary text-dark p-2 letterSpaceing",children:[" ",(l=e==null?void 0:e.company)==null?void 0:l.name]})]}),s.jsxs("p",{className:"card-price fit-content m-0 p-0 position-absolute letterSpaceing rounded border-1 bg-primary p-1",children:[e==null?void 0:e.price,"$"]}),s.jsx(h,{className:"text-center p-2",to:`/ecomerce/showProduct/${e==null?void 0:e._id}`,children:"read more..."})]})},e._id)}export{N as C};
