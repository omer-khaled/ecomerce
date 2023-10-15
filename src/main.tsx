import {lazy,Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/main.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store.ts';
export const Signup = lazy(()=>import('./pages/Signup.tsx'))
export const Login = lazy(()=>import('./pages/Login.tsx'))
export const ResetPassword = lazy(()=>import('./pages/ResetPassword.tsx'))
export const ChangePassword = lazy(()=>import('./pages/ChangePassword.tsx'))
export const ProductsInCategory = lazy(()=>import('./components/Home/ProductsInCategory.tsx'));
export const ProductsInCompany = lazy(()=>import('./components/Home/ProductsInCompany.tsx'));
export const Home = lazy(()=>import('./pages/Home.tsx'));
export const Shop = lazy(()=>import('./pages/Shop.tsx'));
export const App = lazy(()=>import('./App.tsx'));
export const Loading = lazy(()=>import('./components/Loading.tsx'));
export const SucessPayment = lazy(()=>import('./pages/SucessPayment.tsx'))
export const FailedPayment = lazy(()=>import('./pages/FailedPayment.tsx'))
export const Cart = lazy(()=>import('./pages/Cart.tsx'));
export const Orders = lazy(()=>import('./pages/Orders.tsx'))
export const CartOrder = lazy(()=>import('./components/Orders/CartOrder.tsx'))
export const CartOrderAdmin = lazy(()=>import('./components/Admin/CartOrder.tsx'))
export const Blogs = lazy(()=>import('./pages/Blogs.tsx'))
export const AdminPage = lazy(()=>import('./pages/AdminPage.tsx'))
export const Products = lazy(()=>import('./components/Admin/Products.tsx'))
export const Categories = lazy(()=>import('./components/Admin/Categories.tsx'))
export const Companies = lazy(()=>import('./components/Admin/Companies.tsx'))
export const OrdersAdmin = lazy(()=>import('./components/Admin/Orders.tsx'))
export const AddNewCategoryCompany = lazy(()=>import('./components/Admin/AddNewCategoryCompany.tsx'))
export const UpdateNewCategoryCompany = lazy(()=>import('./components/Admin/UpdateNewCategoryCompany.tsx'))
export const AddNewProduct = lazy(()=>import('./components/Admin/AddNewProduct.tsx'))
export const EditNewProduct = lazy(()=>import('./components/Admin/EditNewProduct.tsx'))
export const Blog = lazy(()=>import('./components/Admin/Blog.tsx'))
export const AddBlog = lazy(()=>import('./components/Admin/AddBlog.tsx'))
export const UpdateBlog = lazy(()=>import('./components/Admin/UpdateBlog.tsx'))
export const SingleBlog = lazy(()=>import('./pages/SingleBlog.tsx'))
export const ShowSingleProduct = lazy(()=>import('./pages/ShowSingleProduct.tsx'));
export const AdminHome = lazy(()=>import('./pages/AdminHome.tsx'));
const router = createBrowserRouter([
  {
    path:'/ecomerce/',
    element:<Suspense fallback={<div className='flex-grow-1'><Loading classNamePropert='loader'/></div>}><App/></Suspense>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'shop',
        element:<Shop />
      },
      {
        path:'Categories/:id',
        element:<ProductsInCategory />,
      },
      {
        path:'Companies/:id',
        element:<ProductsInCompany />
      },
      {
        path:'signup',
        element:<Signup />
      },
      {
        path:'login',
        element:<Login admin={null} />
      },
      {
        path:'resetPassword',
        element:<ResetPassword/>
      },
      {
        path:'changePassword',
        element:<ChangePassword/>
      },
      {
        path:'resetPassword',
        element:<ResetPassword/>
      },
      {
        path:'cart',
        element:<Cart/>
      },
      {
        path:'successPage',
        element:<SucessPayment />
      },
      {
        path:'failedPage',
        element:<FailedPayment />
      },
      {
        path:'orders',
        element:<Orders />
      },
      {
        path:'ordersCart/:id',
        element:<CartOrder />
      },
      {
        path:'blog',
        element:<Blogs />
      },
      {
        path:'showBlog/:id',
        element:<SingleBlog />
      },
      {
        path:'showProduct/:id',
        element:<ShowSingleProduct />
      }
    ]
  },
  {
    path:'/ecomerce/admin',
    element:<Suspense fallback={<div className='flex-grow-1'><Loading classNamePropert='loader'/></div>}><AdminPage/></Suspense>,
    children:[
      {
        index:true,
        element:<AdminHome/>
      },
      {
        path:'login',
        element:<Login admin={true}/>
      },
      {
        path:'products',
        element:<Products/>
      },
      {
        path:'categories',
        element:<Categories/>
      },
      {
        path:'blogs',
        element:<Blog/>
      },
      {
        path:'companies',
        element:<Companies/>,
      },
      {
        path:'companies/addCompany',
        element:<AddNewCategoryCompany name='company'/>
      },
      {
        path:'categories/addCategory',
        element:<AddNewCategoryCompany name='category'/>
      },
      {
        path:'blogs/addblog',
        element:<AddBlog/>
      },
      {
        path:'products/addProducts',
        element:<AddNewProduct/>
      },
      {
        path:'products/editProducts/:id',
        element:<EditNewProduct/>
      },
      {
        path:'categories/updateCategory/:id',
        element:<UpdateNewCategoryCompany name='category'/>
      },
      {
        path:'companies/updateCompany/:id',
        element:<UpdateNewCategoryCompany name='company'/>
      },
      {
        path:'blogs/updateBlog/:id',
        element:<UpdateBlog />
      },
      {
        path:'orders',
        element:<OrdersAdmin/>
      },
      {
        path:'ordersCartAdmin/:id',
        element:<CartOrderAdmin />
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)
