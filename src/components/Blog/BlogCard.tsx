import {ReactElement} from 'react'
import { blogType } from '../../types/types';
import { Link } from 'react-router-dom';
function BlogCard({blog}:{blog:blogType}):ReactElement {
  return (
    <div key={blog._id} className='col box mb-2'>
            <div className="card position-relative">
                <img className='img-fluid rounded' style={{height:'250px',objectFit:'cover',objectPosition:'top center'}}  src={import.meta.env.VITE_API_BASE_URL+"/images/"+blog?.image} alt={blog?.title}/>
                <div className="card-body">
                    <h5 className="card-title w-100 text-primary">{blog?.title}</h5>
                    <p className="card-text w-100">{blog?.sumary}</p>
                    <Link to={`/showBlog/${blog?._id}`}>read more...</Link>
                </div> 
            </div>
    </div>
  )
}

export default BlogCard;