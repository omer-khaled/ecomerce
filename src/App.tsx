import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom';
import { dispatchType, reducerType } from './store/store';
import { useEffect } from 'react';
import authAction from './store/auth';
import axios from 'axios';
function App() {
  const dispatch = useDispatch<dispatchType>();
  const auth = useSelector<reducerType>(state=>state.auth.auth);
  useEffect(()=>{
    (async()=>{
      try{
        if(auth===false){
          const data =await axios.get(import.meta.env.VITE_API_BASE_URL+'/auth/refresh',{
            withCredentials:true
          });
          if(data.data.status){
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
            axios.defaults.headers.common['Content-Type'] = `application/json`;
            dispatch(authAction.login({token:data.data.accessToken,user:data.data.user}));
          }
        }
      }catch(e){
        dispatch(authAction.logout())
      }
    })()
  },[dispatch,auth]);
  return (
      <main className='container d-flex flex-column min-100vh'>
        <Navbar />
        <Outlet/>
        <Footer />
      </main>
  )   
}

export default App
