import {ReactElement} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios,{AxiosError} from 'axios';
import makeModal from '../utils/modal';
import {  errorType } from '../types/types';
import { useNavigate } from 'react-router-dom';
function ResetPassword():ReactElement {
    const Navigate = useNavigate();
    const validationSchema = Yup.object({
        email:Yup.string().email('invalid email').required('email should be required').matches(/^[\w\W]+@gmail\.com$/,'invalid email'),
    });
    const formik = useFormik({
        initialValues:{
            email:null,
        },
        validationSchema:validationSchema,
        onSubmit:async(values)=>{
           try{
            const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/resetPassword`,values,{
               withCredentials:true
            });
            makeModal(data.data.status,"ResetPassword",data.data.message).then(()=>{
                if(data.data.status){
                    Navigate('/login',{
                        replace:true,
                    });
                }
            });
        }catch(e){
                if(e){
                    makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"ResetPassword",(((e as AxiosError)?.response?.data) as errorType)?.message)
                }
           }
        }
    });
  return (
    <section className='row w-100 m-0 flex-grow-1 my-4 justify-content-center align-items-start p-3'>
        <form className='d-flex flex-column' onSubmit={(e)=>{
            e.preventDefault();
            formik.handleSubmit();
        }}>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email</span>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={formik?.handleChange} onBlur={formik?.handleBlur}/>
                <div className="invalid-feedback">
                    {(formik?.touched?.email&&formik?.errors?.email)&&formik?.errors?.email}
                </div>
            </div>
            <button type="submit" className="btn btn-primary mx-auto">Submit</button>
        </form>
    </section>
  )
}
export default ResetPassword;