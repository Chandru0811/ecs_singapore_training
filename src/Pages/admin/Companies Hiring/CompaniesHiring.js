import React, { useEffect, useState } from "react";
import AddCompanyHiring from "./AddCompanyHiring";
import EditCompanyHiring from "./EditCompanyHiring";
import DeleteModel from "../../../components/DeleteModel";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";
import toast from "react-hot-toast";

function CompaniesHiring() {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const response = await api.get("companyhiring");
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
            const response = await api.post('publish/companyhiring');
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
            <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light mb-5">
                <h3 className="fw-bold">Top Companies Hiring</h3>
                <div>
                    <AddCompanyHiring onSuccess={getData} />
                    <button className="btn btn-danger mx-2" onClick={handlePublish}>Publish</button>
                </div>
            </div>
            <div className="row m-0">
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    datas.map((card) => (
                        <div key={card.id} className='col-6 col-md-2 mb-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className="d-flex justify-content-between">
                                        <EditCompanyHiring id={card.id} onSuccess={getData} />
                                        <DeleteModel className="text-danger" onSuccess={getData} path={`companyhiring/${card.id}`} />
                                    </div>
                                    <img src={`${ImageURL}${card.company_logo_path}`}
                                        alt={card.company_name}
                                        style={{ width: "100px", height: "100px" }} />
                                    <h4>{card.company_name}</h4>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CompaniesHiring;