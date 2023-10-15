import { useSelector } from "react-redux";
import { reducerType } from "../store/store";
import {ReactElement} from 'react'
import AnuthorizedPage from "../components/Cart/AnuthorizedPage";

const gards = function(OldComponent:() =>ReactElement){
    function NewCompnent():ReactElement{
        const auth:unknown = useSelector<reducerType>(state=>state.auth.auth);
        return(<>{((auth!==null&&auth===true))?<OldComponent/>:<AnuthorizedPage />}</>);
    }
    return NewCompnent;
}
export default gards;