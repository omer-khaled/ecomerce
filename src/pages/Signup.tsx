import {ReactElement,useState,ChangeEvent} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios,{AxiosError} from 'axios';
import makeModal from '../utils/modal';
import { errorType } from '../types/types';

function Signup():ReactElement {
    const [file,setFile] = useState<null|string>();
    const [image,setImage] = useState<null|File>();
    const [imageError,setImageError] = useState<null|string>(null);
    const validationSchema = Yup.object({
        name:Yup.string().required('name should be required').matches(/^[\w\s]{1,}$/,'name at least 3 character [alpha,nuerice,_'),
        email:Yup.string().email('invalid email').required('email should be required').matches(/^[\w\W]+@gmail\.com$/,'invalid email'),
        password:Yup.string().required('password should be required').matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\w\W]{8,}$/,'invalid password should at least 8 chareacter and one number , one charater one special'),
    });
    const formik = useFormik({
        initialValues:{
            name:null,
            email:null,
            password:null
        },
        validationSchema:validationSchema,
        onSubmit:async(values)=>{
           try{
            const formData = new FormData();
            if(!image){
                return setImageError('required feild');
            }
            if(values.name&&values.email&&values.password&&image){
                formData.append("name",(values?.name as string));
                formData.append("email",values?.email);
                formData.append("password",values?.password);
                formData.append("image",(image as File));
            }
            const data = await axios.post(import.meta.env.VITE_API_BASE_URL+'/auth/register',formData);
            makeModal(data.data.status,'Registration',data.data.message);
            }catch(e){
                if(e){
                    makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"Registration",(((e as AxiosError)?.response?.data) as errorType)?.message)
                }
           }
        }
    });
  return (
    <section className='row w-100 m-0 flex-grow-1 my-4 justify-content-center align-items-start p-3'>
        <form onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit();
        }}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Name</span>
                <input type="text" className="form-control" name='name' id="exampleInputname1" aria-describedby="emailHelp" onChange={formik?.handleChange} onBlur={formik?.handleBlur}/>
                <div className="invalid-feedback">
                    {(formik?.touched?.name&&formik?.errors?.name)&&formik?.errors?.name}
                </div>
            </div>
            <p className='p-0'></p>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email</span>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={formik?.handleChange} onBlur={formik?.handleBlur}/>
                <div className="invalid-feedback">
                    {(formik?.touched?.email&&formik?.errors?.email)&&formik?.errors?.email}
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Password</span>
                <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={formik?.handleChange} onBlur={formik?.handleBlur}/>
                <div className="invalid-feedback">
                    {(formik?.touched?.password&&formik?.errors?.password)&&formik?.errors?.password}
                </div>
            </div>
            <div className="input-group mb-3">
                {/* <span className="input-group-text" id="basic-addon1">Image</span> */}
                <input type="file" className="form-control" name='image' id="exampleInputFile1" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </section>
  )
}
export default Signup;