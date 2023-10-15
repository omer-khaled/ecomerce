import {ReactElement, useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import { ordersType } from '../types/types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loading } from '../main';
import { useSelector } from 'react-redux';
import { reducerType } from '../store/store';
import adminGards from '../utils/adminGards';

export function AdminHome():ReactElement{
    const [orders,setOrders] = useState<null|ordersType[]>(null);
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    useEffect(()=>{
        let check = true;
        (async()=>{
            try{
                if(auth){
                    setOrders(()=>null);
                    const {data}:{data:{message:string,status:boolean,orders:undefined|ordersType[],errors:string|undefined|[]}} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/order/lastestOrders`,{
                        withCredentials:true
                    });
                    if(data.orders){
                        if(check){
                            setOrders(data.orders);
                        }
                    }
                }
            }catch(e){
                Swal.fire({
                    title:'error through retrived Data',
                    text:(e as Error).message,
                    icon:'error',
                })
            }
        })()
        return()=>{
            check = false;
        }
    },[auth]);
  return (
    <main className='w-100 flex-grow-1 m-0 align-items-start my-4 row'>
        <section className='col-6 box p-2'>
         <iframe className='w-100' style={{background:'#FFFFFF',border:'none',borderRadius:'2px',boxShadow:'0 2px 10px 0 rgba(70, 76, 79, .2)'}}  height="480" src="https://charts.mongodb.com/charts-ecomercefullstack-ehqle/embed/charts?id=652a8cf0-f394-42de-8391-fdb72f11fad3&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        </section>
        <section className='col-6  box p-2'>
         <iframe className='w-100' style={{background:'#FFFFFF',border:'none',borderRadius:'2px',boxShadow:'0 2px 10px 0 rgba(70, 76, 79, .2)'}}  height="480" src="https://charts.mongodb.com/charts-ecomercefullstack-ehqle/embed/charts?id=652a9026-140a-4b70-8fdd-df8deb8d28d2&maxDataAge=60&theme=light&autoRefresh=true"></iframe>
        </section>
        <section className='col-12  box p-2'>
        {
            (orders)?((orders.length!==0)?<div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                    {
                     <th>actions</th>
                    }
                    <th>orderId</th>
                    <th>cart Details</th>
                    <th>order satus</th>
                    <th>paid</th>
                    <th>total</th>
                    <th>payment status</th>
                    <th>Time</th>
                    <th>Date</th>
                </tr>
              </thead>
              <tbody>
                  {
                    orders?.map((el:ordersType)=>{
                      return(
                        <tr key={el?._id}>
                          {((el?.status!=='Delivered')?<td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>
                            <div className='w-100 d-flex justify-content-start align-items-center'>
                              {
                                (el?.status==='in store')&&<i className="bi bi-truck me-2 pointer"></i>
                              }
                              {
                                (el?.status==='in shipping')&&<i className="bi bi-check2-circle pointer"></i>
                              }
                            </div>
                          </td>:<td  className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>Successfully</td>)}
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'} pointer`}>{el?._id}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}><Link to={`/${"admin/ordersCartAdmin"}/${el?._id}`}>cart details</Link></td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{el?.status}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{String(el?.paid)}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{String(el?.totalPrice)} $</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{el?.paymentStatus} {(el?.paid)?<i className="bi bi-check-all"></i>:<i className="bi bi-x"></i>}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{(new Date(el?.createdAt)).toLocaleTimeString()}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>{(new Date(el?.createdAt)).toLocaleDateString()}</td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>
          </div>:<h1 className='text-center w-100 text-primary text-capitalize'>no orders for now</h1>):<Loading  classNamePropert=''/>
          }
        </section>
    </main>
  )
}

export default adminGards(AdminHome) as typeof AdminHome;