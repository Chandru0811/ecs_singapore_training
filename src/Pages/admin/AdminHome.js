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
import { useFormik } from "formik";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdAdd } from "react-icons/io";

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
  // const [editingCard, setEditingCard] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ img: '', text: '', para: '' });

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
      featurecardImg1: Card1,
      featurecardImg2: Card2,
      featurecardImg3: Card3,
      featurecardImg4: Card4,
      featurecardImg5: Card5,
      featurecardImg6: Card6,
      featurecardText1: 'Industry’s  Expertise',
      featurecardText2: 'Certifications',
      featurecardText3: 'Experiences',
      featurecardText4: 'Best Partners',
      featurecardText5: 'Profesional Trainers',
      featurecardText6: 'Case Studies',
      featurecardPara1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      featurecardPara2: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      featurecardPara3: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      featurecardPara4: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      featurecardPara5: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      featurecardPara6: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
      companylogoImg1: Amazon,
      companylogoImg2: Microsoft,
      companylogoImg3: Google,
      companylogoImg4: Ibm,
      companylogoImg5: Delloite,
      companylogoImg6: Hp,
      companylogoImg7: WellsFargo,
      companylogoImg8: Tcs,
      companylogoImg9: Zoho,
      companylogoImg10: Hsbc,
      trainingOverviewPara: 'Welcome to our comprehensive Cloud ECS (Elastic Container Service) Training Program! This course is designed to equip you with the essential knowledge and skills needed to effectively manage and deploy containerized applications using ECS, one of the most powerful container orchestration services available today.',
      contactNumber: '1800-212-7688',
      // coursesCards: [
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('heroImg', reader.result);
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

  // Courses
  const [coursesCards, setCoursesCards] = useState([
    {
      id: 1,
      icon: SunIcon,
      courseTitle: "Programming Languages",
      description: ["Python", "Java", "JavaScript", "C++", "Ruby"],
    },
    {
      id: 2,
      icon: SunIcon,
      courseTitle: "Web Development",
      description: ["Full-Stack Web Development", "Front-End Development", "Back-End Development"],
    },
    {
      id: 3,
      icon: SunIcon,
      courseTitle: "Mobile App Development",
      description: ["Android Development", "iOS Development", "Cross-Platform Development"],
    },
    {
      id: 4,
      icon: SunIcon,
      courseTitle: "Data Science and ML",
      description: ["Data Science with Python", "Machine Learning", "Data Engineering"],
    },
    {
      id: 5,
      icon: SunIcon,
      courseTitle: "Cloud Computing and DevOps",
      description: ["Cloud Fundamentals", "DevOps Essentials", "AWS Certification"],
    },
    {
      id: 6,
      icon: SunIcon,
      courseTitle: "Cybersecurity",
      description: ["Cybersecurity Fundamentals", "Ethical Hacking and Penetration Testing", "Secure Coding Practices"],
    },
  ]);

  const [newCourse, setNewCourse] = useState({ courseTitle: "", description: [""] });
  const [showModal, setShowModal] = useState(false);
  const handleAddCourse = () => {
    setShowModal(true);
    setNewCourse({ courseTitle: "", description: [""] });
  };

  const handleEditCourse = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewCourse(coursesCards[index]);
    setShowModal(true);
  };

  const handleSaveCourse = () => {
    if (isEditing) {
      const updatedCourses = [...coursesCards];
      updatedCourses[editingIndex] = newCourse;
      setCoursesCards(updatedCourses);
    } else {
      setCoursesCards([...coursesCards, { ...newCourse, id: coursesCards.length + 1 }]);
    }
    setShowModal(false);
    setIsEditing(false);
    setNewCourse({ courseTitle: "", description: [""] });
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = coursesCards.filter((_, i) => i !== index);
    setCoursesCards(updatedCourses);
  };

  const handleChangeNewCourse = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handlePointsChange = (e, index) => {
    const updatedDescriptions = newCourse.description.map((desc, i) =>
      i === index ? e.target.value : desc
    );
    setNewCourse({ ...newCourse, description: updatedDescriptions });
  };

  const handleAddPoints = () => {
    setNewCourse({ ...newCourse, description: [...newCourse.description, ""] });
  };

  const handleDeletePoints = (index) => {
    const updatedDescriptions = newCourse.description.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, description: updatedDescriptions });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setNewCourse({ courseTitle: "", description: [""] });
  };

  // Training Overview Points
  return (
    <div className='container Home'>
      <form onSubmit={formik.handleSubmit}>
        {/* Hero */}
        <div className='row mb-3'>
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
              <button className='btn btn-primary btn-lg me-3'>Get Started</button>
              <button className='btn btn-outline-primary btn-lg'>Learn More</button>
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
        <div className='card homeCard mb-3'>
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
        <div className='whyjoinus mb-3'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-start'>Why Join with Us</h1>
            <FaPlus className="mt-3 mb-3" />
          </div>
          <div className='row mb-3'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard1' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg1"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText1"
                          value={formik.values.featurecardText1}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara1"
                          value={formik.values.featurecardPara1}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard1")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg1} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText1}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara1}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard2' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg2"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText2"
                          value={formik.values.featurecardText2}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara2"
                          value={formik.values.featurecardPara2}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard2")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg2} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText2}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara2}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard3' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg3"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText3"
                          value={formik.values.featurecardText3}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara3"
                          value={formik.values.featurecardPara3}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard3")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg3} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText3}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara3}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard4' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg4"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText4"
                          value={formik.values.featurecardText4}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara4"
                          value={formik.values.featurecardPara4}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard4")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg4} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText4}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara4}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard5' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg5"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText5"
                          value={formik.values.featurecardText5}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara5"
                          value={formik.values.featurecardPara5}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard5")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg5} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText5}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara5}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body text-start'>
                  {isEditing === 'featurecard6' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="featurecardImg6"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                        <input
                          type="text"
                          name="featurecardText6"
                          value={formik.values.featurecardText6}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                        <textarea
                          name="featurecardPara6"
                          value={formik.values.featurecardPara6}
                          onChange={formik.handleChange}
                          className="form-control"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick("featurecard6")} className="text-secondary mx-2" />
                      <div className='d-flex'>
                        <img src={formik.values.featurecardImg6} alt='BookImg' style={{ width: "30px", height: "30px" }} />
                        <p className='pt-2 mx-2'>{formik.values.featurecardText6}</p>
                      </div>
                      <p className='text-start subpara paraContent'>{formik.values.featurecardPara6}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              {/* <Modal.Title>{isEditing ? "Edit Course" : "Add New Course"}</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
              <input
                type="file"
                name="companylogoImage"
                accept="image/*"
                onChange={handleCardImageUpload}
              />
            </Modal.Body>
            <Modal.Footer>
              <FaSave onClick={handleSaveCourse} className="mx-2 text-primary" />
              <FaTimes onClick={handleCloseModal} className="text-danger" />
            </Modal.Footer>
          </Modal>
        </div>
        {/* {/ Top Companies Hiring /} */}
        <div className='topcompanies mb-3'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-start'>Top Companies Hiring</h1>
            <FaPlus />
          </div>
          <div className='row g-2 d-flex justify-content-between mb-3'>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard1' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg1"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard1")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg1} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard2' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg2"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard2")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg2} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard3' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg3"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard3")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg3} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard4' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg4"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard4")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg4} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard5' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg5"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard5")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg5} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='row g-2 d-flex justify-content-between mb-3'>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard6' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg6"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard6")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg6} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard7' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg7"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard7")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg7} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard8' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg8"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard8")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg8} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard9' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg9"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard9")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg9} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className='col-6 col-md-2'>
              <div className='card'>
                <div className='card-body d-flex align-items-center justify-content-center'>
                  {isEditing === 'companiescard10' ? (
                    <>
                      <div className="d-flex justify-content-center mb-2">
                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                      </div>
                      <div>
                        <input
                          type="file"
                          name="companylogoImg10"
                          accept="image/*"
                          onChange={handleCardImageUpload}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='d-flex flex-coloumn'>
                        <FaEdit onClick={() => handleEditClick("companiescard10")} className="text-secondary mx-2" />
                        <img src={formik.values.companylogoImg10} alt='BookImg' style={{ width: "100px", height: "100px" }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {/ Courses /} */}
        <div className='Courses mb-3'>
          <div className='d-flex justify-content-between'>
            <h1 className='secondheading text-start'>10+ Courses</h1>
            <FaPlus onClick={handleAddCourse} className="mt-3 mb-3" />
          </div>
          <div className='row'>
            {coursesCards.map((course, index) => (
              <div className='col-md-4 mb-4' key={course.id}>
                <div className="d-flex align-items-end justify-content-end p-3">
                  <FaEdit onClick={() => handleEditCourse(index)} />
                  <FaTrash onClick={() => handleDeleteCourse(index)} className="text-danger ms-3" />
                </div>
                <div className='card' style={{ height: "250px" }}>
                  <h5 className='card-header text-center'>{course.courseTitle}</h5>
                  <div className='card-body'>
                    <ul className='list-unstyled'>
                      {course.description.map((item, i) => (
                        <li key={i} className='d-flex align-items-center mb-2'>
                          <img src={course.icon} alt='icon' style={{ width: '20px', height: '20px' }} className='mr-2' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Course" : "Add New Course"}</Modal.Title>
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
              <FaTimes onClick={handleCloseModal} className="text-danger" />
            </Modal.Footer>
          </Modal>
        </div>
        {/* {/ Training Overview /} */}
        <div className='trainingOverview mb-3'>
          <div className='row d-flex'>
            <h1 className='secondheading text-start'>Cloud Ecs Training Overview</h1>
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
      </form>
    </div>
  );
}

export default AdminHome;
