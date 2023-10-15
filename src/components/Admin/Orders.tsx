import {ReactElement,createContext,useEffect,useState} from 'react'
import { ordersType } from '../../types/types';
import Swal from 'sweetalert2';
import axios from 'axios';
import adminGards from '../../utils/adminGards';
import OrdersTable from '../Orders/OrdersTable';

export const context = createContext<{ requestDone: boolean; setRequestDone: React.Dispatch<React.SetStateAction<boolean>> }>({
    requestDone: false,
    setRequestDone: () => {},
  });
export function Orders():ReactElement {
    const [requestDone,setRequestDone] = useState<boolean>(false);
    const [orders,setOrders] = useState<null|ordersType[]>(null);
    useEffect(()=>{
        let check = true;
        (async()=>{
            try{
                setOrders(()=>null);
                const {data}:{data:{message:string,status:boolean,orders:undefined|ordersType[],errors:string|undefined|[]}} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/order/AdmingetOrders`);
                if(data.orders){
                    if(check){
                        setOrders(data.orders);
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
    },[requestDone])
  return (
    <context.Provider value={{ requestDone, setRequestDone }}>
        <OrdersTable admin={true} orders={orders}/>
    </context.Provider>
  )
}

export default adminGards(Orders) as typeof Orders;