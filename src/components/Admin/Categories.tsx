import {ChangeEvent, ReactElement,useCallback,useEffect,useState} from 'react'
import { categoryType } from '../../types/types';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../Loading';
import adminGards from '../../utils/adminGards';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reducerType } from '../../store/store';

export function Categories():ReactElement {
    const [categories,setCategories] = useState<null|categoryType[]>(null);
    const [page,setPage] = useState<number>(1);
    const [numberOfPages,setNumberOfPages] = useState<number|null>(null);
    const [requestDone,setRequestDone] = useState<boolean>(true);
    const auth = useSelector<reducerType>(state=>state.auth.auth);
    const [name,setName] = useState<string>('');
    const getCategories = useCallback(async(name:string|null,check:boolean,page:number|null)=>{
        try{
            setCategories(()=>null);
            const {data}:{data:{message:string,status:boolean,numberOfPage:number|undefined,categories:undefined|categoryType[],errors:string|undefined|[]}} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/category/getCategoriesPagination?page=${page}${(name)?`&name=${name}`:''}`);
            if(data.categories&&Number.isInteger(data.numberOfPage)){
              if(check){
                setCategories(data.categories);
                setNumberOfPages(data.numberOfPage as number);
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
          const {data}:{data:{message:string,status:boolean,errors:string|undefined|[]}} = await axios.delete(import.meta.env.VITE_API_BASE_URL+`/category/deleteCategory/${id}`,{
            withCredentials:true
          });
          if(data.status){
            setRequestDone((state)=>!state);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        }
      })      
    },[]);
    useEffect(()=>{
      let check = true;
      let handler:null|number = null;
      (async()=>{
        if(auth){
          if(name){
            handler = setTimeout(()=>{
              (async()=>{
                await getCategories(name,check,page);
              })()
            },700)
          }
          else{
              (async()=>{
                await getCategories(null,check,page);
              })()
          }
        }
      })()
      return()=>{
        if(handler){
          clearTimeout(handler);
        }
        check = false;
      }
    },[name,requestDone,page,auth,getCategories])
  return (
    <section className={`row w-100 m-0 flex-grow-1 align-items-start my-4 `}>
      <div className=' d-flex justify-content-between align-items-center mb-3'>
          <div className='col-6'>
              <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                  <input onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                          setName(e.target.value);
                    }}  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
              </div>
          </div>
          <Link to={'/admin/categories/addCategory'} className=' btn btn-primary d-flex justify-content-center'><i className="bi bi-plus-square-fill me-2"></i>Add</Link>
      </div>
      {
            (categories)?((categories.length!==0)?<>
            {(numberOfPages)&&<nav className='mt-3 d-flex justify-content-center' aria-label="Page navigation example">
                <ul className="pagination me-auto">
                    {(((page as number)>1))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        setPage((page)=>page-1);
                    }}> <span aria-hidden="true">&laquo;</span></button></li>}
                    <li className="page-item"><button className="page-link">{(page as number)}</button></li>
                    {(((page as number)<(numberOfPages as number)))&&<li className="page-item"><button className="page-link" onClick={()=>{
                        setPage((page)=>page+1);
                    }}><span aria-hidden="true">&raquo;</span></button></li>}
                </ul>
            </nav>
          }
            <div className="table-responsive">
            <table className="table table-bordered align-middle" border={1}>
              <thead>
                <tr>
                    <th>actions</th>
                    <th>categoryID</th>
                    <th>image</th>
                    <th>name</th>
                </tr>
              </thead>
              <tbody>
                  {
                    categories?.map((el:categoryType)=>{
                      return(
                        <tr key={el?._id}>
                          <td><div className='d-flex justify-content-center align-items-center'>
                                <Link  to={`/admin/categories/updateCategory/${el?._id}`} className='p-0' ><span className='bi bi-pencil-square text-success me-2'></span></Link>
                                <button className='p-0' onClick={()=>{
                                  handleRemoveCompanies(el?._id);
                                }}><span className='bi bi-trash-fill text-danger'></span></button>
                            </div></td>
                          <td className='text-truncate'>{el?._id}</td>
                          <td><img className='img-fluid' src={import.meta.env.VITE_API_BASE_URL+'/images/'+el?.image} alt={el?.name}/></td>
                          <td className='text-truncate'>{el?.name}</td>
                        </tr>
                      )
                    })
                  }
              </tbody>
            </table>
          </div></>:<h1 className='text-center w-100 text-primary text-capitalize'>no categories for now</h1>):<Loading  classNamePropert=''/>
      }
    </section>
  )
}

export default adminGards(Categories) as typeof Categories;