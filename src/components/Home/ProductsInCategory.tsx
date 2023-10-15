import {ReactElement,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { productType } from '../../types/types';
import Loading from '../Loading';
import { reducerType } from '../../store/store';
import { useSelector } from 'react-redux';
import CardProduct from '../Shop/CardProduct';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function ProductsInCategory():ReactElement {
    const {id} = useParams();
    const [products,setProducts] = useState<null|productType[]>(null);
    const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
    useEffect(()=>{
        let check = true;
        (async()=>{
            const {products} = await(await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/getProductByCategory/${id}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                }
            })).json();
            if(check){
                setProducts(products);
            }
        })()
        return ()=>{
            check =false;
        }
    },[id]);
  return (
    <>
        <section className='w-100 flex-grow-1 p-2'>
            {
                (products)?((products.length!==0)?
                <>
                    <h1 className='w-100 text-primary text-center'>{products?.length} products in this category</h1>
                    <div className='row row-cols-1 row-cols-md-3 row-cols-lg-5'>
                        {
                            products.map((el:productType)=>{
                                return(
                                    <CardProduct product={el} auth={auth as boolean} key={el?._id} qty={null} order={false}/>
                                )
                            })
                        }
                    </div>
                </>:<h1 className='w-100 text-primary text-center'>No products in this category</h1>):<Loading classNamePropert='' />
            }
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

export default ProductsInCategory;
