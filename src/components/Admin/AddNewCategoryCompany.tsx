import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import {ReactElement,ChangeEvent,useState} from 'react'
import makeModal from '../../utils/modal';
import { errorType } from '../../types/types';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';
import Swal from 'sweetalert2';
function AddNewCategoryCompany({name}:{name:string}):ReactElement{
    const [file,setFile] = useState<null|string>();
    const [image,setImage] = useState<null|File>();
    const [imageError,setImageError] = useState<null|string>(null);
    const Navigate = useNavigate();
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    const validationSchema = Yup.object({
        name:Yup.string().required('required Feild').matches(/\w{3,}/,'should has at least 3 character'),
    });
    const formik = useFormik({
        initialValues:{
            name:null,
        },
        validationSchema:validationSchema,
        onSubmit:(async(values)=>{
            if(auth){
                try{
                const formData = new FormData();
                if(!image){
                    return setImageError('required feild');
                }
                if(values.name&&image){
                    formData.append("name",(values?.name as string));
                    formData.append("image",(image as File));
                }
                let url = 'category/addCategory';
                if(name!=='category'){
                    url = 'company/addCompany';
                }
                const data = await axios.post(import.meta.env.VITE_API_BASE_URL+`/${url}`,formData,{
                    withCredentials:true,
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                makeModal(data.data.status,'Adding'+name,data.data.message).then(()=>{
                    if(name==='category'){
                        Navigate('/admin/categories');
                    }else{
                        Navigate('/admin/companies');
                    }
                });
                }catch(e){
                    if(e){
                        makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"Adding Category",(((e as AxiosError)?.response?.data) as errorType)?.message)
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
  return (
    <div className='p-4 rounded-2 position-absolute top-0 start-0 bottom-0 end-0 bg-primary d-flex justify-content-center align-items-center flex-column'>
        <form onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit();
        }} className='bg-light p-4 w-50'>
            <h1 className='text-primary text-start text-capitalize bg-light mb-3'>Add {name}</h1>
            <div className="input-group mb-3">
                <label htmlFor="exampleInputNameCategor1" className="input-group-text">Name</label>
                <input type="text" className="form-control" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} id="exampleInputNameCategor1" />
                <div className="invalid-feedback">
                     {(formik.touched.name&&formik.errors.name)&&formik.errors.name}
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
        </form>  
    </div>
  )
}
export default AddNewCategoryCompany;