import React, { useState, useEffect } from 'react';
import logo from "../../assets/client/CRMLogo.png";
import { FaRegClock, FaGlobeAsia } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaCircleArrowRight } from "react-icons/fa6";
import { BiSolidQuoteRight } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

function ContactUs() {
  const [date, setDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [singaporeTime, setSingaporeTime] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    generateTimeSlots(newDate);
  };

  const generateTimeSlots = (selectedDate) => {
    const startHour = 11; // 11 AM
    const endHour = 18; // 6 PM
    const slots = [];
  
    for (let hour = startHour; hour <= endHour; hour++) { // Change < to <=
      const time = new Date(selectedDate);
      time.setHours(hour, 0, 0);
      slots.push(time);
    }
  
    setTimeSlots(slots);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const getSingaporeTime = () => {
    const singaporeTimeZone = 'Asia/Singapore';
    const options = {
      timeZone: singaporeTimeZone,
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    setSingaporeTime(time);
  };

  useEffect(() => {
    getSingaporeTime();
    const interval = setInterval(getSingaporeTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    email: Yup.string()
      .email("*Invalid Email Address")
      .required("*Email is required"),
    phoneNumbar: Yup.string().required("*Phone Number is required")
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumbar: "",
      message: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Contact Data:", values);
    },
  });

  // Calculate the max date to show in the calendar
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, 0); // End of the third month from now

  // Dynamically adjust column classes based on whether a date is selected
  const leftColumnClass = date ? 'col-md-4 col-12' : 'col-md-6 col-12';
  const rightColumnClass = date ? 'col-md-8 col-12' : 'col-md-6 col-12';

  // Helper function to check if the selected date is a weekend
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  // Function to disable Saturday and Sunday
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      return isWeekend(date);
    }
    return false;
  };

  return (
    <section className='mt-5 contactUs'>
      <div className='container-fluid py-5'>
        <div className='row'>
          <div className='offset-lg-1 col-lg-10 col-12'>
            <div className='card contactCard'>
              <div className='row'>
                <div className={leftColumnClass + ' py-5'}>
                  <div className='d-flex align-items-center justify-content-center mb-5'>
                    <img
                      src={logo}
                      height="70"
                      className="d-inline-block align-top"
                      alt="ECS Training"
                    />
                    <div className='logoText mt-2'>
                      <h2 className='mb-0 fw-bold'>ECS</h2>
                      <h6 className='fw-bold'>Training</h6>
                    </div>
                  </div>
                  <hr className='mb-4' />
                  <div className='text-start' style={{ marginLeft: "50px" }}>
                    <h6 className='logoText fw-bold'>Design Team</h6>
                    <h2>30 Minute Meeting</h2>
                    <div className='logoText d-flex align-items-center'>
                      <FaRegClock />
                      <span className='fw-medium mx-1'>30 min</span>
                    </div>
                  </div>
                </div>
                <div className={rightColumnClass + ' py-4 text-start contactCard-right'}>
                  <h5 className='fw-bold mb-4 mx-2'>Select a Date & Time</h5>
                  <div className='row justify-content-center'>
                    <div className={date ? 'col-md-6' : 'col-md-12'}>
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                        minDate={today}
                        maxDate={maxDate}
                        minDetail="month"
                        maxDetail="month"
                        tileDisabled={tileDisabled}
                        className='mb-4'
                      />
                      <h5 className='fw-bold mb-3 mx-2'>Time Zone</h5>
                      <div className='mx-4 d-flex align-items-center'>
                        <FaGlobeAsia color='#515B6F' /><span className='mx-1'>Singapore Time ({singaporeTime})</span>
                      </div>
                    </div>
                    {date && !isWeekend(date) && (
                      <div className='col-md-4'>
                        <h5 className='fw-bold mb-4 mx-2'>Select a Time Slot</h5>
                        <div className="time-slots">
                          {timeSlots.map((time, index) => (
                            <button
                              key={index}
                              className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                              onClick={() => handleTimeSlotClick(time)}
                            >
                              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container py-5' style={{ overflowX: "hidden" }}>
        <div className='row'>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <FiPhoneCall color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Phone</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>+65 8894 1306</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="tel:8608163189"><FaCircleArrowRight /></a>
            </div>
          </div>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <IoMailOpenOutline color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Email</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>info@ecscloudinfotech.com</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="mailto:info@ecscloudinfotech.com" target="_blank"><FaCircleArrowRight /></a>
            </div>
          </div>
          <div className='col-lg-6 col-xl-4 col-12'>
            <div className='card contactDetails p-4'>
              <div className='row'>
                <div className='col-lg-3 col-12 d-flex justify-content-center align-items-center'>
                  <LuMapPin color='#e41111' size={60} />
                </div>
                <div className='col-lg-9 col-12'>
                  <h3 className='text-start fw-bold'>Location</h3>
                  <hr className='my-4' />
                  <p className='text-start fw-medium paraText'>The Alexcier, 237 Alexandra Road, #04-10, Singapore-159929.</p>
                </div>
              </div>
            </div>
            <div className='arrow-icon mb-5'>
              <a href="https://maps.app.goo.gl/Y4UnULL1Gs7nAGRS8" target="_blank"><FaCircleArrowRight /></a>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid contactDetails1'>
        <div className='container py-5'>
          <div className='row py-5'>
            <div className='col-lg-6 col-12'>
              <form onSubmit={formik.handleSubmit}>
                <div className='card text-start p-5' style={{ border: "none", borderRadius: "30px" }}>
                  <h3 className='fw-bold mb-5'>We Are Ready To Help You</h3>
                  <div className='mb-3'>
                    <label className='form-label'>First Name<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Last Name<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="invalid-feedback">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Email<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Phone Number<span className='text-danger'>*</span></label>
                    <input type='text'
                      className={`form-control ${formik.touched.phoneNumbar && formik.errors.phoneNumbar
                        ? "is-invalid"
                        : ""
                        }`}
                      {...formik.getFieldProps("phoneNumbar")}
                    />
                    {formik.touched.phoneNumbar && formik.errors.phoneNumbar && (
                      <div className="invalid-feedback">
                        {formik.errors.phoneNumbar}
                      </div>
                    )}
                  </div>
                  <div className='mb-4'>
                    <label className='form-label'>Message</label>
                    <textarea className='form-control' rows={5}
                      {...formik.getFieldProps("message")}
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <button type='submit' className='btn btn-danger py-2' style={{ width: "100%" }}>Send</button>
                  </div>
                </div>
              </form>
            </div>
            <div className='col-lg-6 col-12 text-start mt-5 px-5'>
              <h1 className='fw-bold mb-3'>Get in Touch with Us for Your Pallet Shuttle Needs</h1>
              <p className='fw-medium paraText mb-4'>Our Cloud ECS Training System operates with precision and speed, effortlessly handling the movement and storage of pallets within your warehouse.</p>
              <div className='d-flex align-items-center justify-content-center mb-4' style={{ marginLeft: "1.25rem" }}>
                <span> <BiSolidQuoteRight size={70} color='#e41111' /></span>
                <h5 className='fw-bold' style={{ marginLeft: "0.5rem" }}>Streamline Your Warehouse Operations with Cloud ECS Training!</h5>
              </div>
              <div className='card' style={{ borderRadius: "30px" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8044732252415!2d103.81118677348974!3d1.2916846617631323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1bb95520771b%3A0xf2b9dfa378aa9a6e!2sThe%20Alexcier!5e0!3m2!1sen!2sin!4v1722418479744!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ borderRadius: "30px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs;