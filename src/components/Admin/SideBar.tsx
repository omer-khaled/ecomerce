import {ReactElement} from 'react'
import { NavLink } from 'react-router-dom';

function SideBar():ReactElement {
  return (
    <aside className='h-100 col-2 bg-info box p-2 position-absolute left-0 top-0 shadow-lg d-flex flex-column'>
      <h2 className='fs-5 fw-bold text-primary text-capitalize text-center'>admin dashboard</h2>
      <div className='bg-info box p-2 overflow-auto'>
        <div className='h-80 fs-6 box py-3 overflow-auto'>
        <NavLink end to={"/admin"} className={({isActive}:{isActive:boolean})=>{
            return (isActive)?'activenav text-decoration-none':'text-decoration-none';
        }}>
            <div className='admin-button-hover  w-100 d-flex justify-content-start align-items-center rounded  px-3 py-2 '>
              <i className="bi bi-house-fill me-4"></i>
              <span>Home</span>
            </div>
        </NavLink>
          <NavLink to={"/admin/products"} className={({isActive}:{isActive:boolean})=>{
              return (isActive)?'activenav text-decoration-none':'text-decoration-none';
          }}>
            <div className='admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2'>
              <i className="bi bi-cart4 me-4"></i>
              <span>Products</span>
            </div>
          </NavLink>
          <NavLink to={"/admin/categories"} className={({isActive}:{isActive:boolean})=>{
              return (isActive)?'activenav text-decoration-none':'text-decoration-none';
          }}>
            <div className='admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2'>
              <i className="bi bi-tags-fill me-4"></i>
              <span>Categories</span>
            </div>
          </NavLink>
          <NavLink to={"/admin/companies"} className={({isActive}:{isActive:boolean})=>{
              return (isActive)?'activenav text-decoration-none':'text-decoration-none';
          }}>
            <div className='admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2'>
              <i className="bi bi-building me-4"></i>
              <span>Companies</span>
            </div>
          </NavLink>
          <NavLink to={"/admin/blogs"} className={({isActive}:{isActive:boolean})=>{
              return (isActive)?'activenav text-decoration-none':'text-decoration-none';
          }}>
            <div className='admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2'>
              <i className="bi bi-building me-4"></i>
              <span>Blogs</span>
            </div>
          </NavLink>
          <NavLink to={"/admin/orders"} className={({isActive}:{isActive:boolean})=>{
              return (isActive)?'activenav text-decoration-none':'text-decoration-none';
          }}>
            <div className='admin-button-hover w-100 d-flex justify-content-start align-items-center rounded mt-3  px-3 py-2'>
              <i className="bi bi-menu-button-wide-fill me-4"></i>
              <span>Orders</span>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default SideBar;
