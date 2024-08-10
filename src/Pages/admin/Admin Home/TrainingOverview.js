import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { useFormik } from 'formik';
import ContactUs from "../../../assets/client/phoneImg.png";
import CirclePoints from "../../../assets/client/circlePoint.png";
import api from '../../../config/BaseUrl';
import toast from "react-hot-toast";

function TrainingOverview() {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isAddingPoint, setIsAddingPoint] = useState(false);
    const [newPoint, setNewPoint] = useState('');
    const [datas, setDatas] = useState();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            contact_no: "",
            key_points: []
        },
        onSubmit: async (values) => {
            console.log("Home Section 3 Datas", values);
            setIsEditing(null);
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("contact_no", values.contact_no);

            values.key_points.forEach((point, index) => {
                formData.append(`key_points[]`, point);
            });

            try {
                const response = await api.post("update/homesection3", values);
                if (response.status === 200) {
                    getData();
                    toast.success("Data updated successfully!");
                    console.log("Updated Data", response.data);
                }
            } catch (e) {
                console.log("Error updating data:", e);
            }
        },
    });

    const getData = async () => {
        setLoading(true);
        try {
            const response = await api.get("edit/homesection3");
            if (response.status === 200) {
                setDatas(response.data.data);
                 // Ensure it's always an array
            }
        } catch (e) {
            console.log("Error fetching data:", e);
        } finally {
            setLoading(false);
        }
    };

    const publishData = async () => {
        try {
            const response = await api.post("publish/homesection3");
            if (response.status === 200) {
                toast.success("Published data successfully!");
                console.log("Published data Successfully!");
            }
        } catch (e) {
            console.log("Error publishing data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        if (datas) {
            formik.setFieldValue("title", datas.title);
            formik.setFieldValue("description", datas.description);
            formik.setFieldValue("contact_no", datas.contact_no);
            formik.setFieldValue("key_points", datas.key_points || []);
        }
    }, [datas]);
    

    const handleEditClick = (field) => {
        setIsEditing(field);
    };

    const handleSaveClick = () => {
        formik.handleSubmit();
    };

    const handleCancel = () => {
        setIsEditing(null);
        setIsAddingPoint(false);
        setNewPoint('');
        getData();
    };

    const handlePointChange = (event, index) => {
        const updatedPoints = formik.values.key_points.map((point, i) =>
            i === index ? event.target.value : point
        );
        formik.setFieldValue('key_points', updatedPoints);
    };

    const handleAddPoint = () => {
        if (newPoint.trim() === '') {
            return;
        }
        formik.setFieldValue('key_points', [...formik.values.key_points, newPoint]);
        setNewPoint('');
        setIsAddingPoint(false);
    };

    const handleDeletePoint = (index) => {
        const updatedPoints = formik.values.key_points.filter((_, i) => i !== index);
        formik.setFieldValue('key_points', updatedPoints);
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
                        <h3 className="fw-bold">Training Overview</h3>
                        <button className="btn btn-sm btn-danger" onClick={publishData}>Publish</button>
                    </div>
                    <div>
                        <div className='container-fluid trainingOverview mt-3'>
                            <div className='row d-flex'>
                                {/* Title Section */}
                                {isEditing === 'title' ? (
                                    <>
                                        <div className="d-flex justify-content-center mb-2">
                                            <FaSave onClick={handleSaveClick} className="text-secondary" />
                                            <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                        </div>
                                        <input
                                            type='input'
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className='d-flex flex-column'>
                                            <h1 className='secondheading text-start mb-3'>{datas?.title}</h1>
                                            <FaEdit onClick={() => handleEditClick("title")} className="text-secondary mx-2" style={{ width: "30px", height: "30px" }} />
                                        </div>
                                    </>
                                )}

                                {/* Description Section */}
                                <div className='col-md-8'>
                                    {isEditing === 'description' ? (
                                        <>
                                            <div className="d-flex justify-content-center mb-2">
                                                <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                            </div>
                                            <div>
                                                <textarea
                                                    name="description"
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='d-flex flex-column'>
                                                <p className='text-start paraContent'>{datas?.description}</p>
                                                <FaEdit onClick={() => handleEditClick("description")} className="text-secondary mx-2" style={{ width: "30px", height: "30px" }} />
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Contact Section */}
                                <div className='col-md-4 card p-4'>
                                    <div className='row d-flex'>
                                        <div className='col-md-8'>
                                            <p>CONTACT US</p>
                                            {isEditing === 'contact_no' ? (
                                                <>
                                                    <div className="d-flex justify-content-center mb-2">
                                                        <FaSave onClick={handleSaveClick} className="text-secondary" />
                                                        <FaTimes onClick={handleCancel} style={{ marginLeft: '10px' }} className="text-secondary" />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="contact_no"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.contact_no}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className='d-flex align-items-center'>
                                                        <FaEdit onClick={() => handleEditClick("contact_no")} className="text-secondary mx-2" />
                                                        <h3>{datas?.contact_no}</h3>
                                                    </div>
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

                        {/* Points Section */}
                        <div className="PointsSection py-4">
                            <div className="points-container row">
                                {formik.values.key_points.map((point, index) => (
                                    <div className="point-item col-md-3 mb-3 d-flex align-items-center" key={index}>
                                        <img src={CirclePoints} alt='circleImg' style={{ width: "30px", height: "30px" }} />
                                        {isEditing === 'key_points' ? (
                                            <input
                                                type="text"
                                                value={point}
                                                onChange={(e) => handlePointChange(e, index)}
                                                className="form-control"
                                            />
                                        ) : (
                                            <span className="ms-2">{point}</span>
                                        )}
                                        {isEditing === 'key_points' && (
                                            <FaTrash onClick={() => handleDeletePoint(index)} className="text-secondary ms-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            {isEditing === 'key_points' ? (
                                <>
                                    {isAddingPoint ? (
                                        <div className="text-start col-md-4 mt-2 d-flex justify-content-center">
                                            <input
                                                type="text"
                                                value={newPoint}
                                                onChange={(e) => setNewPoint(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter new point"
                                            />
                                            {/* <FaSave onClick={handleAddPoint} className="text-secondary ms-2" /> */}
                                            <FaTimes onClick={() => setIsAddingPoint(false)} className="text-secondary ms-2" />
                                        </div>
                                    ) : (
                                        <div className="mt-2 d-flex justify-content-center">
                                            <button className="btn btn-secondary" onClick={() => setIsAddingPoint(true)}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-center mt-3">
                                        <FaSave
                                            onClick={() => {
                                                if (newPoint.trim()) {
                                                    handleAddPoint();
                                                }
                                                handleSaveClick();
                                            }}
                                            className="text-secondary ms-2"
                                        />
                                        <FaTimes
                                            onClick={handleCancel}
                                            className="text-secondary ms-2"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="mt-2 d-flex justify-content-center">
                                    <FaEdit onClick={() => handleEditClick("key_points")} className="text-secondary mx-2" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TrainingOverview;
