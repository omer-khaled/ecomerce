import {ReactElement} from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios,{AxiosError} from 'axios';
import makeModal from '../utils/modal';
import {  errorType } from '../types/types';
import { useDispatch } from 'react-redux';
import { dispatchType } from '../store/store';
import authAction from '../store/auth';
import { Link, useNavigate } from 'react-router-dom';
function Login({admin}:{admin:null|boolean}):ReactElement {
    const dispatch = useDispatch<dispatchType>();
    const Navigate = useNavigate();
    const validationSchema = Yup.object({
        email:Yup.string().email('invalid email').required('email should be required').matches(/^[\w\W]+@gmail\.com$/,'invalid email'),
        password:Yup.string().required('password should be required').matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\w\W]{8,}$/,'invalid password should at least 8 chareacter and one number , one charater one special'),
    });
    const formik = useFormik({
        initialValues:{
            email:null,
            password:null
        },
        validationSchema:validationSchema,
        onSubmit:async(values)=>{
           try{
            const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/${(admin)?"Adminlogin":"login"}`,values,{
               withCredentials:true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
            axios.defaults.headers.common['Content-Type'] = `application/json`;
            dispatch(authAction.login({token:`Bearer ${data.data.accessToken}`,user:data.data.user._id}));
            makeModal(data.data.status,"Login",data.data.message).then(()=>{
                if(data.data.status){
                    Navigate('/ecomerce/shop',{
                        replace:true,
                    });
                }
            });
        }catch(e){
                if(e){
                    makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"Login",(((e as AxiosError)?.response?.data) as errorType)?.message)
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
            <Link to={'/ecomerce/resetPassword'} className='m-0 p-0 my-1 fs-6 d-block text-center'>forget password</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </section>
  )
}
export default Login;