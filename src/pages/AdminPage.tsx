import {ReactElement} from 'react'
import {Outlet} from 'react-router-dom';
import { dispatchType, reducerType } from '../store/store';
import { useEffect } from 'react';
import authAction from '../store/auth';
import axios from 'axios';
import SideBar from '../components/Admin/SideBar';
import { useDispatch, useSelector } from 'react-redux';
function AdminPage():ReactElement{
  const dispatch = useDispatch<dispatchType>();
  const auth = useSelector<reducerType>(state=>state.auth.auth);
  useEffect(()=>{
    (async()=>{
      try{
        if(auth===false){
          const data =await axios.get(import.meta.env.VITE_API_BASE_URL+'/auth/adminrefresh',{
            withCredentials:true
          });
          if(data.data.status){
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
            axios.defaults.headers.common['Content-Type'] = `application/json`;
            dispatch(authAction.login(data.data.accessToken));
          }
        }
      }catch(e){
        dispatch(authAction.logout())
      }
    })()
  },[dispatch,auth]);
  return (
    <section className='row w-100 m-0 mx-auto b-4  d-flex'>
        <SideBar/>
        <div className='col-2'></div>
        <section className='col-10 m-0 p-3 bg-dark h-100vh  overflow-auto position-relative'>
          <Outlet/>
        </section>
    </section>
  )
}
export default AdminPage;
