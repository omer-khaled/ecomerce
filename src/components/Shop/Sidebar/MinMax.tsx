
import {ReactElement,ChangeEvent, useState, useEffect} from 'react'
import { dispatchType } from '../../../store/store';
import { useDispatch } from 'react-redux';
import shopactions from '../../../store/shop';

function MinMax():ReactElement {
    const dispatch = useDispatch<dispatchType>();
    const [min,setMin] = useState<null|number>(null);
    const [max,setMax] = useState<null|number>(null);
    useEffect(()=>{
        const handler = setTimeout(()=>{
            if(min!==null){
                dispatch(shopactions.addMin(min));
            }
        },700);
        return ()=>{
            clearTimeout(handler)
        }
    },[dispatch,min]);
    useEffect(()=>{
        const handler = setTimeout(()=>{
            if(max!==null){
                dispatch(shopactions.addMax(max));
            }
        },700);
        return ()=>{
            clearTimeout(handler)
        }
    },[dispatch,max]);
  return (
    <div className='w-100'>
       <div className="input-group mb-3">
            <span className="input-group-text">Min</span>
            <input type="number" className="form-control" step={"0.01"} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setMin(Number(e.target.value));
            }}/>
        </div>
        <div className="input-group">
            <span className="input-group-text">Max</span>
            <input type="number" className="form-control" step={"0.01"} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                console.log(Number(e.target.value));
                setMax(Number(e.target.value));
            }}/>
        </div>
    </div>
  )
}

export default MinMax;