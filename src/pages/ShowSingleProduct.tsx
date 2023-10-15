import {ReactElement,useState,useEffect,ChangeEvent} from 'react'
import { useParams } from 'react-router-dom';
import { errorType, feedBackType, productType } from '../types/types';
import axios, { AxiosError } from 'axios';
import makeModal from '../utils/modal';
import { Loading } from '../main';
import { reducerType } from '../store/store';
import { useSelector } from 'react-redux';
import StarsRating from 'react-star-rate';
import StarRatings from 'react-star-ratings';
function ShowSingleProduct():ReactElement {
    const {id} = useParams();
    const [data,setData] = useState<null|productType>(null);
    const [comments,setComments] = useState<null|feedBackType[]>(null);
    const [rate,setRate] = useState<number>(3.5);
    const [comment,setComment] = useState<string>('');
    const [commentError,setCommentError] = useState<string|null>(null);
    const auth = useSelector<reducerType>(state=>state.auth.user);
    const sizes: { [key: string]: string } = {
        'l':'Large',
        'xl':'X Large',
        's':'Small',
        'm':'Medium'
    }
    const handleAddFeedBack = async()=>{
        try{
            const data =await axios.patch(import.meta.env.VITE_API_BASE_URL+`/products/addFeedback/${id}`,JSON.stringify({
                feedback:comment,
                rate:rate
            }), { withCredentials: true });
            if(data.status){
                setData(data.data.product);
                setComments(data.data.product.feedbacks);
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
    const handleremoveFeedBack = async(feedId:string)=>{
        try{
            const data =await axios.patch(import.meta.env.VITE_API_BASE_URL+`/products/deleteFeedback/${id}?feedId=${feedId}`,{ withCredentials: true });
            if(data.status){
                setData(data.data.product);
                setComments(data.data.product.feedbacks);
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
                    const url = 'products/getShowSingleProduct/';
                    const {data}:{data:{message:string,status:boolean,product:productType|null}} = await axios.get(import.meta.env.VITE_API_BASE_URL+`/${url}${id}`,{
                        headers:{
                            'Content-Type':'multipart/form-data'
                        }
                    });
                    if(data.status){
                        if(check&&data.product){
                            setData(data.product);
                            setComments(data.product.feedbacks);
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
    <main className='m-0 p-0 flex-grow-1 row  d-flex justify-content-center align-items-start mt-3 flex-column flex-md-row'>
         {(data)?<>
            <div className='col mx-auto mb-3 row p-0 m-0 card'>
                <img className='img-fluid p-0 rounded rounded-end-0 col-6 card-img-top' style={{objectFit:'cover',objectPosition:'top center',maxHeight:'65vh'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+data?.imageUrl} alt={data?.title}/>
                <div className='card-body rounded-end-1 bg-dark d-flex justify-content-start align-items-start flex-column'>
                    <h4 className='text-primary text-capitalize text-start m-0 p-0 mb-2'>{data.title}</h4>
                    <p className='text-primary text-capitalize text-start m-0 p-0 mb-2'>{data.description}</p>
                    <div className='mb-2'>
                        <span className='me-3 text-capitalize'>price : <span className='text-primary'>{data?.price}</span> $</span>
                        <span className='text-capitalize'>stock : <span className='text-primary'>{data?.inStock}</span> peices</span>
                    </div>
                    <div className='mb-2 d-flex'>
                        <span className='d-block p-2 bg-primary rounded me-3'>{data?.category?.name}</span>
                        <span className='d-block p-2 bg-primary rounded'>{data?.company?.name}</span>
                    </div>
                    <div className='mb-2 d-flex gap-2'>
                        {
                            (data.colors).map((el:string)=>{
                                return(
                                    <span key={el} className='rounded-circle' style={{width:'20px',height:'20px',background:el}}></span>
                                )
                            })
                        }
                    </div>
                    <div className='mb-2 d-flex gap-2'>
                        {
                            Object.keys(sizes).map((el:string)=>{
                                return(
                                    <span key={el} className={`bg-${((data.sizes).includes(el))?"primary":'black'} p-2 rounded text-white`}> {sizes[el]}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='col'>
                    <div className='bg-dark rounded p-1'>
                        <p className='text-primary text-capitalize text-start fs-3'>comments</p>
                        {
                            (comments)&&((comments.length!==0)?comments.map((el:feedBackType)=>{
                                return(
                                    <div key={el?._id} className='w-100 d-flex justify-content-center align-items-start flex-column position-relative'>
                                        <div className='w-100 d-flex justify-content-start'>
                                                 <div className='d-flex justify-content-start align-items-start flex-column bg-white rounded shadow-sm p-2'>
                                                    <img className='img-fluid rounded-circle' style={{width:'80px',height:'80px',objectFit:'cover',objectPosition:'top center'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+el?.user?.image} alt={el?.user?.name}/>
                                                    <p className='text-start text-capitalize text-center p-0 m-0'>
                                                        {el?.user?.name}
                                                    </p>
                                                 </div>
                                                 <div className='flex-grow-1 d-flex justify-content-start align-items-start flex-column'>
                                                    <p className='text-start text-capitalize p-2 m-0'>
                                                        {el?.feedback}
                                                    </p>
                                                    <div className='box ps-2'>
                                                        <StarRatings
                                                            starDimension="25px"
                                                            starSpacing="2px"
                                                            starRatedColor="#fba832"
                                                            rating={el?.rate}
                                                            numberOfStars={5}
                                                            name='rating'
                                                        />
                                                    </div>
                                                 </div>
                                        </div>
                                        {(el?.user?._id.toString()===auth?.toString())&&<i className='position-absolute bi bi-trash-fill text-danger top-0 end-0 pt-1 pointer' onClick={()=>{
                                            handleremoveFeedBack(el?._id);
                                        }}></i>}
                                        <hr className='my-1 mx-0 w-100 bg-primary'/>
                                    </div>
                                );
                            }):<p className='fs-5 text-capitalize text-center text-primary'>comments is empty</p>)
                        }
                        <form onSubmit={(e)=>{
                            e.preventDefault();
                            if(!commentError){
                                handleAddFeedBack();
                            }
                        }} className='row mt-2 p-0 m-0'>
                               <div className=' input-group'>
                                    <span className="input-group-text" id="basic-addon1">feedback</span>
                                    <input value={comment} type="text" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                                        setComment(e.target.value);
                                        if(/^[\w|\s]{3,}$/.test(e.target.value)){
                                            setCommentError(null);
                                        }else{
                                            setCommentError('should be required at least 3char');
                                        }
                                    }} className='form-control' name="" id="" />
                               </div>
                               <div className='my-3 d-flex justify-content-start align-items-center'>
                                    <span className='input-group-text'>Rate Product</span>
                                     <div className='ms-2'>
                                        <StarsRating
                                            value={rate}
                                            onChange={(value:number|undefined) => {
                                                if(value){
                                                    setRate(value);
                                                }
                                            }}
                                        />
                                     </div>
                               </div>
                                <button type="submit" className='btn btn-primary'>+add</button>
                        </form>
                        {(commentError)&&<p className='invalid-feedback'>{commentError}</p>}
                    </div>
            </div>
            </>:<div className='w-100 flex-grow-1 d-flex justify-content-center align-items-center'><Loading classNamePropert=''/></div>
         }
    </main>
  )
}

export default ShowSingleProduct;