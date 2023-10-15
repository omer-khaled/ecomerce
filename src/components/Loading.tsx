import { ReactElement } from "react";
import ReactLoading from "react-loading";
function Loading({classNamePropert}:{classNamePropert:string}):ReactElement {
  return (
    <section className={`h-100 d-flex justify-content-center align-items-center ${classNamePropert}`}>
        <article>
            <ReactLoading width={'150px'} height={'150px'} type={"spokes"} color="#0d6efd"/>
        </article>
    </section>
  )   
}

export default Loading;
