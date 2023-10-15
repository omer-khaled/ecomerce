import {ReactElement} from 'react'
import Accordion from './Sidebar/Accordion';
import MinMax from './Sidebar/MinMax';

function SideBar():ReactElement {
  return (
    <div className='col-md-3 mb-2 mb-md-0 d-flex justify-content-center align-items-center flex-column m-0 px-1'>
        <Accordion uri="/category/getCategories" name="Categories" />
        <Accordion uri="/company/getCompany" name="Companies" />
        <MinMax />
    </div>
  )
}

export default SideBar;