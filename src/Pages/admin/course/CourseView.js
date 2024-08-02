import React, { useState } from 'react'
import CoursesLogo from '../../../assets/client/aws.png';

function CourseView() {

    const [courseValue, setCourseValue] = useState({
        coursesLogo: CoursesLogo,
        coursesTitle: "AWS Solution Architect Certification Training",
        coursesDescription: "Elevate Your Cloud Skills with AWS Certification",
        coursesDetail: "AWS Solution Architect Certification is essential for every aspiring AWS-certified solutions architect. You will master AWS architectural principles and services such as IAM, VPC, EC2, EBS and elevate your career to the cloud, and beyond with this AWS course.",
        coursesSyllabus: "Angular or React, Python or Java or nodeJS, Oracle or Mysql or Mongo DB",
        totalAmount: "$20938",
        discountAmount: "$19949",
        amountToPay: "$13581",
    });

    return (
        <section className="mt-1">
            <div className="container-fluid" style={{ border: "1px solid #118AEF" }}>
                <div className="row container-fluid mt-4">
                    <div className="col-md-7 col-12 d-flex flex-column align-items-start justify-content-start">
                        <div>
                            <img src={courseValue.coursesLogo} alt='logo'></img>
                        </div>
                        <div>
                            <h1 className="text-start" style={{ color: "#118AEF" }}>{courseValue.coursesTitle}</h1>
                            <p className="text-start">{courseValue.coursesDescription}</p>
                            <p className="text-start">{courseValue.coursesDetail}</p>
                        </div>
                    </div>
                    <div className="col-md-5 col-12 mb-3">
                        <div className="row ">
                            <div className="offset-1 col-10">
                            
                            <div className="container" style={{ border: "1px solid #118AEF" }}>
                                <div className="row mb-3">

                                    <div className="col-md-5 col-12 mt-2 d-flex flex-column align-items-start justify-content-start">
                                        <p>Course Syllabus :</p>
                                        <p>Total Amount :</p>
                                        <p>Discount Amount :</p>
                                        <p>Amount to pay :</p>
                                    </div>
                                    <div className="col-md-7 col-12 mt-2 d-flex flex-column align-items-start justify-content-start">
                                        <p className="text-start">{courseValue.coursesSyllabus}</p>
                                        <p className="text-start">{courseValue.totalAmount}</p>
                                        <p className="text-start">{courseValue.discountAmount}</p>
                                        <p className="text-start">{courseValue.amountToPay}</p>
                                    </div>
                                    <div className='text-start'>
                                        <button className="btn btn-primary">Enroll Now</button>
                                        <button className="btn btn-outline-primary ms-2">Download Syllabus</button>
                                    </div>
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

export default CourseView
