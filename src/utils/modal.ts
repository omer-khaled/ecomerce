import Swal from "sweetalert2";

const makeModal = (check:boolean,title:string,message:string)=>{
    if(check){
        return Swal.fire({
            title:`${title} Successfully!`,
            text:message,
            icon:'success'
        });
    }else{
        return Swal.fire({
            title:`${title} Faild!`,
            text:message,
            icon:'error'
        });
    }

}
export default makeModal;