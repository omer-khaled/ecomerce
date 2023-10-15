import {ReactElement} from 'react'

function Banner():ReactElement {
  return (
    <section id="banner" className="d-flex justify-content-center align-items-center flex-column text-light">
        <h4>Repair Services</h4>
        <h2 className='mt-2'>Up to <span>70% Off</span> - All t-shirts &amp; Accessories</h2>
        <button className="normal mt-2">Explore More</button>
    </section>
  )
}

export default Banner;