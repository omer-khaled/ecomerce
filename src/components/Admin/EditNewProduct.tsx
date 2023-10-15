import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import {ReactElement,ChangeEvent,useState,useEffect} from 'react'
import makeModal from '../../utils/modal';
import { categoryType, customproductType, errorType } from '../../types/types';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';
import Swal from 'sweetalert2';
import Loading from '../Loading';
function EditNewProduct():ReactElement{
    const {id} = useParams();
    const [data,setData] = useState<customproductType|null>(null);
    const [categories,setCategories] = useState<null|categoryType[]>(null);
    const [companies,setCompanies] = useState<null|categoryType[]>(null);
    const [file,setFile] = useState<null|string>();
    const [image,setImage] = useState<null|File>();
    const [imageError,setImageError] = useState<null|string>(null);
    const Navigate = useNavigate();
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    const handleColorChange = (color:string) => {
        if(formik.values.colors.length!==5){
            const founded = formik.values.colors.find((el:string)=>el===color);
            if(!founded){
                formik.setFieldValue('colors',[...(formik.values.colors),color]);
            }
        }else{
            formik.setFieldError('colors','maximum number of colors');
        }
    };
    const validationSchema = Yup.object({
        title:Yup.string().required('required Feild').matches(/\w{4,}/,'should has at least 3 character'),
        description:Yup.string().required('required Feild').matches(/\w{4,}/,'should has at least 3 character'),
        price:Yup.number().required('required Feild').min(0.0,'should be positive number'),
        inStock:Yup.number().required('required Feild').min(0.0,'should be positive number'),
        company:Yup.string().required('required Feild').min(24,'should be positive number').max(24,'should be positive number'),
        category:Yup.string().required('required Feild').min(24,'should be positive number').max(24,'should be positive number'),
        sizes:Yup.array().required('required Feild'),
        colors:Yup.array().required('required Feild'),
    });
    const formik = useFormik({
        initialValues:(data)?data:{
            title:'',
            description:'',
            price:0,
            inStock:0,
            company:'',
            category:'',
            sizes:[],
            colors:[]
        },
        enableReinitialize:true,
        validationSchema:validationSchema,
        onSubmit:(async(values)=>{
            if(auth){
                try{
                    const formData = new FormData();
                    formData.append("title",(values.title as string));
                    formData.append("description",(values.description as string));
                    formData.append("price",(`${values.price}`));
                    formData.append("inStock",(`${values.inStock}`));
                    formData.append("company",(values.company as string));
                    formData.append("category",(values.category as string));
                    formData.append("sizes",JSON.stringify(values.sizes));
                    formData.append("colors",JSON.stringify(values.colors));
                    formData.append("image",(image as File));
                    const url = `/products/updateProduct/${id}`;
                    const data = await axios.put(import.meta.env.VITE_API_BASE_URL+`${url}`,formData,{
                        withCredentials:true,
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    });
                    makeModal(data.data.status,'Adding Products',data.data.message).then(()=>{
                            Navigate('/admin/products');
                    });
                }catch(e){
                    if(e){
                        makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"update Product",(((e as AxiosError)?.response?.data) as errorType)?.message)
                    }
               }
            }else{
                Swal.fire({
                    title:'shuold be login first',
                    icon:'error'
                })
            }
        })
    });
    useEffect(()=>{
        let check = true;
        (async function fetchCategory() {        
            const ApiData = await(await fetch(import.meta.env.VITE_API_BASE_URL+'/category/getCategories',{method:'GET',headers:{'Content-Type':'application/json'}})).json();
            const ApiDatacompanies = await(await fetch(import.meta.env.VITE_API_BASE_URL+'/company/getCompany',{method:'GET',headers:{'Content-Type':'application/json'}})).json();
            const {data}:{data:{message:string,errors:[]|string|undefined,product:customproductType|undefined,status:boolean}} =await axios.get(import.meta.env.VITE_API_BASE_URL+`/products/getSingleProduct/${id}`,{
                withCredentials:true
            })
            if(check){
                if(data.product){
                    setCategories(ApiData.categories);
                    setCompanies(ApiDatacompanies.companies);
                    setData(data.product);
                    setFile(import.meta.env.VITE_API_BASE_URL+'/images/'+data.product.imageUrl);
                }
            }
        })()
        return ()=>{
            // race condition
            check=false;
        }
      },[setCategories,setCompanies,id]);
  return (
    <div className='p-4 rounded-2 position-absolute top-0 start-0 bottom-0 end-0 bg-primary d-flex justify-content-center align-items-center flex-column'>
        {(data)?<form onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit();
        }} className='bg-light p-4 w-100'>
            <h1 className='text-primary text-start text-capitalize bg-light mb-3'>Edit Prodcut</h1>
            <div className='row justify-content-between mb-3'>
                <div className='col'>
                    <div className="input-group">
                        <label htmlFor="exampleInputtitle" className="input-group-text">Title</label>
                        <input type="text" value={formik.values.title||''} className="form-control" name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputtitle" />
                        <div className="invalid-feedback">
                            {(formik.touched.title&&formik.errors.title)&&formik.errors.title}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col-5 input-group">
                        <label htmlFor="exampleInputdescription" className="input-group-text">Description</label>
                        <input type="text" className="form-control" value={formik.values.description||''} name='description' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputdescription" />
                        <div className="invalid-feedback">
                            {(formik.touched.description&&formik.errors.description)&&formik.errors.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-between mb-3'>
                <div className="col">
                    <div className="input-group">
                        <label htmlFor="exampleInputprice" className="input-group-text">Price</label>
                        <input type="text" className="form-control" value={formik.values.price||''} name='price' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputprice" />
                        <div className="invalid-feedback">
                            {(formik.touched.price&&formik.errors.price)&&formik.errors.price}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group">
                        <label htmlFor="exampleInputinStock" className="input-group-text">InStock</label>
                        <input type="text" className="form-control" name='inStock' value={formik.values.inStock||''} onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputinStock" />
                        <div className="invalid-feedback">
                            {(formik.touched.inStock&&formik.errors.inStock)&&formik.errors.inStock}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row justify-content-between mb-3'>
                <div className="col">
                    <div className="input-group">
                        <label htmlFor="exampleInputcompany" className="input-group-text">Company</label>
                        <select className="form-select" value={formik.values.category||''}  name='category' onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option>{'choose category'}</option> 
                        {
                            (categories)&&categories.map((el:categoryType)=>{
                                return(<option key={el?._id} value={el?._id}>{el?.name}</option>)
                            })
                        }</select>
                        <div className="invalid-feedback">
                            {(formik.touched.category&&formik.errors.category)&&(formik.errors.category as string)}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group">
                        <label htmlFor="exampleInputcompany" className="input-group-text">Company</label>
                        <select className="form-select"  name='company' value={formik.values.company||''} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                        <option>{'choose company'}</option>     
                        {
                            (companies)&&companies.map((el:categoryType)=>{
                                return(<option key={el?._id} value={el?._id}>{el?.name}</option>)
                            })
                        }</select>
                        <div className="invalid-feedback">
                            {(formik.touched.company&&formik.errors.company)&&(formik.errors.company as string)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-group mb-3" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" name='sizes' checked={Boolean(formik.values.sizes.find((el:string)=>el==='s'))} className="btn-check" id="btncheck1" value={'s'} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label className="btn btn-outline-primary text-black" htmlFor="btncheck1">small</label>

                <input type="checkbox" name='sizes' checked={Boolean(formik.values.sizes.find((el:string)=>el==='m'))} className="btn-check" id="btncheck2" value={'m'} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label className="btn btn-outline-primary text-black" htmlFor="btncheck2">mediumn</label>

                <input type="checkbox" name='sizes' checked={Boolean(formik.values.sizes.find((el:string)=>el==='l'))} className="btn-check" id="btncheck3" value={'l'} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label className="btn btn-outline-primary text-black" htmlFor="btncheck3">large</label>

                <input type="checkbox" name='sizes' className="btn-check" checked={Boolean(formik.values.sizes.find((el:string)=>el==='xl'))} id="btncheck4" value={'xl'} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                <label className="btn btn-outline-primary text-black" htmlFor="btncheck4">Xlarge</label>
            </div>
            <div className="invalid-feedback">
                {(formik.touched.sizes&&formik.errors.sizes)&&formik.errors.sizes}
            </div>
            <div className='mb-3'>
                    <div>
                        <label htmlFor="colroExmaple" className="pe-2 text-capitalize"><strong>choose color :</strong></label>
                        <input type="color" className="" name='colors' onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            handleColorChange(e.target.value);
                        }} onBlur={formik.handleBlur} id="colroExmaple" />
                        <div className="invalid-feedback">
                            {(formik.errors.colors)&&formik.errors.colors}
                        </div>
                    </div>
                    <div>
                        <strong>Selected Colors :<span className='text-success'> can clicked on color to delete it</span></strong>
                        <div className='w-100 overflow-auto d-flex flex-nowrap flex-row justify-content-start align-items-center'>
                            {(formik.values.colors.length>0)?formik.values.colors.map((color, index) => (
                                <span onClick={()=>{
                                    formik.setFieldValue('colors',(formik.values.colors).filter((e:string)=>{
                                        return e!==color;
                                    }))
                                }} key={index} style={{ backgroundColor: color, width:'20px',height:'20px',marginRight:'2px'}}>
                                </span>
                            )):<p className='text-danger m-0 p-0'>plz select colors</p>}
                        </div>
                    </div>
            </div>
            <div className="input-group mb-3">
                <label htmlFor="exampleInputimageCategor1" className="input-group-text">image</label>
                <input type="file" className="form-control" id="exampleInputimageCategor1" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                    if(e.target.files){
                        const file = e.target.files[0];
                        const allowedFormated =['image/jpeg','image/png','image/jpg'];
                        if(file){
                            if(allowedFormated.includes(file.type)){
                                const url = URL.createObjectURL(file);
                                setImage(e.target.files[0]);
                                setFile(url);
                                setImageError(null);
                            }else{
                                setFile(null);
                                setImage(null);
                                setImageError('invalid file only png jpg jpeg');
                            }
                        }
                    }
                }}/>
                <div className="invalid-feedback">
                     {(imageError)&&imageError}
                </div>
            </div>
            {(file&&!imageError)&&<img src={file} style={{width:'150px',height:'150px',display:"block",marginBottom:'10px'}} alt={'presonal Image'} />}
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>:<Loading classNamePropert=''/>} 
    </div>
  )
}
export default EditNewProduct;