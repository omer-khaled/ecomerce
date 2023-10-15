import {ReactElement,useEffect,useState} from 'react'
import {ToastContainer} from 'react-toastify'
import { ordersType } from '../types/types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { reducerType } from '../store/store';
import { useSelector } from 'react-redux';
import gards from '../utils/gards';
import OrdersTable from '../components/Orders/OrdersTable';
export function Orders() :ReactElement{
  const [orders,setOrders] = useState<null|ordersType[]>(null)
  const auth = useSelector<reducerType>(state=>state.auth.auth);
  useEffect(() => {
    let check:boolean = true;
    (async()=>{
      if(auth===true){
        const {data}:{data:{message:string,orders:ordersType[]|undefined,status:boolean,error:[]|undefined|string}} =await axios.get(import.meta.env.VITE_API_BASE_URL+'/order/getOrders');
        if(data.status){
          if(check){
            if(data.orders){
              setOrders((data.orders as ordersType[]));
            }
          }
        }else{
          Swal.fire({
              title:`orders retrived Faild!`,
              text:data.message,
              icon:'error'
          });
        }
      }
    })()
    return () => {
      check = false;
    }
  }, [auth]);
  return (
    <>
          <OrdersTable orders={orders} admin={null}/>
          <ToastContainer 
          position="bottom-left"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
    </>
  )
}

export default gards(Orders) as typeof Orders;