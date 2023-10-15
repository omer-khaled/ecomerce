import {ReactElement} from 'react'
import f1 from '../../assets/features/f1.png';
import f2 from '../../assets/features/f2.png';
import f3 from '../../assets/features/f3.png';
import f4 from '../../assets/features/f4.png';
import f5 from '../../assets/features/f5.png';
import f6 from '../../assets/features/f6.png';
function Features():ReactElement {
  return (
    <section className='row row-cols-2 row-cols-lg-5 row-cols-xl-6  my-5 m-0 row-cols-md-3'>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f1} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>Free Shipping</p>
            </div>
        </div>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f2} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>Online Order</p>
            </div>
        </div>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f3} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>Save Mone</p>
            </div>
        </div>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f4} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>Promotions</p>
            </div>
        </div>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f5} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>Happy Sell</p>
            </div>
        </div>
        <div className='col px-2 box mb-2'>
            <div className='rounded border-3 p-3 d-flex justify-content-center align-items-center flex-column'>
                <img src={f6} alt="feature 1" />
                <p className='text-light rounded bg-primary p-1 m-0 mt-3 fs-custom'>24/7 Support</p>
            </div>
        </div>

    </section>
  )
}
export default Features;
