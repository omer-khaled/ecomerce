import {ReactElement} from 'react';
import hero from '../../assets/hero.webp';
function Hero():ReactElement {
  return (
    <section>
        <img src={hero} alt="hero" className='img-fluid' />
    </section>
  )
}
export default Hero;