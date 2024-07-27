import React from 'react'
import Dashborad from '../Pages/Dashborad'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from '../components/admin/common/AdminHeader';
import AdminFooter from '../components/admin/common/AdminFooter';
const Admin = ({handleLogout}) => {
  return (
    <BrowserRouter> 
    <div className='container-fluid p-0'>
    <AdminHeader handleLogout={handleLogout}/>
    <div className='mt-2' style={{minHeight:"90vh"}}>
        <Routes>
            <Route path="/dashborad" element={<Dashborad />} />
        </Routes>
        </div>
        <AdminFooter />
        </div>
      </BrowserRouter>
  )
}

export default Admin