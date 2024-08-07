import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useFormik } from 'formik';
import SunIcon from "../../../assets/client/pointsImg.png";
import { Modal } from 'react-bootstrap';

function TopCourses() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newCourse, setNewCourse] = useState({ courseTitle: "", description: [""] });
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
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
          items: ['Android Development', 'iOS Development', 'Cross-Platform Development'],
        },
        {
          id: 4,
          title: 'Data Science and ML',
          items: ['Data Analysis', 'Machine Learning', 'Deep Learning'],
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
    },
    onSubmit: (values) => {
      console.log("Courses Datas", values);
      setIsEditing(null);
    },
  });

  const handleAddCourse = () => {
    setNewCourse({ courseTitle: '', description: [''] });
    setIsEditing(null);
    setShowModal(true);
  };

  const handleEditCourse = (index) => {
    setNewCourse({
      courseTitle: formik.values.coursesData[index].title,
      description: formik.values.coursesData[index].items,
    });
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
    if (isEditing !== null) {
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
    setShowModal(false);
    formik.handleSubmit();
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div>
          <div className="container-fluid d-flex justify-content-between p-2 bg-light">
            <h3 className="fw-bold">Courses</h3>
            <button className="btn btn-sm btn-danger">Publish</button>
          </div>
          <div className='container-fluid Courses mt-3'>
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
                {newCourse.description && newCourse.description.map((desc, index) => (
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
        </div>
      )}
    </>
  );
}

export default TopCourses;
