import React from 'react';
import Star from "../../assets/client/starimg.png";
import HomeImg from "../../assets/client/homeImg.png";
import BookImg from "../../assets/client/bookImg.png";
import Duration from "../../assets/client/durationImg.png";
import CourseDuration from "../../assets/client/nextCourseImg.png";
import Card1 from "../../assets/client/card1.png";

function Home() {
  return (
    <div className='container py-5 Home'>
      <div className='row'>
        <div className='col-lg-7'>
          <div className='d-flex  mb-3'>
            <img src={Star} alt="homestar" style={{ width: "30px", height: "30px" }} />
            <p className='subhead ml-2'>Start Learning Today</p>
          </div>
          <div className='text-start'>
            <h1 className='display-4 fw-bold'>The Best Platform 
            Enroll in your
            Special Courses
            </h1>
            <p className='mt-4'>
              Lorem Ipsum is simply dummy text of the printing <br />
              and typesetting industry. Lorem Ipsum has been the industry's <br />
              standard dummy text ever since the 1500s, when an unknown <br />
              printer took a galley of type and scrambled it to make a type <br />
              specimen book.
            </p>
            <div className='mt-4'>
              <button className='btn btn-primary btn-lg mr-3'>Get Started</button>
              <button className='mx-2 btn btn-outline-primary btn-lg'>Learn More</button>
            </div>
          </div>
        </div>
        <div className='col-lg-5'>
          <img src={HomeImg} style={{ maxWidth: "100%", height: "auto" }} alt="home illustration" />
        </div>
      </div>
      <div className='card homeCard'>
        <div className='card-body'>
        <div className='row d-flex pt-3'>
        <div className='col-md-4 d-flex justify-content-center'>
         <img src={BookImg} alt='BookImg' style={{width:"30px",height:"30px"}}/>
         <p className='mx-2'>Learning Format
         <b>Online Bootcamp</b></p>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
         <img src={Duration} alt='DurationImg' style={{width:"30px",height:"30px"}}/>
         <p>Course Duration</p>
        </div>
        <div className='col-md-4 d-flex justify-content-center'>
         <img src={CourseDuration} alt='CourseImg' style={{width:"30px",height:"30px"}}/>
         <p className='mx-2'>Next Course Starts at
         <b>Oct 12 , 2024</b></p>
        </div>
        </div>
        </div>
      </div>
      <div className='whyjoinus'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                 <img src={Card1} alt='cardImg1'/>
                 <p>Industry’s  Expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
