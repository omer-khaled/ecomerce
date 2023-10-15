import {ReactElement} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchType, reducerType } from '../../store/store';
import Loading from '../Loading';
import { cartProductType, productType } from '../../types/types';
import cartAction from '../../store/cart'
import {toast} from 'react-toastify';
function CartProducts():ReactElement {
    const cart:unknown = useSelector<reducerType>(state=>state.cart.cart);
    const dispatch = useDispatch<dispatchType>();
  return (
    (<section className='col-12 mt-4 col-md-8 mb-2 mb-md-0'>
        {
            (cart)?(((cart as cartProductType).length>0)?<>{
                (cart as cartProductType).map((el:{product:productType,qty:number})=>{
                    return(<div className="card mb-3" key={el?.product?._id}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center p-1">
                                        <img style={{maxHeight: '250px',objectFit:'contain',objectPosition:'top'}} src={import.meta.env.VITE_API_BASE_URL+"/images/"+el?.product?.imageUrl} className="img-fluid rounded-start" alt={el?.product?.title}/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title text-capitalize">{el?.product?.title}</h5>
                                            <p className="card-text text-capitalize">{el?.product?.description}</p>
                                            <nav className='mt-3 d-flex justify-content-center fit-content' aria-label="Page navigation example">
                                                <ul className="pagination">
                                                    <li className="page-item"><button className="page-link" onClick={()=>{
                                                        dispatch(cartAction.decreaseFromCart(el?.product?._id)).then(()=>{
                                                            toast.success(`quatity of ${el?.product?.title} decreased successfully`,{
                                                                position: "bottom-left",
                                                                autoClose: 500,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: true,
                                                                progress: undefined,
                                                                theme: "light",
                                                            });
                                                        });
                                                    }}> <span aria-hidden="true">-</span></button></li>
                                                    <li className="page-item"><button className="page-link">{el?.qty}</button></li>
                                                    <li className="page-item"><button className="page-link" onClick={()=>{
                                                        dispatch(cartAction.addToCart(el?.product?._id)).then(()=>{
                                                            toast.success(`quatity of ${el?.product?.title} increased successfully`,{
                                                                position: "bottom-left",
                                                                autoClose: 500,
                                                                hideProgressBar: false,
                                                                closeOnClick: true,
                                                                pauseOnHover: true,
                                                                draggable: true,
                                                                progress: undefined,
                                                                theme: "light",
                                                            });
                                                        });
                                                    }}><span aria-hidden="true">+</span></button></li>
                                                </ul>
                                            </nav>
                                            <div className='d-flex justify-content-start align-content-center'>
                                                <span className='rounded border-1 bg-primary text-dark p-2 letterSpaceing me-2'> {el?.product?.category?.name}</span>
                                                <span className='rounded border-1 bg-primary text-dark p-2 letterSpaceing'> {el?.product?.company?.name}</span>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button className="w-100 btn btn-danger d-block" onClick={()=>{
                                                dispatch(cartAction.removeFromCart(el?.product?._id)).then(()=>{
                                                    toast.success(`${el?.product?.title} removed successfully`,{
                                                        position: "bottom-left",
                                                        autoClose: 500,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "light",
                                                    });
                                                });
                                            }}>remove from Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                })
            }</>:<p className='w-100 fs-5 text-center text-primary'>No Products For Now</p>):<div className='w-100'><Loading classNamePropert=''/></div>
        }
    </section>)
  )
}
export default CartProducts;