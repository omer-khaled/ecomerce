import { useSelector } from "react-redux";
import { reducerType } from "../store/store";
import {ReactElement} from 'react'
import Login from "../pages/Login";

const adminGards = function(OldComponent:() =>ReactElement){
    function NewCompnent():ReactElement{
        const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
        return(<>{((auth!==null&&auth===true))?<OldComponent/>:<Login admin={true} />}</>);
    }
    return NewCompnent;
}
export default adminGards;