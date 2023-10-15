import {ReactElement} from 'react'
import failedPage from '../assets/failedPayment.png';
import { Link } from 'react-router-dom';
function FailedPayment():ReactElement {
  return (
    <section className='w-100 d-flex flex-grow-1 justify-content-center align-items-center flex-column'>
        <img src={failedPage} alt="unAuth" className='img-fluid'/>
        <h1 className='mt-2 text-danger'>Payment Failed</h1>
        <p className='fs-5 text-capitalize'>plz try again <Link to={'/cart'} className='fs-6 text-danger'>cart</Link></p>
  </section>
  )
}
export default FailedPayment;
