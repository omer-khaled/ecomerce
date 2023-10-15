import {ChangeEvent, ReactElement, useEffect, useState,useCallback} from 'react'
import Loading from '../../Loading';
import { categoryType } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { dispatchType } from '../../../store/store';
import shopactions from '../../../store/shop';
function Accordion({uri,name}:{uri:string,name:string}):ReactElement {
  const dispatch = useDispatch<dispatchType>();
  const [data,setDate] = useState<null|categoryType[]>(null);
  const [filters,setFilters] = useState<null|string[]>(null);
  const handlefilter = useCallback((filter:string)=>{
      setFilters((state)=>{
        if(state){
          if(state.includes(filter)){
            state=state.filter(item=>item!==filter);
          }else{
            state=[...state,filter];
          }
        }else{
          state = [filter];
        }
        return state;
      });
  },[]);
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
  useEffect(()=>{
    if(filters!==null){
      if(name==="Categories"){
        dispatch(shopactions.addCategories(filters));
      }else{
        dispatch(shopactions.addcompanies(filters));
      } 
    }
  },[dispatch,filters,name]);
  return (
    <div className="accordion w-100 mb-3 p-0" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+name} aria-expanded="true" aria-controls="collapseOne">
                    {name}
                </button>
                </h2>
                <div id={name} className="accordion-collapse collapse p-1" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    {
                        data?((data.length!==0)?data.map((el:categoryType)=>{
                            return(<div className="form-check" key={el?._id}>
                            <input className="form-check-input" name='category' type="checkbox" value={el?._id} id={"flexCheckDefault"+el?._id} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                              handlefilter(e.target.value);
                            }}/>
                            <label className="form-check-label" htmlFor={"flexCheckDefault"+el?._id}>
                              {el?.name}
                            </label>
                          </div>)
                        }):<p className='fs-custom text-center text-primary'>no {name} for now</p>):<Loading classNamePropert=""/>
                    }
                </div>
            </div>
    </div>
  )
}
export default Accordion;
