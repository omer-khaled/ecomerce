import {ReactElement} from 'react'
import { productType } from '../../types/types';
import CardProduct from '../Shop/CardProduct';
import Loading from '../Loading';

 function CartOrderUI({products}:{products:{product:productType,qty:number}[]|null}):ReactElement {
  return (
    <>
        {
              (products)?((products.length===0)?<p className='w-100 fs-5 text-center text-primary'>No Products For Now</p>:(products as {product:productType,qty:number}[]).map((el:{product:productType,qty:number})=>{
                  return(
                      <CardProduct order={true} key={el?.product?._id} product={el?.product} auth={false} qty={el?.qty}/>
                  )
              })):<div className='w-100'><Loading classNamePropert=""/></div>
          }
    </>
  )
}
export default  CartOrderUI;