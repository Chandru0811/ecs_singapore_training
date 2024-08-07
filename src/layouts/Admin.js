import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from "../components/admin/common/AdminHeader";
import AdminFooter from "../components/admin/common/AdminFooter";
import Dashboard from "../Pages/admin/Dashboard";
import AdminHome from "../Pages/admin/AdminHome";
import AdminAbout from "../Pages/admin/AdminAbout";
import AdminLandingPage from "../Pages/admin/AdminLandingPage";
import Course from "../Pages/admin/course/Course";
import CourseStepAdd from "../Pages/admin/course/CourseStepAdd";
import AdminTestimonial from "../Pages/admin/Testimonial/AdminTestimonial";
import Category from "../Pages/admin/Categories/Category";
import CourseTestimonial from "../Pages/admin/CourseTestimonial";
import CourseVideoTestimonial from "../Pages/admin/Course Video Testimonial/CourseVideoTestimonial";
import CourseStepEdit from "../Pages/admin/course/CourseStepEdit";
import CourseView from "../Pages/admin/course/CourseView";
import Courses from "../Pages/admin/Courses";
import AdminContact from "../Pages/admin/AdminContact";
import HeaderEdit from "../Pages/admin/HeaderEdit";
import {FooterEdit} from "../Pages/admin/FooterEdit";
import { PrivacyPolicy } from "../Pages/admin/PrivacyPolicy";
import { Toaster } from "react-hot-toast";
import CompaniesHiring from "../Pages/admin/Companies Hiring/CompaniesHiring";

const Admin = ({ handleLogout }) => {
  return (
    <BrowserRouter>
      <div
        className="container-fluid p-0"
      >
         <Toaster
          toastOptions={{
            style: {
              background: "rgb(51 65 85)",
              color: "#fff",
            },
          }}
        />
        <AdminHeader handleLogout={handleLogout} />
        <div
          className=""
          style={{
            minHeight: "90vh",
          }}
        >
          <Routes>
            <Route path="/dashborad" element={<Dashboard />} />
            <Route path="/landing" element={<AdminLandingPage />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/course" element={<Course />} />
            <Route path="/courseadd" element={<CourseStepAdd />} />
            <Route path="/courseEdit" element={<CourseStepEdit />} />
            <Route path="/testimonials" element={<AdminTestimonial/>} />            
            <Route path="/categories" element={<Category />} />
            <Route path="/CourseTestimonial" element={<CourseTestimonial />} />
            <Route path="/courseView" element={<CourseView />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<AdminContact />} />
            <Route path="/headeredit" element={<HeaderEdit />} />
            <Route path="/footeredit" element={<FooterEdit />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route
              path="/CourseVideoTestimonial"
              element={<CourseVideoTestimonial />}
            />
            <Route path="/companieshiring" element={<CompaniesHiring />} />
          </Routes>
        </div>
        <AdminFooter />
      </div>
    </BrowserRouter>
  );
};

export default Admin;
