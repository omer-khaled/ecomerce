import {ReactElement,useEffect,useState} from 'react'
import { productType } from '../../types/types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';
import gards from '../../utils/gards';
import CartOrderUI from './CartOrderUI';

export function CartOrder():ReactElement {
  const {id} = useParams();
  const [products,setProducts] = useState<null|{product:productType,qty:number}[]>();
  const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
  useEffect(() => {
    let check:boolean = true;
    (async()=>{
        if(auth===true){
        const {data}:{data:{message:string,order:{product:productType,qty:number}[]|undefined,status:boolean,error:[]|undefined|string}} =await axios.get(import.meta.env.VITE_API_BASE_URL+`/order/getSingleOrder/${id}`,
            {
              withCredentials:true
            }
        );
        if(data.status){
          if(check){
            if(data.order){
              setProducts((data.order as {product:productType,qty:number}[]));
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
  }, [auth,id]);
  return (
    <>
      <section className='w-100 row row-cols-1 row-cols-md-3 row-cols-lg-4 h-100'>
          {
            (products)&&<CartOrderUI products={products}/>
          }
        </section>
      </>
  )
}

export default gards(CartOrder)  as typeof CartOrder;