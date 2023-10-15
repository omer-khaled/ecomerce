import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import {ReactElement,ChangeEvent,useState,useEffect} from 'react'
import makeModal from '../../utils/modal';
import { blogType, errorType, formats, modules } from '../../types/types';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from '../Loading';
function UpdateBlog():ReactElement{
    const {id} = useParams();
    const [data,setData] = useState<null|blogType>(null);
    const [file,setFile] = useState<null|string>();
    const [image,setImage] = useState<null|File>();
    const [imageError,setImageError] = useState<null|string>(null);
    const Navigate = useNavigate();
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    const [content, setContent] = useState<string>('');
    const validationSchema = Yup.object({
        title:Yup.string().required('required Feild').matches(/\w{3,}/,'should has at least 3 character'),
        sumary:Yup.string().required('required Feild').matches(/\w{3,}/,'should has at least 3 character'),
    });
    const formik = useFormik({
        initialValues:(data)?{
            title:data.title,
            sumary:data.sumary
        }:{
            title:'',
            sumary:''
        },
        enableReinitialize:true,
        validationSchema:validationSchema,
        onSubmit:(async(values)=>{
            if(auth){
                try{
                const formData = new FormData();
                if(image){
                    formData.append("image",(image as File));
                }
                if(values.title&&values.sumary&&content){
                    formData.append("title",(values?.title as string));
                    formData.append("sumary",(values?.sumary as string));
                    formData.append("content",(content as string));
                }
                const url = 'blog/editBlog';
                const data = await axios.put(import.meta.env.VITE_API_BASE_URL+`/${url}/${id}`,formData,{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                makeModal(data.data.status,'Adding Blog',data.data.message).then(()=>{
                    Navigate('/admin/blogs');
                });
                }catch(e){
                    if(e){
                        makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"Adding Blog",(((e as AxiosError)?.response?.data) as errorType)?.message)
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
        (async()=>{
            if(auth){
                try{
                    const url = 'blog/getSingleBlog/';
                    const {data}:{data:{message:string,status:boolean,blog:blogType|null}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/${url}${id}`,{
                        withCredentials:true,
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    });
                    if(data.status){
                        if(check&&data.blog){
                            setContent(data.blog.content);
                            setData(data.blog);
                            setFile(import.meta.env.VITE_API_BASE_URL+'/images/'+data.blog?.image);
                        }
                    }
                }catch(e){
                    if(e){
                        makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"retive data",(((e as AxiosError)?.response?.data) as errorType)?.message)
                    }
                }
            }
        })()
        // const `getSingleCategory/${id}`
        return()=>{
            check = false;
        }
    },[id,auth]);
  return (
    <div className={`${data?"":"h-100vh"} flex-grow-1 p-2 rounded-2 bg-primary d-flex justify-content-start align-items-center flex-column`}>
        {(data)?<form onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit();
        }} className='bg-light p-4 rounded w-100 h-100 d-flex justify-content-start align-items-center flex-column'>
            <h1 className='text-primary text-start text-capitalize bg-light mb-3'>update Blog</h1>
            <div className="input-group mb-3">
                <label htmlFor="exampleInputTitle" className="input-group-text">Title</label>
                <input type="text" className="form-control" value={formik.values.title||''}  name='title' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputTitle" />
                <div className="invalid-feedback">
                     {(formik.touched.title&&formik.errors.title)&&formik.errors.title}
                </div>
            </div>
            <div className="input-group mb-3">
                <label htmlFor="exampleInputsumary" className="input-group-text">Sumary</label>
                <input type="text" className="form-control" value={formik.values.sumary||''} name='sumary' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputsumary" />
                <div className="invalid-feedback">
                     {(formik.touched.sumary&&formik.errors.sumary)&&formik.errors.sumary}
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
            <div className='w-100 flex-grow-1 mb-3'>
                <ReactQuill className='box' modules={modules} formats={formats} theme="snow" value={content?content:(data?data.content:'')} onChange={setContent} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>:<Loading classNamePropert='loader'/>}
    </div>
  )
}
export default UpdateBlog;