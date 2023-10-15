import {ReactElement} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {dispatchType, reducerType } from "../../store/store";
import { productType } from "../../types/types";
import Loading from '../Loading';
import CardProduct from './CardProduct';
import pageAction from '../../store/shop';
function ProductList():ReactElement {
    const products:unknown = useSelector<reducerType>(state=>state.products.products);
    const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
    const page:unknown = useSelector<reducerType>(state=>state.products.page);
    const numberOfPages:unknown = useSelector<reducerType>(state=>state.products.numberOfPage);
    const dispatch = useDispatch<dispatchType>();
  return (
    <section className='col-md-9  flex-column'>
        <section className='w-100 row row-cols-1 row-cols-md-2 row-cols-lg-3 h-100 mx-auto'>
            {
                (products)?(((products as productType[]).length===0)?<p className='w-100 fs-5 text-center text-primary'>No Products For Now</p>:(products as productType[]).map((el:productType)=>{
                    return(
                        <CardProduct order={false} key={el?._id} product={el} auth={auth as boolean} qty={null}/>
                    )
                })):<div className='w-100'><Loading classNamePropert=""/></div>
            }
        </section>
        <nav className='mx-auto mt-3 d-flex justify-content-center' aria-label="Page navigation example">
                <ul className="pagination">
                    {(((page as number)>1))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        dispatch(pageAction.prevPage());
                    }}> <span aria-hidden="true">&laquo;</span></button></li>}
                    <li className="page-item"><button className="page-link">{(page as number)}</button></li>
                    {(((page as number)<(numberOfPages as number)))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        dispatch(pageAction.nextPage());
                    }}><span aria-hidden="true">&raquo;</span></button></li>}
                </ul>
        </nav>
    </section>
    
    
  )
}
export default ProductList;