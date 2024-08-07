import React, { useState } from 'react'
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { useFormik } from 'formik';
import Card1 from "../../../assets/client/card1.png";
import Card2 from "../../../assets/client/card2.png";
import Card3 from "../../../assets/client/card3.png";
import Card4 from "../../../assets/client/card4.png";
import Card5 from "../../../assets/client/card5.png";
import Card6 from "../../../assets/client/card6.png";
import { Modal, Button } from 'react-bootstrap';

function WhyJoinWithUs() {
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newCard, setNewCard] = useState({ img: '', text: '', para: '' });

    const formik = useFormik({
        initialValues: {
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
        },
        onSubmit: (values) => {
            console.log("Why Join with us Datas", values);
            setIsEditing(null);
        },
    })

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
                        <h3 className="fw-bold">Why Join WithUs</h3>
                        <button className="btn btn-sm btn-danger">Publish</button>
                    </div>
                    <div>
                        {/* {/ Why Join Us /} */}
                        <div className='container-fluid whyjoinus mb-5'>
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
                    </div>
                </div>
            )}
        </>
    );
}

export default WhyJoinWithUs;
