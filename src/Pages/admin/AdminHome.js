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
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from 'react-bootstrap';
import { IoIosCloseCircleOutline } from "react-icons/io";

function AdminHome() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
  // const [editingCard, setEditingCard] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ img: '', text: '', para: '' });
  const [newCompanyLogo, setNewCompanyLogo] = useState();
  const [loading, setLoading] = useState(false);

  //Form Validation
  const validationSchema = Yup.object({
    firstName: Yup.string().required("*First Name is required"),
    lastName: Yup.string().required("*Last Name is required"),
    email: Yup.string()
      .email("*Invalid Email Address")
      .required("*Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "*Must be a Number")
      .min(8, "*Invalid Phone Number")
      .max(10, "*Invalid Phone Number")
      .required("*Phone Number is required")
  });

  const formikContact = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Contact Details:", values);
    },
  });

  const formik = useFormik({
    initialValues: {
      heading: 'The Best Platform Enroll in your Special Courses',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      heroImg: HomeImg,
      herocardImg1: BookImg,
      herocardImg2: Duration,
      herocardImg3: CourseDuration,
      herocardText1: 'Learning Format Online Bootcamp',
      herocardText2: 'Course Duration',
      herocardText3: 'Next Course Starts at October 12, 2024',
      trainingOverviewPara: 'Welcome to our comprehensive Cloud ECS (Elastic Container Service) Training Program! This course is designed to equip you with the essential knowledge and skills needed to effectively manage and deploy containerized applications using ECS, one of the most powerful container orchestration services available today.',
      contactNumber: '1800-212-7688',
      //   {
      //     id: 1,
      //     icon: SunIcon,
      //     courseTitle: "Programming Languages",
      //     description: [
      //       "Python",
      //       "Java",
      //       "Java Script",
      //       "C++",
      //       "Ruby"
      //     ],
      //   },
      //   {
      //     id: 2,
      //     icon: SunIcon,
      //     courseTitle: "Web Development",
      //     description: [
      //       "Full-Stack Web Development",
      //       "Front-End Development",
      //       "Back-End Development"
      //     ],
      //   },
      //   {
      //     id: 3,
      //     icon: SunIcon,
      //     courseTitle: "Mobile App Development",
      //     description: [
      //       "Android Development",
      //       "iOS Development",
      //       "Cross-Platform Development"
      //     ],
      //   },
      //   {
      //     id: 4,
      //     icon: SunIcon,          
      //     courseTitle: "Data Science and ML",
      //     description: [
      //       "Data Science with Python",
      //       "Machine Learning",
      //       "Data Engineering"
      //     ],
      //   },
      //   {
      //     id: 5,
      //     icon: SunIcon,
      //     courseTitle: "Cloud Computing and DevOps",
      //     description: [
      //       "Cloud Fundamentals",
      //       "DevOps Essentials",
      //       "AWS Certification"
      //     ],
      //   },
      //   {
      //     id: 6,

      //     courseTitle: "Cybersecurity",
      //     description: [
      //       "Cybersecurity Fundamentals",
      //       "Ethical Hacking and Penetration Testing",
      //       "Secure Coding Practices"
      //     ],
      //   },
      // ],
      aboutAccordion: [
        {
          id: 1,
          accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
          accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          description: []
        },
        {
          id: 2,
          accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
          accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          description: []
        },
        {
          id: 3,
          accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
          accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          description: []
        },
        {
          id: 4,
          accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
          accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          description: []
        },
        {
          id: 5,
          accordionQuestion: "Lorem Ipsum is simply dummy text of the printing and typesetting industry?",
          accordionAnswer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          description: []
        },
      ],
      whyjoinCards: [
        {
          id: 1,
          featurecardImg: Card1,
          featurecardText: 'Industry’s  Expertise',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        },
        {
          id: 2,
          featurecardImg: Card2,
          featurecardText: 'Certifications',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        },
        {
          id: 3,
          featurecardImg: Card3,
          featurecardText: 'Experiences',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        },
        {
          id: 4,
          featurecardImg: Card4,
          featurecardText: 'Best Partners',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        },
        {
          id: 5,
          featurecardImg: Card5,
          featurecardText: 'Profesional Trainers',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        },
        {
          id: 6,
          featurecardImg: Card6,
          featurecardText: 'Case Studies',
          featurecardPara: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
          description: []
        }
      ],
      companiesLogo: [
        {
          id: 1,
          companyLogoImg: Amazon
        },
        {
          id: 2,
          companyLogoImg: Microsoft
        },
        {
          id: 3,
          companyLogoImg: Google
        },
        {
          id: 4,
          companyLogoImg: Ibm
        },
        {
          id: 5,
          companyLogoImg: Delloite
        },
        {
          id: 6,
          companyLogoImg: Hp
        },
        {
          id: 7,
          companyLogoImg: WellsFargo
        },
        {
          id: 8,
          companyLogoImg: Tcs
        },
        {
          id: 9,
          companyLogoImg: Zoho
        },
        {
          id: 10,
          companyLogoImg: Hsbc
        },
      ],
      coursesData: [
        {
          id: 1,
          title: 'Programming Languages',
          items: ['Python', 'Java', 'JavaScript', 'C++', 'Ruby'],
        },
        {
          id: 2,
          title: 'Web Development',
          items: ['Full-Stack Web Development', 'Front-End Development', 'Back-End Development'],
        },
        {
          id: 3,
          title: 'Mobile App Development',
          items: ['Android Development:', 'iOS Development', 'Cross-Platform Development'],
        },
        {
          id: 4,
          title: 'Data Science and ML',
          items: ['Android Development:', 'iOS Development', 'Cross-Platform Development'],
        },
        {
          id: 5,
          title: 'Cloud Computing and DevOps',
          items: ['Cloud Fundamentals', 'DevOps Essentials', 'AWS Certification'],
        },
        {
          id: 6,
          title: 'Cybersecurity',
          items: ['Cybersecurity Fundamentals', 'Ethical Hacking and Penetration Testing', 'Secure Coding Practices'],
        },
      ],
      pointsData: [
        {
          id: 1,
          pointText: 'Comprehensive ECS Solutions',
        },
        {
          id: 2,
          pointText: 'Certified Professional',
        },
        {
          id: 3,
          pointText: 'Advanced Security and Compliance',
        },
        {
          id: 4,
          pointText: 'Expert Team',
        },
        {
          id: 5,
          pointText: 'Performance Optimization',
        },
        {
          id: 6,
          pointText: 'Certified Professional',
        },
        {
          id: 7,
          pointText: 'Seamless Integration and Automation',
        },
        {
          id: 8,
          pointText: '24/7 Support',
        }
      ]
    },
    onSubmit: (values) => {
      console.log("Home Datas", values);
      setIsEditing(null);
    },
  })
  const handleEditClick = (field) => {
    setIsEditing(field);
  };

  const handleSaveClick = () => {
    formik.handleSubmit();
  };

  const handleCancel = () => {
    setIsEditing(null);
    formik.resetForm();
  };

  const handleCardImageUpload = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue(name, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  //Training Overview Points
  const [newPoint, setNewPoint] = useState('');
  const [showPointsModal, setShowPointsModal] = useState(false);

  const handleOpenModalPoints = () => setShowPointsModal(true);
  const handleClosePointsModal = () => setShowPointsModal(false);

  const handleAddPoint = () => {
    formik.setFieldValue('pointsData', [
      ...formik.values.pointsData,
      { id: formik.values.pointsData.length + 1, pointText: newPoint },
    ]);
    setNewPoint('');
    handleClosePointsModal();
    console.log("Updated Formik values:", formik.values);
  };

  const handleChangeNewPoint = (e) => setNewPoint(e.target.value);
  console.log("New Points:", formik.values);

  //Why Join us 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCardUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the corresponding featurecardImg field
        const updatedCards = formik.values.whyjoinCards.map((card) =>
          card.id === isEditing ? { ...card, featurecardImg: reader.result } : card
        );
        // formik.setFieldValue("whyjoinCards", updatedCards);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalSubmit = () => {
    formik.setFieldValue('whyjoinCards', [
      ...formik.values.whyjoinCards,
      { ...newCard, id: formik.values.whyjoinCards.length + 1 },
    ]);
    setIsModalVisible(false);
    setNewCard({ featurecardImg: '', featurecardText: '', featurecardPara: '' });
    console.log("Updated Formik values:", formik.values);
  };

  //Companies Logo
  const [isModalImage, setIsModalImage] = useState(false);
  const handleCompanyLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the corresponding featurecardImg field
        const updatedCards = formik.values.companiesLogo.map((logo) =>
          logo.id === isEditing ? { ...logo, companyLogoImg: reader.result } : logo
        );
        formik.setFieldValue("companiesLogo", updatedCards);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyLogoSubmit = () => {
    formik.setFieldValue('companiesLogo', [
      ...formik.values.companiesLogo,
      { ...newCompanyLogo, id: formik.values.companiesLogo.length + 1 },
    ]);
    setIsModalImage(false);
    setNewCompanyLogo({ companyLogoImg: '' });
    console.log("Updated Formik values:", formik.values);
    formik.handleSubmit();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('heroImg', reader.result);
        console.log("Updated Formik values:", formik.values);
      };
      reader.readAsDataURL(file);
    }
  };

  // Accordation edit
  const [editingIndex, setEditingIndex] = useState(null);
  const handleDescriptionChange = (e, accordionIndex, descIndex) => {
    const { value } = e.target;
    const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
      if (i === accordionIndex) {
        return {
          ...accordion,
          description: accordion.description.map((desc, j) =>
            j === descIndex ? value : desc
          ),
        };
      }
      return accordion;
    });
    formik.setFieldValue("aboutAccordion", newAboutAccordion);
  };

  const handleAddDescription = (accordionIndex) => {
    const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
      if (i === accordionIndex) {
        return {
          ...accordion,
          description: [...accordion.description, ""],
        };
      }
      return accordion;
    });
    formik.setFieldValue("aboutAccordion", newAboutAccordion);
    console.log("Updated Formik values:", formik.values);
  };

  const handleDeleteDescription = (accordionIndex, descIndex) => {
    const newAboutAccordion = formik.values.aboutAccordion.map((accordion, i) => {
      if (i === accordionIndex) {
        return {
          ...accordion,
          description: accordion.description.filter((_, j) => j !== descIndex),
        };
      }
      return accordion;
    });
    formik.setFieldValue("aboutAccordion", newAboutAccordion);
  };

  const handleAddAccordion = () => {
    handleShow();
  };

  const handleSaveNewAccordion = () => {
    const newAccordionItem = {
      id: formik.values.aboutAccordion.length + 1,
      ...newAccordion,
      description: []
    };
    formik.setFieldValue("aboutAccordion", [...formik.values.aboutAccordion, newAccordionItem]);
    handleClose();
  };

  const handleChangeNewAccordion = (e) => {
    const { name, value } = e.target;
    setNewAccordion(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRemoveAccordion = (index) => {
    const newAboutAccordion = formik.values.aboutAccordion.filter((_, i) => i !== index);
    formik.setFieldValue("aboutAccordion", newAboutAccordion);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [newAccordion, setNewAccordion] = useState({ accordionQuestion: '', accordionAnswer: '' });

  const [newCourse, setNewCourse] = useState({ courseTitle: "", description: [""] });
  const [showModal, setShowModal] = useState(false);
  const handleAddCourse = () => {
    setNewCourse({ courseTitle: '', description: [''] });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditCourse = (index) => {
    setNewCourse(formik.values.coursesData[index]);
    setIsEditing(index);
    setShowModal(true);
  };

  const handleDeleteCourse = (index) => {
    formik.setFieldValue('coursesData', formik.values.coursesData.filter((_, i) => i !== index));
  };

  const handleChangeNewCourse = (e) => {
    setNewCourse({ ...newCourse, courseTitle: e.target.value });
  };

  const handlePointsChange = (e, index) => {
    const updatedDescription = newCourse.description.map((desc, i) =>
      i === index ? e.target.value : desc
    );
    setNewCourse({ ...newCourse, description: updatedDescription });
  };

  const handleDeletePoints = (index) => {
    setNewCourse({ ...newCourse, description: newCourse.description.filter((_, i) => i !== index) });
  };

  const handleAddPoints = () => {
    setNewCourse({ ...newCourse, description: [...newCourse.description, ''] });
  };

  const handleSaveCourse = () => {
    if (isEditing !== false) {
      const updatedCourses = formik.values.coursesData.map((course, index) =>
        index === isEditing ? { ...course, title: newCourse.courseTitle, items: newCourse.description } : course
      );
      formik.setFieldValue('coursesData', updatedCourses);
    } else {
      formik.setFieldValue('coursesData', [
        ...formik.values.coursesData,
        { id: formik.values.coursesData.length + 1, title: newCourse.courseTitle, items: newCourse.description },
      ]);
    }
    formik.handleSubmit();
  };

  return (
  <> 
  
   {loading ? (
      <div className="loader-container">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    ) : (
      <div>
        <div className=" container-fluid d-flex justify-content-between p-2 bg-light">
        <h3 className="fw-bold">Home</h3>
          <button className="btn btn-sm btn-danger">Publish</button>
      </div>
    <div className='container Home'>
      <form onSubmit={formik.handleSubmit}>
        {/* Hero */}
        <div className='container-fluid row mt-3'>
          <div className='col-lg-7'>
            <div className='d-flex mb-3'>
              <img src={Star} alt="homestar" style={{ width: "30px", height: "30px" }} />
              <p className='subhead ml-2'>Start Learning Today</p>
            </div>
            {isEditing === 'heading' ? (
              <div className='d-flex flex-column'>
                <input
                  type="text"
                  name="heading"
                  value={formik.values.heading}
                  onChange={formik.handleChange}
                  className="form-control mb-2"
                />
                <div className="d-flex justify-content-end">
                  <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                  <FaTimes onClick={handleCancel} className="text-secondary" />
                </div>
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <h1 className="display-5 text-start fw-bold">{formik.values.heading}</h1>
                <FaEdit onClick={() => handleEditClick('heading')} className="text-secondary ms-3" style={{ width: "30px", height: "30px" }} />
              </div>
            )}

            {isEditing === 'description' ? (
              <div className='d-flex flex-column'>
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="form-control mb-2"
                />
                <div className="d-flex justify-content-end">
                  <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                  <FaTimes onClick={handleCancel} className="text-secondary" />
                </div>
              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <p className='text-start'>{formik.values.description}</p>
                <FaEdit onClick={() => handleEditClick('description')} className="text-secondary ms-3" style={{ width: "30px", height: "30px" }} />
              </div>
            )}
            <div className='mt-4 text-start'>
              <button type="button" className='btn btn-primary btn-lg me-3'>Get Started</button>
              <button type="button" className='btn btn-outline-primary btn-lg'>Learn More</button>
            </div>
          </div>
          <div className='col-lg-5'>
            {isEditing === 'heroImg' ? (
              <div className='d-flex flex-column'>
                <input
                  type="file"
                  name="heroImg"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control mb-2"
                />
                <div className="d-flex justify-content-end">
                  <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                  <FaTimes onClick={handleCancel} className="text-secondary" />
                </div>
              </div>
            ) : (
              <div className='d-flex flex-column align-items-center'>
                <img src={formik.values.heroImg} style={{ maxWidth: "100%", height: "auto" }} alt="home illustration" />
                <FaEdit onClick={() => handleEditClick('heroImg')} className="text-secondary mt-2" />
              </div>
            )}
          </div>
        </div>
        {/* Card */}
        <div className='card homeCard mb-5'>
          <div className='card-body'>
            <div className='row d-flex pt-3'>
              <div className='col-md-4 d-flex justify-content-center'>
                {isEditing === 1 ? (
                  <>
                    <div className="d-flex justify-content-center mb-2">
                      <FaSave onClick={handleSaveClick} className="text-secondary" />
                      <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                    </div>
                    <div>
                      <input
                        type="file"
                        name="herocardImg1"
                        accept="image/*"
                        onChange={handleCardImageUpload}
                      />
                      <textarea
                        name="herocardText1"
                        value={formik.values.herocardText1}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <FaEdit onClick={() => handleEditClick(1)} className="text-secondary mx-2" />
                    <img src={formik.values.herocardImg1} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                    <p className='mx-2'>{formik.values.herocardText1}</p>
                  </>
                )}
              </div>
              <div className='col-md-4 d-flex justify-content-center'>
                {isEditing === 2 ? (
                  <>
                    <div className="d-flex justify-content-center mb-2">
                      <FaSave onClick={handleSaveClick} className="text-secondary" />
                      <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                    </div>
                    <div>
                      <input
                        type="file"
                        name="herocardImg2"
                        accept="image/*"
                        onChange={handleCardImageUpload}
                      />
                      <textarea
                        name="herocardText2"
                        value={formik.values.herocardText2}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <FaEdit onClick={() => handleEditClick(2)} className="text-secondary mx-2" />
                    <img src={formik.values.herocardImg2} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                    <p className='mx-2'>{formik.values.herocardText2}</p>
                  </>
                )}
              </div>
              <div className='col-md-4 d-flex justify-content-center'>
                {isEditing === 3 ? (
                  <>
                    <div className="d-flex justify-content-center mb-2">
                      <FaSave onClick={handleSaveClick} className="text-secondary" />
                      <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                    </div>
                    <div>
                      <input
                        type="file"
                        name="herocardImg3"
                        accept="image/*"
                        onChange={handleCardImageUpload}
                      />
                      <textarea
                        name="herocardText3"
                        value={formik.values.herocardText3}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <FaEdit onClick={() => handleEditClick(3)} className="text-secondary mx-2" />
                    <img src={formik.values.herocardImg3} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                    <p className='mx-2'>{formik.values.herocardText3}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* {/ Why Join Us /} */}
        <div className='whyjoinus mb-5'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-star mb-3'>Why Join with Us</h1>
            <FaPlus className='mt-3 mb-3' onClick={() => setIsModalVisible(true)} />
          </div>
          <div className='row'>
            {formik.values.whyjoinCards.map((card, index) => (
              <div key={card.id} className='col-md-4 mb-3'>
                <div className='card'>
                  <div className='card-body text-start'>
                    {isEditing === card.id ? (
                      <>
                        <div className='d-flex justify-content-center mb-2'>
                          <FaSave onClick={handleSaveClick} className='text-secondary' />
                          <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className='text-secondary' />
                        </div>
                        <div>
                          <input
                            type='file'
                            name={`featurecardImg${index + 1}`}
                            accept='image/*'
                            onChange={handleCardUpload}
                          />
                          <input
                            type='text'
                            name={`featurecardText${index + 1}`}
                            value={card.featurecardText}
                            onChange={(e) => {
                              const updatedCards = formik.values.whyjoinCards.map((item) =>
                                item.id === card.id ? { ...item, featurecardText: e.target.value } : item
                              );
                              formik.setFieldValue('whyjoinCards', updatedCards);
                            }}
                            className='form-control'
                          />
                          <textarea
                            name={`featurecardPara${index + 1}`}
                            value={card.featurecardPara}
                            onChange={(e) => {
                              const updatedCards = formik.values.whyjoinCards.map((item) =>
                                item.id === card.id ? { ...item, featurecardPara: e.target.value } : item
                              );
                              formik.setFieldValue('whyjoinCards', updatedCards);
                            }}
                            className='form-control'
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <FaEdit onClick={() => handleEditClick(card.id)} className='text-secondary mx-2' />
                        <div className='d-flex'>
                          <img src={card.featurecardImg} alt='Feature' style={{ width: '30px', height: '30px' }} />
                          <p className='pt-2 mx-2'>{card.featurecardText}</p>
                        </div>
                        <p className='text-start subpara paraContent'>{card.featurecardPara}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal for Adding New Card */}
        <Modal show={isModalVisible} onHide={() => setIsModalVisible(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type='text'
              placeholder='Title'
              value={newCard.featurecardText}
              onChange={(e) => setNewCard({ ...newCard, featurecardText: e.target.value })}
              className='form-control mb-2'
            />
            <textarea
              placeholder='Description'
              value={newCard.featurecardPara}
              onChange={(e) => setNewCard({ ...newCard, featurecardPara: e.target.value })}
              className='form-control mb-2'
            />
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewCard({ ...newCard, featurecardImg: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className='form-control mb-2'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleModalSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {/* {/ Top Companies Hiring /} */}
        <div className='topcompanies mb-5'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-start'>Top Companies Hiring</h1>
            <FaPlus className='mt-3 mb-3' onClick={() => setIsModalImage(true)} />
          </div>
          <div className='row g-2 d-flex justify-content-start mb-3'>
            {formik.values.companiesLogo.map((logo, index) => (
              <div key={logo.id} className='col-md-2 col-6 mb-3'>
                <div className='card'>
                  <div className='card-body d-flex align-items-center justify-content-center'>
                    {isEditing === logo.id ? (
                      <>
                        <div className="d-flex justify-content-center mb-2">
                          <FaSave onClick={handleSaveClick} className="text-secondary" />
                          <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                        </div>
                        <div>
                          <input
                            type="file"
                            name={`companyLogoImg${index + 1}`}
                            accept="image/*"
                            onChange={handleCompanyLogoUpload}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <FaEdit onClick={() => handleEditClick(logo.id)} className='text-secondary mx-2' />
                        <div className='d-flex'>
                          <img src={logo.companyLogoImg} alt='LogoImg' style={{ width: "100px", height: "100px" }} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add Companies Logo */}
        <Modal show={isModalImage} onHide={() => setIsModalImage(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewCard({ ...newCard, companyLogoImg: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className='form-control mb-2'
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setIsModalImage(false)}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleCompanyLogoSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        {/* {/ Courses /} */}
        <div className='Courses mt-3'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-start mb-3'>10+ Courses</h1>
            <FaPlus onClick={handleAddCourse} className="mt-3 mb-3" />
          </div>
          <div className='row'>
            {formik.values.coursesData.map((course, index) => (
              <div className='col-md-4 mb-4' key={course.id}>
                <div className="d-flex align-items-end justify-content-end p-3">
                  <FaEdit onClick={() => handleEditCourse(index)} />
                  <FaTrash onClick={() => handleDeleteCourse(index)} className="text-danger ms-3" />
                </div>
                <div className='card' style={{ height: "250px" }}>
                  <h5 className='card-header text-center'>{course.title}</h5>
                  <div className='card-body'>
                    <ul className='list-unstyled'>
                      {course.items.map((item, i) => (
                        <li key={i} className='d-flex align-items-center mb-2'>
                          <img src={SunIcon} alt='icon' style={{ width: '20px', height: '20px' }} className='mr-2' />
                          <span className='mx-2'>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing !== null ? "Edit Course" : "Add New Course"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                name="courseTitle"
                placeholder="Course Title"
                value={newCourse.courseTitle}
                onChange={handleChangeNewCourse}
                className="form-control mb-3"
              />
              {newCourse.description.map((desc, index) => (
                <div key={index} className="d-flex mb-3">
                  <input
                    value={desc}
                    onChange={(e) => handlePointsChange(e, index)}
                    className="form-control"
                  />
                  <FaTrash onClick={() => handleDeletePoints(index)} className="text-danger ms-2 mt-1" />
                </div>
              ))}
              <FaPlus onClick={handleAddPoints} className="text-success" />
            </Modal.Body>
            <Modal.Footer>
              <FaSave onClick={handleSaveCourse} className="mx-2 text-primary" />
              <FaTimes onClick={() => setShowModal(false)} className="text-danger" />
            </Modal.Footer>
          </Modal>
        </div>
        {/* {/ Training Overview /} */}
        <div className='trainingOverview mt-3'>
          <div className='row d-flex'>
            <h1 className='secondheading text-start mb-3'>Cloud Ecs Training Overview</h1>
            <div className='col-md-8'>
              {isEditing === 'overviewPara' ? (
                <>
                  <div className="d-flex justify-content-center mb-2">
                    <FaSave onClick={handleSaveClick} className="text-secondary" />
                    <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                  </div>
                  <div>
                    <textarea
                      name="trainingOverviewPara"
                      value={formik.values.trainingOverviewPara}
                      onChange={formik.handleChange}
                      className="form-control"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='d-flex flex-coloumn'>
                    <p className='text-start paraContent'>{formik.values.trainingOverviewPara}</p>
                    <FaEdit onClick={() => handleEditClick("overviewPara")} className="text-secondary mx-2" style={{ width: "40px", height: "40px" }} />
                  </div>
                </>
              )}
            </div>
            <div className='col-md-4 card p-4'>
              <div className='row d-flex'>
                <div className='col-md-8'>
                  <p>CONTACT US</p>
                  {isEditing === 'contactNo' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="contactNumber"
                          value={formik.values.contactNumber}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("contactNo")} className="text-secondary mx-2" />
                      <h3>{formik.values.contactNumber}</h3>
                    </>
                  )}
                  <p>Toll Free No</p>
                </div>
                <div className='col-md-4 pt-4'>
                  <img src={ContactUs} alt='ContactImg' style={{ width: "50px", height: "50px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {/ Points   /} */}
        <div>
          <div className='d-flex justify-content-end'>
            <FaPlus type="submit" onClick={handleOpenModalPoints} style={{ cursor: 'pointer', fontSize: '24px' }} />
          </div>
          <div className="PointsSection py-4">
            <div className="points-container row">
              {formik.values.pointsData.map((point, index) => (
                <div className="point-item col-md-3 mb-3" key={index}>
                  <img src={CirclePoints} alt='circleImg' style={{ width: "30px", height: "30px" }} />
                  <span className="mx-2 point-text">{point.pointText}</span>
                </div>
              ))}
            </div>
          </div>
          <Modal show={showPointsModal} onHide={handleClosePointsModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Point</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Point Text</Form.Label>
                <Form.Control
                  type="text"
                  value={newPoint}
                  onChange={handleChangeNewPoint}
                  placeholder="Enter new point"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClosePointsModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddPoint}>
                Add Point
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
      {/* {/ Training and Placements /} */}
      <div className='trainingplacements mt-3 mb-5'>
        <h1 className='secondheading text-start mb-3'>Cloud Ecs , Software Training and Placements in India</h1>
        <div className='row d-flex'>
          <div className="col-md-6 col-12">
            <div className="accordion" id="accordionExample">
              <div className="d-flex align-items-center justify-content-end">
                <FaPlus onClick={handleAddAccordion} className="mt-3 mb-3" /> Add New
              </div>
              {formik.values.aboutAccordion.map((accordion, accordionIndex) => (
                <div className="accordion-item mb-2" key={accordion.id}>
                  <div className="d-flex align-items-end justify-content-end p-3">
                    <FaEdit onClick={() => handleEditClick('aboutAccordion', accordionIndex)} />
                    <FaTrash onClick={() => handleRemoveAccordion(accordionIndex)} className="text-danger ms-3" />
                  </div>
                  {isEditing === 'aboutAccordion' && editingIndex === accordionIndex ? (
                    <div className="p-3">
                      <input
                        type="text"
                        name={`aboutAccordion.${accordionIndex}.accordionQuestion`}
                        value={accordion.accordionQuestion}
                        onChange={formik.handleChange}
                        className="form-control mb-3 "
                      />
                      <textarea
                        type="text"
                        name={`aboutAccordion.${accordionIndex}.accordionAnswer`}
                        value={accordion.accordionAnswer}
                        onChange={formik.handleChange}
                        className="form-control mb-3"
                      />
                      {accordion.description.map((desc, descIndex) => (
                        <div key={descIndex} className="d-flex">
                          <input
                            value={desc}
                            onChange={(e) => handleDescriptionChange(e, accordionIndex, descIndex)}
                            rows="2"
                            className="form-control mb-3"
                            style={{ margin: '5px 0' }}
                          />
                          <IoIosCloseCircleOutline
                            color="Red"
                            size={25}
                            className="ms-2 mt-2"
                            onClick={() => handleDeleteDescription(accordionIndex, descIndex)}
                          />
                        </div>
                      ))}
                      <div className="d-flex">
                        <FaPlus onClick={() => handleAddDescription(accordionIndex)} className="text-success" />
                        <FaSave onClick={handleSaveClick} className="mx-2 text-primary" />
                        <FaTimes onClick={handleCancel} className="text-danger" />
                      </div>
                    </div>
                  ) : (
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed accordion-header"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${accordion.id}`}
                          aria-expanded="false"
                          aria-controls={`collapse${accordion.id}`}
                        >
                          {accordion.accordionQuestion}
                        </button>
                      </h2>
                      <div id={`collapse${accordion.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body text-start">
                          <p>{accordion.accordionAnswer}</p>
                          {accordion.description.map((desc, descIndex) => (
                            <p key={descIndex}>{desc}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* {/ Modal for adding new accordion /} */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Accordion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="text"
                  name="accordionQuestion"
                  placeholder="Question"
                  value={newAccordion.accordionQuestion}
                  onChange={handleChangeNewAccordion}
                  className="form-control mb-3"
                />
                <textarea
                  type="text"
                  name="accordionAnswer"
                  placeholder="Answer"
                  value={newAccordion.accordionAnswer}
                  onChange={handleChangeNewAccordion}
                  className="form-control mb-3"
                />
              </Modal.Body>
              <Modal.Footer>
                <FaSave onClick={handleSaveNewAccordion} className="mx-2 text-primary" />
                <FaTimes onClick={handleClose} className="text-danger" />
              </Modal.Footer>
            </Modal>
          </div>
          <div className='col-md-6'>
            <div className='card p-4 enquiryform'>
              <form onSubmit={formikContact.handleContactSubmit}>
                <div className='row mb-3'>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type='text'
                      className={`form-control homeInput ${formikContact.touched.firstName && formikContact.errors.firstName ? "is-invalid" : ""}`}
                      {...formikContact.getFieldProps("firstName")}
                    />
                    {formikContact.touched.firstName && formikContact.errors.firstName && (
                      <div className="invalid-feedback">
                        {formikContact.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type='text'
                      className={`form-control homeInput ${formikContact.touched.lastName && formikContact.errors.lastName ? "is-invalid" : ""}`}
                      {...formikContact.getFieldProps("lastName")}
                    />
                    {formikContact.touched.lastName && formikContact.errors.lastName && (
                      <div className="invalid-feedback">
                        {formikContact.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type='email'
                      className={`form-control homeInput ${formikContact.touched.email && formikContact.errors.email ? "is-invalid" : ""}`}
                      {...formikContact.getFieldProps("email")}
                    />
                    {formikContact.touched.email && formikContact.errors.email && (
                      <div className="invalid-feedback">
                        {formikContact.errors.email}
                      </div>
                    )}
                  </div>
                  <div className='col-md-6 text-start'>
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                      type='number'
                      className={`form-control homeInput ${formikContact.touched.phoneNumber && formikContact.errors.phoneNumber ? "is-invalid" : ""}`}
                      {...formikContact.getFieldProps("phoneNumber")}
                    />
                    {formikContact.touched.phoneNumber && formikContact.errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {formikContact.errors.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-md-12 text-start'>
                    <label className="form-label">Message</label>
                    <textarea
                      className='form-control homeInput'
                      {...formikContact.getFieldProps("message")}
                    ></textarea>
                  </div>
                </div>
                <div className='text-start'>
                  <button type='submit' className='btn submitBtn btn-lg'>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    )}
    
    </>
  );
}

export default AdminHome;
