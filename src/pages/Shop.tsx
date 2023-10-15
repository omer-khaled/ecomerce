import { ReactElement,useEffect } from "react"
import ProductList from "../components/Shop/ProductList";
import SideBar from "../components/Shop/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, reducerType } from "../store/store";
import shopactions from '../store/shop';
import {startTransition} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
function Shop():ReactElement {
  const dispatch = useDispatch<dispatchType>();
  const filters:unknown = useSelector<reducerType>(state=>state.products.filters);
  const page:unknown = useSelector<reducerType>(state=>state.products.page);
  useEffect(()=>{
    startTransition(()=>{
      dispatch(shopactions.getProducts('/products/filters?'));
    })
  },[dispatch,filters,page]);
  return (
    <>
        <section className="row w-100 m-0 flex-grow-1 align-items-start my-4 ">
            <SideBar/>
            <ProductList />
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

export default Shop
