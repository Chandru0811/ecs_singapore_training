import React from 'react';
import AboutHero from '../../assets/client/about_hero_image.png';
import AboutImage from '../../assets/client/about-imgae 1.jpg'
import { FaSquareShareNodes } from "react-icons/fa6";


function ClientAbout() {
    return (
        <section>
            <div className="container-fluid mb-4">
                <div className="row about-banner">
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7 col-12">
                                    <div className="about-head">
                                        <h1 className="display-5 fw-bold">What is Courses and how valid is it?</h1>
                                        <p>The meaning of production in Carlio is the creation,
                                            development, and the path to progress, and the starting point to
                                            achieve the goals that we all have the Petroforce bran
                                            with over 20 years of experience in the oil and petrochemical industry.
                                        </p>
                                    </div>
                                    <div className="d-flex">
                                        <button className="btn enroll-btn">Enroll Now</button>
                                        <button className="btn contact-btn ms-3">Contact Us</button>
                                    </div>
                                </div>
                                <div className="col-md-5 col-12">
                                    <div>
                                        <img src={AboutHero} alt='About Hero' className="img-fluid"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="d-flex align-items-center">
                        <img src={AboutImage} alt='img' className="img-fluid">
                        </img>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="d-flex text-start">
                            <FaSquareShareNodes />
                            <p>About Us</p>
                        </div>
                        <div className="text-start">
                            <h4 className="display-6 fw-bold">Our Company Overview</h4>
                            <p>
                                Carlio brand is one of the most reliable motor oil manufacturers,
                                which is engaged in the production of high quality products with
                                a history of more than decades in the industry. In order to get
                                more information about other aspects and products of the Carlio
                                brand, you can use the following buttons:
                            </p>
                            <div className="d-flex justify-content-between">
                                <button className="btn company-btn">Company</button>
                                <button className="btn company-btn">All Courses</button>
                                <button className="btn company-btn">Our Team</button>
                            </div>
                            <hr></hr>
                            <p>
                                The meaning of production in Carlio is the creation, development,
                                and the path to progress, and the starting point to achieve the
                                goals that we all have the Petroforce brand, with over 20 years
                                of experience.
                            </p>
                            <button className="btn learn-btn">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ClientAbout;
