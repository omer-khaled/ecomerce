import {ReactElement} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios,{AxiosError} from 'axios';
import makeModal from '../utils/modal';
import {  errorType } from '../types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
function ChangePassword():ReactElement {
    const [searchParams] = useSearchParams();
    const Navigate = useNavigate();
    const validationSchema = Yup.object({
        password:Yup.string().required('password should be required').matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\w\W]{8,}$/,'invalid password should at least 8 chareacter and one number , one charater one special'),
    });
    const formik = useFormik({
        initialValues:{
            password:null,
        },
        validationSchema:validationSchema,
        onSubmit:async(values)=>{
           try{
            const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/changePassword?token=${searchParams.get('token')}`,values,{
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
                <span className="input-group-text" id="basic-addon1">password</span>
                <input type="password" className="form-control" name='password' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={formik?.handleChange} onBlur={formik?.handleBlur}/>
                <div className="invalid-feedback">
                    {(formik?.touched?.password&&formik?.errors?.password)&&formik?.errors?.password}
                </div>
            </div>
            <button type="submit" className="btn btn-primary mx-auto">Chnage</button>
        </form>
    </section>
  )
}
export default ChangePassword;