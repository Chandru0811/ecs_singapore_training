import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import StarIcon from "../../assets/client/CoursePointImg.png";
import ClientCourseImg from "../../assets/client/ClientCourseImg.png";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import api from '../../config/BaseUrl';
import ImageURL from "../../config/ImageURL";


function Courses() {
    const [headerData, setHeaderData] = useState();
    const formik = useFormik({
        initialValues: {
            courseImg: ClientCourseImg,
            courseTitle: 'Your Courses to Success Trusted Training Platform',
            courseDescription: "Best Live Instructor-Led Online Training Courses with 100% Placement Support",
            coursesPoints: [
                { id: 1, point: '130 + Hours in-depth Online courses' },
                { id: 2, point: '5k + Online Batches Completed' },
                { id: 3, point: '10k + Placed Students' },
                { id: 4, point: '130 + Hours in-depth Online courses' },
                { id: 5, point: '20000 + Learners around the world' },
                { id: 6, point: '100% Certification Pass Guarantee' }
            ]
        },
        onSubmit: async(values) => {
            console.log("ClientCourse Datas", values);
            setIsEditing(null);
            setIsAddingPoint(false);
            setNewPoint('');
            const formData = new FormData();
      formData.append("heading_section", values.courseTitle);
      formData.append("description",values.courseDescription);
      formData.append("features",values.coursesPoints.map((point) => point.point));
      if (
        values.header instanceof ArrayBuffer ||
        values.header instanceof Blob
      ) {
        formData.append("image", values.courseImg);
      }
      try {
        const response = await api.post("update/course/content", formData);
        if (response.status === 200) {
          getData();
          console.log("updated", response.data);
        }
      } catch (e) {
        console.log("object", e);
      }
        
      
        },
    });

    const getData = async () => {
        try {
          const response = await api.get("edit/course/content");
          if (response.status === 200) {
              formik.setFieldValue("courseTitle", response.data.data.heading_section);
              formik.setFieldValue("courseDescription", response.data.data.description);
              
              setHeaderData(response.data.data);
          }
        } catch (e) {
          console.log("object", e);
        }
      };

    const [isEditing, setIsEditing] = useState(null);
    const [isAddingPoint, setIsAddingPoint] = useState(false);
    const [newPoint, setNewPoint] = useState('');
    const [editPointId, setEditPointId] = useState(null);

    const handleEditClick = (field) => {
        setIsEditing(field);
    };

    const handleSaveClick = () => {
        formik.handleSubmit();
    };

    const handleCancel = () => {
        setIsEditing(null);
        setEditPointId(null);
        setIsAddingPoint(false);
        formik.resetForm();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('courseImg', reader.result);
                console.log("Updated Formik values:", formik.values);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePointChange = (event, id) => {
        const updatedPoints = formik.values.coursesPoints.map(point =>
            point.id === id ? { ...point, point: event.target.value } : point
        );
        formik.setFieldValue('coursesPoints', updatedPoints);
    };

    const handleAddPoint = () => {
        if (newPoint.trim() === '') {
            return;
        }

        const newId = formik.values.coursesPoints.length + 1;
        const newPointObj = { id: newId, point: newPoint };

        formik.setFieldValue('coursesPoints', [...formik.values.coursesPoints, newPointObj]);

        setNewPoint('');
        setIsAddingPoint(false);

        console.log("Updated Formik values after adding point:", formik.values);
    };

    const handleDeletePoint = (id) => {
        const updatedPoints = formik.values.coursesPoints.filter(point => point.id !== id);
        formik.setFieldValue('coursesPoints', updatedPoints);
    };

    const publishData = async () => {
        try {
          const response = await api.post("publish/course/content");
          if (response.status === 200) {
            console.log("published successfully!");
          }
        } catch (e) {
          console.log("object", e);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);

    return (
        <div className='container-fluid' style={{ backgroundColor: "#FAFCFF" }}>
                <div className='d-flex align-items-center justify-content-between p-2'>
                <h4>Courses</h4>
                <button className="btn btn-primary" onClick={publishData}>Publish</button>
            </div>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='row CoursesHome'>
                        <div className='col-md-8 pt-5'>
                            {isEditing === 'courseTitle' ? (
                                <div className='d-flex flex-column'>
                                    <input
                                        type="text"
                                        name="courseTitle"
                                        value={formik.values.courseTitle}
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
                                    <h1 className="display-5 text-start fw-bold">{formik.values.courseTitle}</h1>
                                    <FaEdit onClick={() => handleEditClick('courseTitle')} className="text-secondary ms-3" style={{ width: "30px", height: "30px" }} />
                                </div>
                            )}
                            {isEditing === 'courseDescription' ? (
                                <div className='d-flex flex-column'>
                                    <textarea
                                        name="courseDescription"
                                        value={formik.values.courseDescription}
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
                                    <p className='text-start coursepara'>{formik.values.courseDescription}</p>
                                    <FaEdit onClick={() => handleEditClick('courseDescription')} className="text-secondary ms-3" />
                                </div>
                            )}

                            <div className='row pt-4 mb-4'>
                                {isEditing === 'coursesPoints' ? (
                                    <>
                                        <div className='col-md-12'>
                                            <ul style={{ listStyle: "none", padding: 0 }}>
                                                <div className='row'>
                                                    {formik.values.coursesPoints.map((course, index) => (
                                                        <div className='col-md-6' key={course.id}>
                                                            <li className='d-flex align-items-center'>
                                                                <img src={StarIcon} className='me-2' style={{ width: "18px", height: "18px" }} alt="Star Icon" />
                                                                <input
                                                                    type="text"
                                                                    value={course.point}
                                                                    onChange={(e) => handlePointChange(e, course.id)}
                                                                    className="form-control mb-2"
                                                                />
                                                                <FaTrash onClick={() => handleDeletePoint(course.id)} className="text-secondary ms-2" />
                                                            </li>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ul>
                                        </div>
                                        {isAddingPoint ? (
                                            <div className='col-md-6 d-flex align-items-center mb-2'>
                                                <input
                                                    type="text"
                                                    value={newPoint}
                                                    onChange={(e) => setNewPoint(e.target.value)}
                                                    className="form-control me-2"
                                                    placeholder="Enter new point"
                                                />
                                                <FaSave onClick={handleAddPoint} className="text-secondary me-2" />
                                                <FaTimes onClick={() => setIsAddingPoint(false)} className="text-secondary" />
                                            </div>
                                        ) : (
                                            <div className='d-flex align-items-center mb-2'>
                                                <FaPlus onClick={() => setIsAddingPoint(true)} className="text-secondary" />
                                            </div>
                                        )}
                                        <div className='d-flex justify-content-center'>
                                            <FaSave onClick={handleSaveClick} className="text-secondary me-2" />
                                            <FaTimes onClick={handleCancel} className="text-secondary" />
                                        </div>
                                    </>
                                ) : (
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        <div className='row'>
                                            {formik.values.coursesPoints.map((course) => (
                                                <div className='col-md-6 mb-2' key={course.id}>
                                                    <li className='d-flex align-items-center mb-3'>
                                                        <img src={StarIcon} className='me-2' style={{ width: "18px", height: "18px" }} alt="Star Icon" />
                                                        <p className='mb-0'>{course.point}</p>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                        <FaEdit onClick={() => handleEditClick('coursesPoints')} className="text-secondary ms-3" />
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='col-md-4 pt-5'>
                            {isEditing === 'courseImg' ? (
                                <div>
                                    <input
                                        type="file"
                                        name="courseImg"
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
                                    {headerData?.image ? (
                                        <img  src={`${ImageURL}${headerData.image}`} className='img-fluid' alt="CourseImage" />
                                    ) : (
                                        <img  src={formik.values.courseImg} className='img-fluid' alt="CourseImage" />
                                    )}
                                    <FaEdit onClick={() => handleEditClick('courseImg')} className="text-secondary mt-2" />
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Courses;
