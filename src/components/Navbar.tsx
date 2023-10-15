import { ReactElement, useCallback, useEffect ,useState} from "react";
import {Link, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, reducerType } from "../store/store";
import authAction from '../store/auth';
import axios from "axios";
import { userType } from "../types/types";
import makeModal from "../utils/modal";
function Navbar():ReactElement {
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    const userId = useSelector<reducerType>(state=>state.auth.user);
    const dispatch = useDispatch<dispatchType>();
    const [data,setDate] = useState<userType|null>(null);
    const logOut = useCallback(async()=>{
        try{
            const {data}:{data:{message:string,status:boolean}} =await axios.get(import.meta.env.VITE_API_BASE_URL+"/auth/logout",{
                withCredentials:true,
            });
            if(data.status){
                dispatch(authAction.logout())
            }
        }catch(e){
            console.log((e as Error).message);
        }
        
    },[dispatch]);
    useEffect(()=>{
        (async()=>{
            try{
                if(auth&&userId){
                    const {data}:{data:{message:string,status:boolean,user:userType|undefined,errors:undefined|string|[]}} =await axios.get(import.meta.env.VITE_API_BASE_URL+`/auth/getuser/${userId}`,{
                        withCredentials:true
                    });
                    if(data.status&&data.user){
                        setDate(data.user);
                    }
                }
            }catch(e){
                makeModal(false,'retrived user Data failed','click here')
            }
        })()
    },[auth,userId])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <div className="container-fluid">
            <Link to={'/ecomerce/'} className="navbar-brand"><span className="fs-2 text-primary">B</span>uy</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                <li className="nav-item">
                    <NavLink className={({isActive})=>{
                        return isActive?'nav-link active':'nav-link'
                    }} aria-current="page" to="/ecomerce/"><i className="bi bi-house-fill"></i> Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive})=>{
                        return isActive?'nav-link active':'nav-link'
                    }} aria-current="page" to="shop"><i className="bi bi-shop"></i> Shop</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive})=>{
                            return isActive?'nav-link active':'nav-link'
                        }} aria-current="page" to="blog"><i className="bi bi-substack"></i> Blog</NavLink>
                </li>
                {(!auth)?<><li className="nav-item">
                    <NavLink className={({isActive})=>{
                            return isActive?'nav-link active':'nav-link'
                        }} aria-current="page" to="signup"><i className="bi bi-door-closed-fill"></i> Sign up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({isActive})=>{
                            return isActive?'nav-link active':'nav-link'
                        }} aria-current="page" to="login"><i className="bi bi-door-open-fill"></i> Login</NavLink>
                </li></>:<>
                    <li className="nav-item">
                        <NavLink className={({isActive})=>{
                                return isActive?'nav-link active':'nav-link'
                            }} aria-current="page" to="cart"><i className="bi bi-cart-fill"></i> cart</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({isActive})=>{
                                return isActive?'nav-link active':'nav-link'
                            }} aria-current="page" to="orders"><i className="bi bi-cart-fill"></i> orders</NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" aria-current="page" onClick={()=>{
                                logOut();
                        }}><i className="bi bi-door-open-fill text-danger"></i> logout</button>
                    </li>
                    <li className="nav-item">
                       {
                            (data)&&( <div className="">
                                <img className="rounded-circle " style={{width:'50px',height:'50px',objectFit:'cover',objectPosition:'top center'}} src={import.meta.env.VITE_API_BASE_URL+'/images/'+data.image} alt="" />
                            </div>
                            )
                       }
                    </li>
                </>
                }
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar;