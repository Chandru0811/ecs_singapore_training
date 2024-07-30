import React, { useState } from 'react';
import Star from "../../assets/client/starimg.png";
import HomeImg from "../../assets/client/homeImg.png";
import BookImg from "../../assets/client/bookImg.png";
import Duration from "../../assets/client/durationImg.png";
import CourseDuration from "../../assets/client/nextCourseImg.png";
import Card1 from "../../assets/client/card1.png";
import Card2 from "../../assets/client/card2.png";
import Card3 from "../../assets/client/card3.png";
import Card4 from "../../assets/client/card4.png";
import Card5 from "../../assets/client/card5.png";
import Card6 from "../../assets/client/card6.png";
import Amazon from "../../assets/client/amazon.png";
import Microsoft from "../../assets/client/microsoft.png";
import Google from "../../assets/client/google.png";
import Ibm from "../../assets/client/ibm.png";
import Delloite from "../../assets/client/deloitte.png";
import Hp from "../../assets/client/hp.png";
import WellsFargo from "../../assets/client/wellsfargo.png";
import Tcs from "../../assets/client/tcs.png";
import Zoho from "../../assets/client/zoho.png";
import Hsbc from "../../assets/client/hsbc.png";
import SunIcon from "../../assets/client/pointsImg.png";
import ContactUs from "../../assets/client/phoneImg.png";
import CirclePoints from "../../assets/client/circlePoint.png";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaSave } from 'react-icons/fa'; 

function AdminHome() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const coursesData = [
    {
      title: 'Programming Languages',
      items: ['Python', 'Java', 'JavaScript', 'C++', 'Ruby'],
      icon: SunIcon,
    },
    {
      title: 'Web Development',
      items: ['Full-Stack Web Development', 'Front-End Development', 'Back-End Development'],
      icon: SunIcon,
    },
    {
      title: 'Mobile App Development',
      items: ['Android Development:', 'iOS Development', 'Cross-Platform Development'],
      icon: SunIcon,
    },
    {
      title: 'Data Science and ML',
      items: ['Android Development:', 'iOS Development', 'Cross-Platform Development'],
      icon: SunIcon,
    },
    {
      title: 'Cloud Computing and DevOps',
      items: ['Cloud Fundamentals', 'DevOps Essentials', 'AWS Certification'],
      icon: SunIcon,
    },
    {
      title: 'Cybersecurity',
      items: ['Cybersecurity Fundamentals', 'Ethical Hacking and Penetration Testing', 'Secure Coding Practices'],
      icon: SunIcon,
    },
  ];

  const pointsData = [
    'Comprehensive ECS Solutions',
    'Certified Professional',
    'Advanced Security and Compliance',
    'Expert Team',
    'Performance Optimization',
    'Certified Professional',
    'Seamless Integration and Automation',
    '24/7 Support',
  ];

  // Editing Contents
   const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState({
    heading: 'The Best Platform Enroll in your Special Courses',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    imageUrl: HomeImg, 
    subheading: 'Start Learning Today'
  });

  const validationSchema = Yup.object({
    heading: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    subheading: Yup.string().required('Required')
  });

  const handleSubmit = (values) => {
    setContent({
      heading: values.heading,
      description: values.description,
      imageUrl: content.imageUrl,
      subheading: values.subheading
    });
    setIsEditing(false);
  };


  return (
    <div className='container Home'>
      {/* Hero */}
      <div className='row'>
      <div className='col-lg-7'>
        <div className='d-flex mb-3'>
          <img src={Star} alt="homestar" style={{ width: '30px', height: '30px' }} />
          <p className='subhead ml-2'>Start Learning Today</p>
        </div>
        <div className='text-start'>
          {isEditing ? (
            <Formik
              initialValues={{ heading: content.heading, description: content.description }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className='form-group'>
                    <Field
                      as='textarea'
                      name='heading'
                      className='form-control'
                    />
                    {errors.heading && touched.heading ? <div className='text-danger'>{errors.heading}</div> : null}
                  </div>
                  <div className='form-group mt-3'>
                    <Field
                      as='textarea'
                      name='description'
                      className='form-control'
                      rows='4'
                    />
                    {errors.description && touched.description ? <div className='text-danger'>{errors.description}</div> : null}
                  </div>
                  <button type='submit' className='btn btn-success mt-3'>Save</button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <h1 className='display-4 fw-bold'>{content.heading}</h1>
              <p className='mt-4 paraContent'>{content.description}</p>
            </>
          )}
          <div className='mt-4'>
            <button className='btn btn-primary btn-lg mr-3'>Get Started</button>
            <button className='mx-2 btn btn-outline-primary btn-lg'>Learn More</button>
          </div>
        </div>
      </div>
      <div className='col-lg-5'>
        <img src={content.imageUrl} style={{ maxWidth: '100%', height: 'auto' }} alt='home illustration' />
        {isEditing && (
          <div className='form-group mt-3'>
            <label htmlFor='homeImage'>Change Image URL:</label>
            <input
              type='text'
              id='homeImage'
              className='form-control'
              placeholder='Enter new image URL'
              onBlur={(e) => setContent({ ...content, imageUrl: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className='mt-3'>
        <button className='btn btn-warning' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
      {/* Card */}
      <div className='card homeCard mb-3'>
        <div className='card-body'>
          <div className='row d-flex pt-3'>
            <div className='col-md-4 d-flex justify-content-center'>
              <img src={BookImg} alt='BookImg' style={{ width: "30px", height: "30px" }} />
              <p className='mx-2'>Learning Format
                <b>Online Bootcamp</b></p>
            </div>
            <div className='col-md-4 d-flex justify-content-center'>
              <img src={Duration} alt='DurationImg' style={{ width: "30px", height: "30px" }} />
              <p>Course Duration</p>
            </div>
            <div className='col-md-4 d-flex justify-content-center'>
              <img src={CourseDuration} alt='CourseImg' style={{ width: "30px", height: "30px" }} />
              <p className='mx-2'>Next Course Starts at
                <b>Oct 12 , 2024</b></p>
            </div>
          </div>
        </div>
      </div>
      {/* {/ Why Join Us /} */}
      <div className='whyjoinus mb-3'>
        <h1 className='secondheading text-start'>Why Join with Us</h1>
        <div className='row mb-3'>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card1} alt='cardImg1' style={{ width: "30px", height: "30px" }} />
                  <p className='pt-2 mx-2'><b>Industry’s  Expertise</b></p>
                </div>
                <p className='text-start subpara paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card2} alt='cardImg2' />
                  <p className='pt-2 mx-2'><b>Certifications</b></p>
                </div>
                <p className='text-start paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card3} alt='cardImg3' style={{ width: "30px", height: "30px" }} />
                  <p className='pt-2 mx-2'><b>Experiences</b></p>
                </div>
                <p className='text-start paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card4} alt='cardImg4' style={{ width: "30px", height: "30px" }} />
                  <p className='pt-2 mx-2'><b>Best Partners</b></p>
                </div>
                <p className='text-start paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card5} alt='cardImg5' style={{ width: "30px", height: "30px" }} />
                  <p className='pt-2 mx-2'><b>Profesional Trainers</b></p>
                </div>
                <p className='text-start paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex'>
                  <img src={Card6} alt='cardImg6' style={{ width: "30px", height: "30px" }} />
                  <p className='pt-2 mx-2'><b>Case Studies</b></p>
                </div>
                <p className='text-start paraContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {/ Top Companies Hiring /} */}
      <div className='topcompanies mb-3'>
        <h1 className='secondheading text-start'>Top Companies Hiring</h1>
        <div className='row g-2 d-flex justify-content-between mb-3'>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Amazon} alt='Amazon' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Microsoft} alt='Microsoft' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Google} alt='Google' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Ibm} alt='IBM' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Delloite} alt='Deloitte' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </div>

        <div className='row g-2 d-flex justify-content-between mb-3'>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Hp} alt='HP' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={WellsFargo} alt='Wells Fargo' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Tcs} alt='TCS' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Zoho} alt='Zoho' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
          <div className='col-6 col-md-2'>
            <div className='card'>
              <div className='card-body d-flex align-items-center justify-content-center'>
                <img src={Hsbc} alt='HSBC' style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {/ Courses /} */}
      <div className='Courses mb-3'>
        <h1 className='secondheading text-start'>10+ Courses</h1>
        <div className='row'>
          {coursesData.map((course, index) => (
            <div className='col-md-4 mb-4' key={index}>
              <div className='card' style={{ height: "250px" }}>
                <h5 className='card-header text-center'>{course.title}</h5>
                <div className='card-body'>
                  {course.items ? (
                    <ul className='list-unstyled'>
                      {course.items.map((item, i) => (
                        <li key={i} className='d-flex align-items-center mb-2'>
                          <img src={course.icon} alt='icon' style={{ width: '20px', height: '20px' }} className='mr-2' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <div className='d-flex align-items-center mb-2'>
                        <img src={course.icon} alt='cardImg' style={{ width: '30px', height: '30px' }} />
                        <p className='pt-2 mx-2'><b>{course.title}</b></p>
                      </div>
                      <p className='text-start'>{course.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {/ Training Overview /} */}
      <div className='trainingOverview mb-3'>
        <div className='row d-flex'>
          <h1 className='secondheading text-start'>Cloud Ecs Training Overview</h1>
          <div className='col-md-8'>
            <p className='text-start paraContent'>Welcome to our comprehensive Cloud ECS (Elastic Container Service) Training Program! This course is designed to equip you with the essential knowledge and skills needed to effectively manage and deploy containerized applications using ECS, one of the most powerful container orchestration services available today.</p>
          </div>
          <div className='col-md-4 card p-4'>
            <div className='row d-flex'>
              <div className='col-md-8'>
                <p>CONTACT US</p>
                <h3>1800-212-7688</h3>
                <p>Toll Free No</p>
              </div>
              <div className='col-md-4 pt-4'>
                <img src={ContactUs} alt='ContactImg' style={{ width: "50px", height: "50px" }} />
              </div>
            </div>
          </div>
        </div>
        {/* {/ Points   /} */}
        <div className="PointsSection py-4">
          <div className="points-container row">
            {pointsData.map((point, index) => (
              <div className="point-item col-md-3 mb-3" key={index}>
                <img src={CirclePoints} alt='circleImg' style={{ width: "30px", height: "30px" }} />
                <span className="mx-2 point-text">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* {/ Training and Placements /} */}
      <div className='trainingplacements mb-3'>
        <h1 className='secondheading text-start'>Cloud Ecs , Software Training and Placements in India</h1>
        <div className='row d-flex'>
          <div className="col-md-6 col-12">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Introduction about ClousEcs
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Our Features
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </div>
                </div>
              </div>
              <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Best Technologies Online training and Certificate Courses
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,                                    </div>
                </div>
              </div>
              <div className="accordion-item mb-3" style={{ paddingLeft: "10px" }}>
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Lorem Ipsum is simply dummy text of the prin....?
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body text-start paraContent">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,                                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card p-4 enquiryform'>
              <form>
                <div className='row mb-3'>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control homeInput" id="firstName" />
                  </div>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control homeInput" id="lastName" />
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control homeInput" id="email" />
                  </div>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control homeInput" id="phoneNumber" />
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-12 text-start'>
                    <label className="form-label">Message</label>
                    <textarea className="form-control homeInput"></textarea>
                  </div>
                </div>
                <div className='text-start'>
                  <button className='btn submitBtn btn-lg'>Send Message</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminHome;
