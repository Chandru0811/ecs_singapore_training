import React, { useState, useEffect } from 'react';
import logo from "../../assets/client/CRMLogo.png";
import { FaRegClock, FaGlobeAsia } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ContactUs() {
  const [date, setDate] = useState(new Date());
  const [singaporeTime, setSingaporeTime] = useState('');

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const currentMonth = new Date();
  const nextTwoMonths = new Date();
  nextTwoMonths.setMonth(nextTwoMonths.getMonth() + 2);

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
    const interval = setInterval(getSingaporeTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='my-5 contactUs' style={{ backgroundColor: "#fff" }}>
      <div className='container-fluid py-5'>
        <div className='row'>
          <div className='offset-2 col-8'>
            <div className='card contactCard'>
              <div className='row'>
                <div className='col-md-6 col-12 py-5'>
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
                <div className='col-md-6 col-12 py-4 text-start contactCard-right'>
                  <h5 className='fw-bold mb-4 mx-2'>Select a Date & Time</h5>
                  <div className='d-flex justify-content-center'>
                    <Calendar
                      onChange={handleDateChange}
                      value={date}
                      minDate={currentMonth}
                      maxDate={nextTwoMonths}
                      minDetail="month"
                      maxDetail="month"
                      className='mb-4'
                    />
                  </div>
                  <h5 className='fw-bold mb-2 mx-2'>Time Zone</h5>
                  <div className='mx-4 d-flex align-items-center'>
                    <FaGlobeAsia color='#515B6F' /><span className='mx-1'>Singapore Time ({singaporeTime})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs;