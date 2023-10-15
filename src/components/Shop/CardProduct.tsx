import {ReactElement} from 'react'
import { productType } from '../../types/types';
import { useDispatch } from 'react-redux';
import { dispatchType } from '../../store/store';
import cartAction from '../../store/cart'
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';
function CardProduct({product,auth,order,qty}:{product:productType,auth:boolean,order:boolean,qty:number|null}):ReactElement {
    const dispatch = useDispatch<dispatchType>();
  return (
    <div key={product._id} className='col box mb-2'>
            <div className="card position-relative">
                <img className='img-fluid'  style={{maxHeight: '250px',objectFit:'contain',objectPosition:'top'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+product?.imageUrl} alt={product?.title}/>
                <div className="card-body">
                    <h5 className="card-title w-100 text-primary text-truncate">{product?.title}</h5>
                    <p className="card-text w-100">{(product?.description?.length>100)?product?.description.slice(0,99):product?.description}</p>
                    {(order)&&<p className='card-text w-100'>number of pecies = <span className='text-primary'>{qty}</span> peice</p>}
                    {(auth as boolean&&!order)&&<button onClick={()=>{
                        dispatch(cartAction.addToCart(product?._id)).then(()=>{
                            toast.success(`${product?.title} added successfully`,{
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
                    }} className="btn btn-primary d-block w-100">Add to Cart</button>}
                </div>
                <div className='card-footer d-flex justify-content-between align-content-center'>
                    <span className='rounded border-1 bg-primary text-dark p-2 letterSpaceing'> {product?.category?.name}</span>
                    <span className='rounded border-1 bg-primary text-dark p-2 letterSpaceing'> {product?.company?.name}</span>
                </div>
                <p className="card-price fit-content m-0 p-0 position-absolute letterSpaceing rounded border-1 bg-primary p-1">{product?.price}$</p>
                <Link className='text-center p-2' to={`/showProduct/${product?._id}`}>read more...</Link>
            </div>
    </div>
  )
}

export default CardProduct;