import {ReactElement} from 'react'
import sucessPage from '../assets/sucesspage.png';
import { Link } from 'react-router-dom';
function SucessPayment():ReactElement {
  return (
    <section className='w-100 d-flex flex-grow-1 justify-content-center align-items-center flex-column'>
        <img src={sucessPage} alt="unAuth" className='img-fluid'/>
        <h1 className='mt-2 text-primary'>Payment Successfully</h1>
        <p className='fs-5 text-capitalize'>Thank You <Link to={'/shop'} className='fs-6'>shop</Link></p>
  </section>
  )
}
export default SucessPayment;