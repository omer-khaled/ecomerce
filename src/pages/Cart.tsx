import {ReactElement, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, reducerType } from '../store/store';
import cartAction from '../store/cart';
import CartProducts from '../components/Cart/CartProducts';
import Checkout from '../components/Cart/Checkout';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import gards from '../utils/gards';
export function Cart():ReactElement{
    const dispatch = useDispatch<dispatchType>();
    const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
    useEffect(()=>{
        if((auth as boolean)){
            dispatch(cartAction.getCart());
        }
    },[dispatch,auth]);
  return (
    <>
      <section className='row flex-grow-1 m-0 p-1 box flex-column flex-md-row'>
          <CartProducts/>
          <Checkout/>
      </section>
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
export default gards(Cart) as typeof Cart;