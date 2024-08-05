import React, { useEffect, useState } from "react";
import AddCourseVideoTestimonial from "../Course Video Testimonial/AddCourseVideoTestimonial";
import EditCourseVideoTestimonial from "./EditCourseVideoTestimonial";
import DeleteModel from "../../../components/DeleteModel";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";

function CourseVideoTestimonial() {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get("videoTestimonial");
                setDatas(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    const refreshData = async () => {
        setLoading(true);
        try {
            const response = await api.get("videoTestimonial");
            setDatas(response.data.data);
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleVideoClick = (event) => {
        const video = event.target;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    return (
        <div>
            <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light">
                <h3 className="fw-bold">Online Training Review</h3>
                <div>
                    <AddCourseVideoTestimonial ononSuccess={refreshData} />
                    <button className="btn btn-danger mx-2">Publish</button>
                </div>
            </div>
            <div className="row m-0 p-3">
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    datas.map((card) => (
                        <div key={card.id} className="col-md-3 col-12 p-2">
                            <div className="h-100 rounded video-card p-2">
                                <div className="d-flex justify-content-between">
                                    <EditCourseVideoTestimonial onSuccess={refreshData} />
                                    <DeleteModel className="text-danger" onSuccess={refreshData} />
                                </div>
                                <video
                                    src={`${ImageURL}${card.video_path}`}
                                    style={{ width: "100%", height: "200px", cursor: "pointer" }}
                                    onClick={handleVideoClick}
                                    controls={false}
                                />
                                <div className="p-2 text-start">
                                    <h4
                                        className="card-text text-primary"
                                        style={{ borderBottom: "2px solid" }}
                                    >
                                        {card.client_name}
                                    </h4>
                                    <p className="card-text text-secondary">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CourseVideoTestimonial;