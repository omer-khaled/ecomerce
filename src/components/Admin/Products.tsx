import {ChangeEvent, ReactElement,useCallback,useEffect,useState} from 'react'
import { productType } from '../../types/types';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../Loading';
import adminGards from '../../utils/adminGards';
import { Link } from 'react-router-dom';
export function Products():ReactElement {
  const [products,setProducts] = useState<null|productType[]>(null);
  const [page,setPage] = useState<number>(1);
  const [numberOfPages,setNumberOfPages] = useState<number|null>(null);
  const [requestDone,setRequestDone] = useState<boolean>(true);
  const [title,setTitle] = useState<string>('');
  const handleRemoveCompanies = useCallback((id:string)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        const {data}:{data:{message:string,status:boolean,errors:string|undefined|[]}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/products/deleteProduct/${id}`,{
          withCredentials:true
        });
        if(data.status){
          setRequestDone((state)=>!state);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }else{
          Swal.fire(
            'Deleted failed!',
            `${data.message}`,
            'error'
          )
        }
      }
    })      
  },[]);
  const getProducts = useCallback(async(title:string|null,check:boolean,page:number|null)=>{
        try{
          setProducts(()=>null);
          const {data}:{data:{message:string,status:boolean,numberOfPage:number|undefined,products:undefined|productType[],errors:string|undefined|[]}} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/getProducts?page=${page}${(title)?`&title=${title}`:''}`);
          if(data.products&&Number.isInteger(data.numberOfPage)){
              if(check){
                  setProducts(data.products);
                  setNumberOfPages(data.numberOfPage as number)
              }
          }
      }catch(e){
          Swal.fire({
              title:'error through retrived Data',
              text:(e as Error).message,
              icon:'error',
          })
      }
  },[]);
  useEffect(()=>{
    let check = true;
    let handler:null|number = null;
    if(title){
      handler = setTimeout(()=>{
        (async()=>{
          await getProducts(title,check,page);
        })()
      },700)
    }
    else{
        (async()=>{
          await getProducts(null,check,page);
        })()
    }
    return()=>{
      if(handler){
        clearTimeout(handler);
      }
      check = false;
    }
  },[title,requestDone,getProducts,page])
  return (
    <section className="row w-100 m-0 flex-grow-1 align-items-start my-4 ">
      <div className=' d-flex justify-content-between align-items-center mb-3'>
          <div className='col-6'>
              <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
                  <input type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                    setTitle(e.target.value);
                  }} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              </div>
          </div>
          <Link to={'addProducts'} className=' btn btn-primary d-flex justify-content-center'><i className="bi bi-plus-square-fill me-2"></i>Add</Link>
      </div>
      {
            (products)?((products.length!==0)?<>
            <div className="table-responsive">
            <table className="table table-bordered align-middle" border={1}>
              <thead>
                <tr>
                    <th>actions</th>
                    <th>productId</th>
                    <th>image</th>
                    <th>title</th>
                    <th>description</th>
                    <th>price</th>
                    <th>inStock</th>
                    <th>category</th>
                    <th>company</th>
                    <th>sizes</th>
                    <th>colors</th>
                </tr>
              </thead>
              <tbody>
                  {
                    products?.map((el:productType)=>{
                      return(
                        <tr key={el?._id}>
                          <td><div className='d-flex justify-content-center align-items-center'>
                                <Link  to={`editProducts/${el?._id}`} className='p-0'><span className='bi bi-pencil-square text-success me-2'></span></Link>
                                <button className='p-0' onClick={()=>{
                                  handleRemoveCompanies(el?._id);
                                }}><span className='bi bi-trash-fill text-danger'></span></button>
                            </div></td>
                          <td className='text-truncate'>{el?._id}</td>
                          <td><img  className='img-fluid' src={import.meta.env.VITE_API_BASE_URL+'/images/'+el?.imageUrl} alt={el?.title}/></td>
                          <td className='text-truncate'>{el?.title}</td>
                          <td className='text-truncate'>{el?.description}</td>
                          <td className='text-truncate'>{el?.price}</td>
                          <td className='text-truncate'>{el?.inStock} peices</td>
                          <td className='text-truncate'>{el?.category?.name}</td>
                          <td className='text-truncate'>{el?.company?.name}</td>
                          <td className='text-truncate'>{el?.sizes?.join(',')}</td>
                          <td className='text-truncate'>
                            <div className='w-100 h-100 d-flex justify-content-start align-items-center gap-1'>
                                {el?.colors?.map((el:string)=>{
                                return(
                                  <span key={el} className='d-block rounded-circle' style={{background:el,width:'15px',height:'15px'}}></span>
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>
          </div></>:<h1 className='text-center w-100 text-primary text-capitalize'>no products for now</h1>):<Loading  classNamePropert=''/>
    }
        {(numberOfPages)&&<nav className='mx-auto mt-3 d-flex justify-content-center' aria-label="Page navigation example">
                <ul className="pagination">
                    {(((page as number)>1))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        setPage((page)=>page-1);
                    }}> <span aria-hidden="true">&laquo;</span></button></li>}
                    <li className="page-item"><button className="page-link">{(page as number)}</button></li>
                    {(((page as number)<(numberOfPages as number)))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        setPage((page)=>page+1);
                    }}><span aria-hidden="true">&raquo;</span></button></li>}
                </ul>
        </nav>}
    </section>
  )
}

export default adminGards(Products) as typeof Products;