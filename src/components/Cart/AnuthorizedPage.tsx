import {ReactElement} from 'react'
import unAuth from '../../assets/images.jpeg';
import { Link } from 'react-router-dom';
function AnuthorizedPage():ReactElement {
  return (
    <section className='w-100 d-flex flex-grow-1 justify-content-center align-items-center flex-column'>
        <img src={unAuth} alt="unAuth" className='img-fluid' />
        <h1 className='mt-2 text-danger'>401 unAuthrized</h1>
        <p className='fs-5 text-capitalize'>please firstly <Link to={'/login'} className='fs-6'>login</Link></p>
    </section>
  )
}
export default AnuthorizedPage;