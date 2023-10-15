import {ReactElement,useCallback, useContext} from 'react'
import { ordersType } from '../../types/types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import { context } from '../Admin/Orders';

function OrdersTable({orders,admin}:{orders:ordersType[]|null,admin:null|boolean}):ReactElement {
  const {requestDone, setRequestDone} = useContext(context);
  const handleCheckout = useCallback(async(id:string)=>{
    try{
        const {data}:{data:{url:string|undefined,message:string|undefined,status:boolean|undefined}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/cart/checkoutForExistsOrder/${id}?cancel_url=https://omer-khaled.github.io/ecomerce/failedPage&success_url=https://omer-khaled.github.io/ecomerce/successPage`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.url){
            Swal.fire({
                title:`Payment Ready For You`,
                text:"Go To Payment",
                icon:'success',
            }).then(()=>{
                if(data.url){
                    location.href = data.url;
                }
            });
        }else{
            Swal.fire({
                title:`Cart is Empaty!`,
                text:(data as {message:string,status:boolean}).message,
                icon:'error'
            });
        }
    }catch(e){
        // window.location.href = "https://omer-khaled.github.io/ecomerce/failedPage"
    }
  },[]);
  const handleUpdateStatus = useCallback(async(id:string)=>{
    try{
        const {data}:{data:{message:string|undefined,status:boolean|undefined}} = await axios.patch(import.meta.env.VITE_API_BASE_URL+`/order/updateStatusOrder/${id}`,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(data.status){
            Swal.fire({
                title:`Status updated Successfully`,
                text:"Done",
                icon:'success',
            });
            setRequestDone(!requestDone);
        }else{
            Swal.fire({
                title:`Status updated failed`,
                text:(data as {message:string,status:boolean}).message,
                icon:'error'
            });
        }
    }catch(e){
        window.location.href = "http://localhost:5173/failedPage"
    }
  },[requestDone,setRequestDone]);
  
  return (
    <section className="row w-100 m-0 flex-grow-1 align-items-start my-4 ">
          {
            (orders)?((orders.length!==0)?<div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                    {
                     (admin)&&<th>actions</th>
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
                          {(admin)&&((el?.status!=='Delivered')?<td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>
                            <div className='w-100 d-flex justify-content-start align-items-center'>
                              {
                                (el?.status==='in store')&&<i className="bi bi-truck me-2 pointer" onClick={()=>{
                                  handleUpdateStatus(el?._id);
                                }}></i>
                              }
                              {
                                (el?.status==='in shipping')&&<i className="bi bi-check2-circle pointer" onClick={()=>{
                                  handleUpdateStatus(el?._id);
                                }}></i>
                              }
                            </div>
                          </td>:<td  className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}>Successfully</td>)}
                          <td onClick={()=>{if(!admin&&!el?.paid){handleCheckout(el?._id);}}} className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'} pointer`}>{el?._id}</td>
                          <td className={`text-capitalize ${(el?.paid)?'text-success':'text-danger'}`}><Link to={`/${(admin)?"admin/ordersCartAdmin":"ordersCart"}/${el?._id}`}>cart details</Link></td>
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
  )
}
export default OrdersTable;
