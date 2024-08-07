import React from 'react'
import Card1 from "../../../assets/client/card1.png";
import Card2 from "../../../assets/client/card2.png";
import Card3 from "../../../assets/client/card3.png";
import Card4 from "../../../assets/client/card4.png";
import Card5 from "../../../assets/client/card5.png";
import Card6 from "../../../assets/client/card6.png";

function Section2() {
  return (
    <section>
          <div className='whyjoinus mb-5'>
        <h1 className='secondheading text-start mb-3'>Why Join with Us</h1>
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
    </section>
  )
}

export default Section2