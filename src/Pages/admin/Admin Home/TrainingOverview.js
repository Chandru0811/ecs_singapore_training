import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { useFormik } from 'formik';
import ContactUs from "../../../assets/client/phoneImg.png";
import CirclePoints from "../../../assets/client/circlePoint.png";
import { Modal, Button, Form } from 'react-bootstrap';

function TrainingOverview() {
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(null);

    const formik = useFormik({
        initialValues: {
            trainingOverviewPara: 'Welcome to our comprehensive Cloud ECS (Elastic Container Service) Training Program! This course is designed to equip you with the essential knowledge and skills needed to effectively manage and deploy containerized applications using ECS, one of the most powerful container orchestration services available today.',
            contactNumber: '1800-212-7688',
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
            console.log("Training Overview Datas", values);
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
                        <button className="btn btn-sm btn-danger">Publish</button>
                    </div>
                    <div>
                        {/* {/ Training Overview /} */}
                        <div className='container-fluid trainingOverview mt-3'>
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
                                                            type="text"
                                                            name="contactNumber"
                                                            onChange={formik.handleChange}
                                                            value={formik.values.contactNumber}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className='d-flex align-items-center'>
                                                        <FaEdit onClick={() => handleEditClick("contactNo")} className="text-secondary mx-2" />
                                                        <h3>{formik.values.contactNumber}</h3>
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
                    </div>
                </div>
            )}
        </>
    );
}

export default TrainingOverview;
