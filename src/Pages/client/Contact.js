import React from 'react';
import logo from "../../assets/client/CRMLogo.png";
import { FaRegClock } from "react-icons/fa";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

function ContactUs() {
  return (
    <section style={{ backgroundColor: "#fff" }}>
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
                  <hr className='mb-5' />
                  <div className='text-start' style={{ marginLeft: "50px" }}>
                    <h6 className='logoText fw-bold'>Design Team</h6>
                    <h2>30 Minute Meeting</h2>
                    <div className='logoText d-flex align-items-center'>
                      <FaRegClock />
                      <span className='fw-medium mx-1'>30 min</span>
                    </div>
                  </div>
                </div>
                <div className='col-md-6 col-12 py-4 text-start' style={{ borderLeft: "1px solid #c7c2ce" }}>
                  <h5 className='fw-bold mb-4'>Select a Date & Time</h5>
                  <div className='d-flex justify-content-center align-items-center'>
                    <FaCircleChevronLeft size={30} color='#118AEF' /><span className='mx-5'>August 2024</span><FaCircleChevronRight color='#118AEF' size={30} />
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