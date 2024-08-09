import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { useFormik } from 'formik';
import DeleteModel from "../../../../components/DeleteModel";
import api from "../../../../config/BaseUrl";
import ImageURL from "../../../../config/ImageURL";
import AddWhyJoinWithUs from './AddWhyJoinWithUs';
import toast from "react-hot-toast";
import EditWhyJoinWithUs from './EditWhyJoinWithUs';

function WhyJoinWithUs() {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const response = await api.get("homesection2");
            setDatas(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handlePublish = async () => {
        try {
            const response = await api.post('publish/homesection2');
            if (response.status === 200) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            getData();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light">
                <h3 className="fw-bold">Why Join With Us</h3>
                <div>
                    <AddWhyJoinWithUs onSuccess={getData} />
                    <button className="btn btn-danger mx-2" onClick={handlePublish}>Publish</button>
                </div>
            </div>
            <div>
                {/* Why Join Us */}
                <div className='container-fluid whyjoinus mb-5'>
                    <div className='row'>
                        {loading ? (
                            <div className="spinner-container">
                                <div className="spinner"></div>
                            </div>
                        ) : (
                            datas.map((data) => (
                                <div key={data.id} className='col-md-4 mb-3'>
                                    <div className='card'>
                                        <div className='card-body text-start'>
                                            <div className="d-flex justify-content-between">
                                                <EditWhyJoinWithUs id={data.id} onSuccess={getData} />
                                                <DeleteModel className="text-danger" onSuccess={getData} path={`homesection2/${data.id}`} />
                                            </div>
                                            <div className='d-flex'>
                                                <img src={`${ImageURL}${data.image_path}`}
                                                    alt={data.image_path}
                                                    style={{ width: "30px", height: "30px" }} />
                                                <p className='pt-2 mx-2'>{data.title}</p>
                                            </div>
                                            <p className='text-start subpara paraContent'>{data.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyJoinWithUs;