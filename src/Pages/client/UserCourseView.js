import React, { useState } from 'react'
import CoursesLogo from '../../assets/client/aws.png';
import { FaStar } from "react-icons/fa6";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    phoneNumber: Yup.string()
        .matches(
            /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
            "*Invalid Phone Number"
        )
        .required("*Phone Number is required"),
    email: Yup.string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "*Enter a valid email address"
        )
        .required("*Email is required"),
    message: Yup.string().required("*Message is required"),
});

function UserCourseView() {
    const [showAllSections, setShowAllSections] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Quick Enqury Data ;", values)
        },
    });

    const [courseValue, setCourseValue] = useState({
        coursesLogo: CoursesLogo,
        coursesTitle: 'AWS Solution Architect Certification Training',
        coursesDescription: 'Elevate Your Cloud Skills with AWS Certification',
        coursesDetail: 'AWS Solution Architect Certification is essential for every aspiring AWS-certified solutions architect. You will master AWS architectural principles and services such as IAM, VPC, EC2, EBS and elevate your career to the cloud, and beyond with this AWS course.',
        coursesSyllabus: 'Angular or React, Python or Java or nodeJS, Oracle or Mysql or Mongo DB',
        totalAmount: '$20938',
        discountAmount: '$19949',
        amountToPay: '$13581',
        courseDate: ['29-07-2024', '30-07-2024'],
        courseDay: ['Monday', 'Tuesday'],
        courseTiming: ['08:00 AM', '08:00 AM'],
        courseDuration: ['1 hr,30 min', '1 hr,0 min'],
        courseBenefit: 'Benefits',
        courseBenefitContent: 'The need for AWS certified professionals is increasing every year. The AWS market is expected to reach $236B by 2020 at a CAGR of 22 percent with more than 380,000 cloud computing jobs available around the world (source: Indeed). A snapshot of jobs and related salaries is mentioned below.',
        courseKeyFeatures: ['AWS solution planning', 'AWS data IO', 'AWS implementation optimization', 'AWS architecture best practice'],
        courseFaq: [
            { id: 1, faqQuestion: 'What is AWS Certification', faqAnswer: 'AWS Certification is a credential offered by Amazon Web Services that validates expertise and technical skills in using AWS services and solution.' },
            { id: 2, faqQuestion: 'Which AWS certification is right for beginners?', faqAnswer: 'AWS Certification is a credential offered by Amazon Web Services that validates expertise and technical skills in using AWS services and solution.' },
            { id: 3, faqQuestion: 'How do I prepare for an AWS certification?', faqAnswer: 'AWS Certification is a credential offered by Amazon Web Services that validates expertise and technical skills in using AWS services and solution.' },
            { id: 4, faqQuestion: 'How much does an AWS certification exam cost?', faqAnswer: 'AWS Certification is a credential offered by Amazon Web Services that validates expertise and technical skills in using AWS services and solution.' },
        ],
        courseSection: [
            { id: 1, section: 'Section -1', sectionLeason: ['Lesson 01 - Introduction', 'Lesson 02 - Code Concepts', 'Lesson 03 - Computer and Related Feature'], sectionView: 'Preview', sectionTime: ['00:59', '04:02', '06:03'] },
            { id: 2, section: 'Section -2', sectionLeason: ['Lesson 04 - Storage Services', 'Lesson 05 - VPC Networking'], sectionView: 'Preview', sectionTime: ['10:02', '16:10'] },
            { id: 3, section: 'Section -3', sectionLeason: ['Lesson 03 - Computer and Related Feature', 'Lesson 11 - Advanced Topics', 'Lesson 12 - Further Studies'], sectionView: 'Preview', sectionTime: ['22:16', '25:40', '30:10'] },
            { id: 4, section: 'Section -4', sectionLeason: ['Lesson 04 - Storage Services'], sectionView: 'Preview', sectionTime: ['32:00'] },
            { id: 5, section: 'Section -5', sectionLeason: ['Lesson 05 - VPC Networking'], sectionView: 'Preview', sectionTime: ['37:34'] },
            { id: 6, section: 'Section -6', sectionLeason: ['Lesson 06 - Database'], sectionView: 'Preview', sectionTime: ['40:01'] },
            { id: 7, section: 'Section -7', sectionLeason: ['Lesson 11 - Advanced Topics', 'Lesson 12 - Further Studies'], sectionView: 'Preview', sectionTime: ['22:30', '25:40'] },
        ],
    });

    const toggleShowAllSections = () => {
        setShowAllSections(!showAllSections);
    };

    return (
        <section className="mt-1 container-fluid">
            <div className="mb-5" style={{ border: "1px solid #118AEF" }}>
                <div className="row mt-4 mx-2">
                    <div className="col-md-7 col-12 d-flex flex-column align-items-start justify-content-start">
                        <div>
                            <img src={courseValue.coursesLogo} alt='logo' className="img-fluid"></img>
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
                                <div className="container shadow" style={{ border: "1px solid #118AEF" }}>
                                    <div className="row mb-3 ">
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
                                        <div className="d-flex align-items-center justify-content-center">
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
            <div className=" mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <h5 className="text-start">Batch Schedule for AWS Master Program</h5>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: "#118AEF", color: "white" }}>DATE</th>
                                        <th style={{ backgroundColor: "#118AEF", color: "white" }}>DAY</th>
                                        <th style={{ backgroundColor: "#118AEF", color: "white" }}>TIMING</th>
                                        <th style={{ backgroundColor: "#118AEF", color: "white" }}>DURATION</th>
                                        <th style={{ backgroundColor: "#118AEF", color: "white" }}>Fees</th>
                                    </tr>
                                </thead>
                                <tbody style={{ border: "1px solid #118AEF" }}>
                                    {courseValue.courseDate.map((date, index) => (
                                        <tr key={index}>
                                            <td style={{ borderRight: "1px solid #118AEF" }}>{date}</td>
                                            <td style={{ borderRight: "1px solid #118AEF" }}>{courseValue.courseDay[index]}</td>
                                            <td style={{ borderRight: "1px solid #118AEF" }}>{courseValue.courseTiming[index]}</td>
                                            <td style={{ borderRight: "1px solid #118AEF" }}>{courseValue.courseDuration[index]}</td>
                                            <td ><a href="#">Get Fees</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p>Can’t find a batch you’re looking for!</p>
                            <p> <a href="#" className="ms-2">Request a Batch</a></p>
                            <p> <a href="#" className="ms-2">Request a Callback</a></p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 flex-column ">
                        <div className="row text-start mb-2">
                            <h4 style={{ color: "#118AEF" }}>{courseValue.courseBenefit}</h4>
                            <p>{courseValue.courseBenefitContent}</p>
                        </div>
                        <div className="row text-start mb-2">
                            <h4 className="text start" style={{ color: "#118AEF" }}>Key Features</h4>
                            <div className="col-md-12 col-12">
                                <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
                                    {courseValue.courseKeyFeatures.map((feature, index) => (
                                        <li key={index} style={{ flex: '0 0 50%', textDecoration: 'none' }}>
                                            <FaStar style={{ color: "#118AEF" }} /> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <div className="row">
                    <div className="col-md-7 col-12 px-5 mb-4">
                        <div className="row mb-5">
                            <h5 className="text-start mb-3">AWS Certification Course FAQs</h5>
                            <div className="accordion accordion-flush" id="accordionExample">
                                {courseValue.courseFaq.map((faq, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header" id={`heading${faq.id}`}>
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${faq.id}`} aria-expanded="false" aria-controls={`flush-collapse${faq.id}`}>
                                                {faq.faqQuestion}
                                            </button>
                                        </h2>
                                        <div id={`flush-collapse${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                            <div className="accordion-body text-start">
                                                {faq.faqAnswer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex justify-content-between mb-3">
                                <h5 className="text-start mb-3">AWS Master Program Syllabus</h5>
                                <button className="btn btn-outline-primary"><LuDownload />Syllabus</button>
                            </div>
                            <div className="card" style={{ boxShadow: '1px 1px 4px 0px #118AEF' }}>
                                {courseValue.courseSection
                                    .slice(0, showAllSections ? courseValue.courseSection.length : 3)
                                    .map((section, index) => (
                                        <div className="mb-3" key={index}>
                                            <div className="card-body">
                                                <h6 className="text-start fw-bold">{section.section}</h6>
                                                <div className="row">
                                                    <div className="col-md-6 col-12 text-start">
                                                        {section.sectionLeason.map((lesson, i) => (
                                                            <div key={i}>{lesson}</div>
                                                        ))}
                                                    </div>
                                                    <div className="col-md-3 col-12" style={{ color: '#118AEF' }}>
                                                        {section.sectionView}
                                                    </div>
                                                    <div className="col-md-3 col-12" style={{ color: '#118AEF' }}>
                                                        {section.sectionTime.map((time, i) => (
                                                            <div key={i}>{time}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <hr className="mb-2" />
                                            </div>
                                        </div>
                                    ))}
                                <div className="card-body">
                                    <p style={{ color: '#118AEF', cursor: 'pointer' }} onClick={toggleShowAllSections}>
                                        {showAllSections ? 'Show Less ' : 'Show More '}
                                        {showAllSections ? <FaAngleUp /> : <FaAngleDown />}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-12">
                        <div className="card" style={{ boxShadow: "1px 1px 4px 0px #118AEF" }}>
                            <h4 className="mt-3" style={{ color: "#118AEF" }}>Quick Enquiry</h4>
                            <form onSubmit={formik.handleSubmit} className="p-4">
                                <div className='row'>
                                <div className="col-md-12 col-12 text-start">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            {...formik.getFieldProps("name")}
                                            type="text"
                                            className={`form-control  ${formik.touched.name && formik.errors.name
                                                ? "is-invalid"
                                                : ""
                                                }`}

                                        />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className="invalid-feedback">{formik.errors.name}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12 col-12 text-start">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Email<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            {...formik.getFieldProps("email")}
                                            type="email"
                                            className={`form-control  ${formik.touched.email && formik.errors.email
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="invalid-feedback">{formik.errors.email}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12 col-12 text-start">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Phone Number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            {...formik.getFieldProps("phoneNumber")}
                                            type="text"
                                            className={`form-control  ${formik.touched.phoneNumber && formik.errors.phoneNumber
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-12 col-12 text-start">
                                    <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">
                                            Message<span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            {...formik.getFieldProps("message")}
                                            type="text"
                                            className={`form-control  ${formik.touched.message && formik.errors.message
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                        />
                                        {formik.touched.message && formik.errors.message && (
                                            <div className="invalid-feedback">{formik.errors.message}</div>
                                        )}
                                    </div>
                                </div>
                                </div>
                                <div className="">
                                    <button className="btn btn-primary">SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserCourseView
