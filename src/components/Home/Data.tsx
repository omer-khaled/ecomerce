import {ReactElement,useEffect,useState} from 'react'
import Loading from '../Loading';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { categoryType } from '../../types/types';
import { Link } from 'react-router-dom';

function Data({uri,name}:{uri:string,name:string}):ReactElement {
  const [data,setDate] = useState<null|categoryType[]>(null);
  useEffect(()=>{
    let check = true;
    (async function fetchCategory() {        
        const ApiData = await(await fetch(import.meta.env.VITE_API_BASE_URL+uri,{method:'GET',headers:{'Content-Type':'application/json'}})).json();
        if(check){
            setDate((name==='Categories')?ApiData.categories:ApiData.companies);
        }
    })()
    return ()=>{
        // race condition
        check=false;
    }
  },[setDate,uri,name]);
  return (
    <section className='my-5 mx-0 g-2'>
        <h3 className='mb-4 line position-relative fs-3'>Explore <span className='text-primary'>{name}</span></h3>
        {
            (data)?((data.length===0)?<p className='text-center fs-1'>No <span className='text-primary'>{name}</span> For Now</p>:<Swiper
            breakpoints={{
                0: {
                    slidesPerView: 2,
                    spaceBetween:10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween:20
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween:25
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween:30
                },
            }}
          > 
            {
                data.map((el:categoryType)=>{
                    return(
                        <SwiperSlide className='pointer' key={el?._id}>
                            <div className="card border-0 bg-info p-2 ">
                                <img className='img-fluid' src={import.meta.env.VITE_API_BASE_URL+"/images/"+el?.image} alt={el?.name}/>
                                <div className="card-body p-0 m-0">
                                    <h5 className="text-center mt-3 primary">{el?.name}</h5>
                                </div>
                                <Link to={`/${name}/${el?._id}`} className='btn btn-primary'>more...</Link>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
          </Swiper>):<Loading  classNamePropert=""/>
        }
    </section>
  )
}

export default Data;