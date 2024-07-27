import React from 'react'
import Dashborad from '../Pages/Dashborad'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from '../Common/AdminHeader';
const Admin = ({handleLogout}) => {
  return (
    <BrowserRouter>
    <AdminHeader handleLogout={handleLogout}/>
        <Routes>
            <Route path="/dashborad" element={<Dashborad />} />
        </Routes>
      </BrowserRouter>
  )
}

export default Admin