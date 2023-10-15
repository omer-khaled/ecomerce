export type authType = {
    auth:boolean|null,
    token:string|null,
    user:null|string
}

export type categoryType = {
    name:string,
    _id:string,
    image:string
}

export type feedBackType={
    _id:string,
    user:userType,
    feedback:string,
    rate:number
}

export type productType={
    _id:string,
    title:string,
    description:string,
    price:number,
    imageUrl:string,
    sizes:string[],
    inStock:number,
    category:categoryType,
    company:categoryType,
    colors:string[],
    feedbacks:feedBackType[],
}

export type customproductType=productType&{
    category:string,
    company:string,
}

export type filtersType ={
    categories: string[] | null;
    companies: string[] | null;
    min: number | null;
    max: number | null;
};

export type errorType={
        status:boolean,
        errors:{
            location:string,
            msg:string,
            path:string,
            type:string,
            value:string
        }[],
        message:string
}

export type cartProductType={product:productType,qty:number}[];
export type cartType = {
    cart:cartProductType|null,
    totalPrice:number,
    error:boolean
}

export type ordersType = {
    _id:string,
    userId:string,
    cart:{product:productType,qty:number},
    status:string,
    paid:boolean,
    totalPrice:number,
    paymentStatus:string,
    createdAt:string
}

export type ApiProductsType= {products:[]|undefined,status:boolean,message:string,errors:string|[]|undefined,numberOfPage:number|undefined};
export type ApiCartType= {cart:cartProductType|null|undefined,status:boolean,message:string,errors:string|[]|undefined,totalPrice:number};

export type blogType = {
    _id:string,
    image:string,
    title:string,
    sumary:string,
    content:string,
    comments:CommentType[]
}

    export type CommentType = {
        _id:string,
        user:userType,
        comment:string
    }

  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "white"
  ];
  
  export const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: myColors }],
      [{ background: myColors }]
    ]
  };

  export const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align"
  ];

export type userType={
    _id:string,
    name:string,
    image:string,
    email:string
}