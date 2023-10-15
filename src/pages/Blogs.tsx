import {ReactElement,useState,useEffect} from 'react'
import { blogType } from '../types/types';
import BlogCard from '../components/Blog/BlogCard';
import { Loading } from '../main';
import Swal from 'sweetalert2';
import axios from 'axios';

function Blogs() :ReactElement{
  const [blogs,setBlogs] = useState<null|blogType[]>(null);
  useEffect(()=>{
    let check = true;
    (async()=>{
        try{
            const {data}:{data:{message:string,status:string,blogs:blogType[]|undefined,errors:string|undefined|[]}} =await axios.get(import.meta.env.VITE_API_BASE_URL+'/blog/getBlogs')
            if(data?.status){
                if(check){
                    setBlogs((data.blogs as blogType[]));
                }
            }else{
                throw data?.message;
            }
        }catch(e){
            Swal.fire({
                title:'Error',
                text:`${(e as Error).message}`,
                icon:'error'
            });
        }
    })()
    return()=>{
        check = false;
    }
  },[])
  return (
    <section className='row  mt-3 flex-grow-1 m-0 p-1 box flex-column flex-md-row row-cols-1 row-cols-md-2 row-cols-lg-3'>
        {
            (blogs)?(((blogs as blogType[]).length===0)?<p className='w-100 fs-5 text-center text-primary'>No Blogs For Now</p>:(blogs as blogType[]).map((el:blogType)=>{
                return(
                    <BlogCard key={el?._id} blog={el}/>
                )
            })):<div className='w-100'><Loading classNamePropert=""/></div>
        }
    </section>
  )
}

export default Blogs;