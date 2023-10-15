import {ReactElement,useEffect,useState,ChangeEvent} from 'react'
import { useParams } from 'react-router-dom';
import makeModal from '../utils/modal';
import axios, { AxiosError } from 'axios';
import { CommentType, blogType, errorType } from '../types/types';
import { Loading } from '../main';
import { useSelector } from 'react-redux';
import { reducerType } from '../store/store';
function SingleBlog():ReactElement {
    const auth = useSelector<reducerType>(state=>state.auth.user)
    const {id} = useParams();
    const [data,setData] = useState<null|blogType>(null);
    const [comments,setComments] = useState<null|CommentType[]>(null);
    const [comment,setComment] = useState<string>('');
    const [commentError,setCommentError] = useState<string|null>(null);
    const handleAddComment = async()=>{
        try{
            const data =await axios.put(import.meta.env.VITE_API_BASE_URL+`/blog/addComment/${id}`,JSON.stringify({
                comment:comment,
            }), { withCredentials: true });
            if(data.status){
                setData(data.data.blog);
                setComments(data.data.blog.comments);
                makeModal(data.data.status,"comment added",data.data.message);
                setCommentError(null);
                setComment('');
            }
        }catch(e){
                if(e){
                    makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"comment added",(((e as AxiosError)?.response?.data) as errorType)?.message)
                }
           }
    }
    const handleremoveComment = async(blogId:string)=>{
        try{
            const data =await axios.delete(import.meta.env.VITE_API_BASE_URL+`/blog/deleteComment/${id}?blogId=${blogId}`,{ withCredentials: true });
            if(data.status){
                setData(data.data.blog);
                setComments(data.data.blog.comments);
                makeModal(data.data.status,"comment deleted",data.data.message);
            }
        }catch(e){
                if(e){
                    makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"comment deleted",(((e as AxiosError)?.response?.data) as errorType)?.message)
                }
           }
    }
    useEffect(()=>{
        let check = true;
        (async()=>{
                try{
                    const url = 'blog/getSingleBlog/';
                    const {data}:{data:{message:string,status:boolean,blog:blogType|null}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/${url}${id}`,{
                        withCredentials:true,
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    });
                    if(data.status){
                        if(check&&data.blog){
                            setData(data.blog);
                            setComments(data.blog.comments);
                        }
                    }
                }catch(e){
                    if(e){
                        makeModal((((e as AxiosError)?.response?.data) as errorType)?.status,"retive data",(((e as AxiosError)?.response?.data) as errorType)?.message)
                    }
                }
            }
        )()
        // const `getSingleCategory/${id}`
        return()=>{
            check = false;
        }
    },[id]);
  return (
    <main className='m-0 p-0 w-100 row mt-3'>
         {(data)?<>
            <div className='col-12 col-lg-8 d-flex mx-atuo justify-content-start align-items-start flex-column'>
                <img className='img-fluid rounded' style={{objectFit:'cover',objectPosition:'top center'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+data?.image} alt={data?.title}/>
                <h1 className='w-100 text-capitalize my-3 text-center'>{data.title}</h1>
                <h1 className='w-100 text-capitalize'>{data.sumary}</h1>
                <div dangerouslySetInnerHTML={{__html:data.content}}></div>
            </div>
            <div className='col-12 col-lg-4 mx-atuo'>
                    <div className='bg-dark rounded p-1'>
                        <p className='text-primary text-capitalize text-start fs-3'>comments</p>
                        {
                            (comments)&&((comments.length!==0)?comments.map((el:CommentType)=>{
                                return(
                                    <div key={el?._id} className='w-100 d-flex justify-content-center align-items-start flex-column position-relative'>
                                        <div className='w-100 d-flex justify-content-start'>
                                                 <div className='bg-white rounded-2 shadow-sm d-flex justify-content-start align-items-start flex-column bg-primary p-2'>
                                                    <img className='img-fluid rounded-circle' style={{width:'80px',height:'80px',objectFit:'cover',objectPosition:'top center'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+el?.user?.image} alt={el?.user?.name}/>
                                                    <p className='text-start text-capitalize text-center p-0 m-0'>
                                                        {el?.user?.name}
                                                    </p>
                                                 </div>
                                                <p className='flex-grow-1 text-start text-capitalize p-2 m-0'>
                                                        {el?.comment}
                                                </p>
                                        </div>
                                        {(el?.user?._id.toString()===auth?.toString())&&<i className='position-absolute bi bi-trash-fill text-danger top-0 end-0 pt-1 pointer' onClick={()=>{
                                            handleremoveComment(el?._id);
                                        }}></i>}
                                        <hr className='my-1 mx-0 w-100 bg-primary'/>
                                    </div>
                                );
                            }):<p className='fs-5 text-capitalize text-center text-primary'>comments is empty</p>)
                        }
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            if(!commentError){
                                handleAddComment();
                            }
                        }} className='mt-2 w-100 d-flex justify-content-between align-items-center'>
                                <input value={comment} type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                    setComment(e.target.value);
                                    if(/^[\w|\s]{3,}$/.test(e.target.value)){
                                        setCommentError(null);
                                    }else{
                                        setCommentError('should be required at least 3char');
                                    }
                                }} className='border-1 flex-grow-1 me-1 p-1 rounded form-control' name="" id="" />
                                <button type="submit" className='btn btn-primary'>+add</button>
                        </form>
                        {(commentError)&&<p className='invalid-feedback'>{commentError}</p>}
                    </div>
            </div>
            </>:<Loading classNamePropert='loader'/>
         }
    </main>
  )
}

export default SingleBlog;