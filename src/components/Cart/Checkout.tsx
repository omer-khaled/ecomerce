import {ReactElement, useCallback, useState} from 'react'
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';
import axios from 'axios';
import Swal from 'sweetalert2';
function Checkout():ReactElement {
    const totalPrice:unknown = useSelector<reducerType>(state=>state.cart.totalPrice);
    const [waitUrl,setWaiteUrl] = useState<boolean>(false);
   const handleCheckout = useCallback(async()=>{
        try{
            const {data}:{data:{url:string|undefined,message:string|undefined,status:boolean|undefined}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/cart/checkout?cancel_url=https://omer-khaled.github.io/ecomerce/failedPage&success_url=https://omer-khaled.github.io/ecomerce/successPage`,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(data.url){
                setWaiteUrl(false);
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
                setWaiteUrl(false);
                Swal.fire({
                    title:`Cart is Empaty!`,
                    text:(data as {message:string,status:boolean}).message,
                    icon:'error'
                });
            }
        }catch(e){
            window.location.href = "https://omer-khaled.github.io/ecomerce/failedPage"
        }
   },[]);
  return (
    <section className='col-12 col-md-3 mt-4'>
        <div className='d-flex justify-content-start align-center flex-column border border-2 p-2 rounded'>
            <div className="d-flex justify-content-between align-items-center">
                <span className='text-capitalize'>subTotal</span>
                <span>{totalPrice as number}$</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span className='text-capitalize'>shipping</span>
                <span>20$</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <span className='text-capitalize'>total</span>
                <span>{(totalPrice as number)+20}$</span>
            </div>
            <button className='btn btn-primary mt-1 text-capitalize' onClick={()=>{
                setWaiteUrl(true);
                handleCheckout();
            }}>{(waitUrl)?<div className='mx-auto checkoutLoader rounded-circle border-2'></div>:"checkout"}</button>
        </div>
    </section>
  )
}
export default Checkout;