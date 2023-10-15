import {ReactElement} from 'react'

function Footer():ReactElement {
  return (
    <footer className="bg-light text-center text-white">
  <div className="container p-4 pb-0">
    <section className="mb-4">
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor:'#55acee'}}
        href="#!"
        role="button"
        ><i className="bi bi-twitter"></i>
        </a>
      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor:'#dd4b39'}}
        href="#!"
        role="button"
        ><i className="bi bi-google"></i>
        </a>

      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor:'#ac2bac'}}
        href="#!"
        role="button"
        ><i className="bi bi-instagram"></i>
        </a>

      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor:'#0082ca'}}
        href="#!"
        role="button"
        ><i className="bi bi-linkedin"></i>
        </a>

      <a
        className="btn text-white btn-floating m-1"
        style={{backgroundColor:'#333333'}}
        href="#!"
        role="button"
        ><i className="bi bi-github"></i>
        </a>
    </section>
  </div>

  <div className="text-center p-3 text-primary" style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
    © 2023 Copyright :
     <a className="text-white" href="https://omer-khaled.github.io/OmerKhaled/"> omer khaled</a>
  </div>

    </footer>
  )
}

export default Footer;