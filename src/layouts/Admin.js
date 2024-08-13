import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminHeader from "../components/admin/common/AdminHeader";
import AdminFooter from "../components/admin/common/AdminFooter";
import Dashboard from "../Pages/admin/Dashboard";
import AdminHome from "../Pages/admin/AdminHome";
import AdminAbout from "../Pages/admin/AdminAbout";
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
import { FooterEdit } from "../Pages/admin/FooterEdit";
import { PrivacyPolicy } from "../Pages/admin/PrivacyPolicy";
import { TermsAndCondition } from "../Pages/admin/TermsAndCondition";
import { Toaster } from "react-hot-toast";
import CompaniesHiring from "../Pages/admin/Admin Home/Companies Hiring/CompaniesHiring";
import HeroSection from "../Pages/admin/Admin Home/HeroSection";
import TrainingOverview from "../Pages/admin/Admin Home/TrainingOverview";
import TrainingPlacements from "../Pages/admin/Admin Home/TrainingPlacements";
import WhyJoinWithUs from "../Pages/admin/Admin Home/WhyJoinWithUS/WhyJoinWithUs";
import AdminAboutFaq from "../Pages/admin/AdminAboutFaq";
import AdminLandingPage1 from "../Pages/admin/Landing page/AdminLandingPage1";
import AdminLandingPage2 from "../Pages/admin/Landing page/AdminLandingPage2";

const Admin = ({ handleLogout }) => {
  return (
    <BrowserRouter>
      <div className="container-fluid p-0">
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/landingpage1" element={<AdminLandingPage1 />} />
            <Route path="/landingpage2" element={<AdminLandingPage2 />} />
            <Route path="/home" element={<AdminHome />} />
            <Route path="/about" element={<AdminAbout />} />
            <Route path="/testimonials" element={<AdminTestimonial />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/CourseTestimonial" element={<CourseTestimonial />} />
            {/* course */}
            <Route path="/course" element={<Course />} />
            <Route path="/courseadd" element={<CourseStepAdd />} />
            <Route path="/courseEdit/:id" element={<CourseStepEdit />} />
            <Route path="/courseView/:id" element={<CourseView />} />

            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<AdminContact />} />
            <Route path="/headeredit" element={<HeaderEdit />} />
            <Route path="/footeredit" element={<FooterEdit />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termsandcondition" element={<TermsAndCondition />} />
            <Route
              path="/CourseVideoTestimonial"
              element={<CourseVideoTestimonial />}
            />
            <Route path="/companieshiring" element={<CompaniesHiring />} />
            <Route path="/home/hero" element={<HeroSection />} />
            <Route path="/home/whyjoinwithus" element={<WhyJoinWithUs />} />
            <Route
              path="/home/training/overview"
              element={<TrainingOverview />}
            />
            <Route
              path="/home/training/placement"
              element={<TrainingPlacements />}
            />
            <Route path="/aboutFaq" element={<AdminAboutFaq />} />
          </Routes>
        </div>
        <AdminFooter />
      </div>
    </BrowserRouter>
  );
};

export default Admin;
