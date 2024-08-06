import React, { useEffect, useState, useRef } from "react";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import { IoIosPause, IoMdPlay } from "react-icons/io";

function CourseVideoTestimonial() {
    const [datas, setDatas] = useState([]);
    const [iconState, setIconState] = useState({});
    const [showAll, setShowAll] = useState(false);
    const videoRefs = useRef({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await api.get("course/videotestimonial");
                setDatas(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);

    const handlePlayPause = (id) => {
        const video = videoRefs.current[id];
        if (video) {
            if (video.paused) {
                video.play();
                setIconState((prevState) => ({ ...prevState, [id]: false }));
            } else {
                video.pause();
                setIconState((prevState) => ({ ...prevState, [id]: true }));
            }
        }
    };

    const toggleView = () => {
        setShowAll((prev) => !prev);
    };

    // Determine how many cards to show
    const displayedCards = showAll ? datas : datas.slice(0, 8);

    return (
        <div className="container-fluid py-5">
            <div className="d-flex justify-content-between align-items-center py-2">
                <h4 className="text-start">Online Training Review</h4>
                <button
                    className="btn btn-sm btn-primary"
                    onClick={toggleView}
                >
                    {showAll ? 'Show Less' : 'Show More'}
                </button>
            </div>
            <div className="row">
                {displayedCards.map((card) => (
                    <div key={card.id} className="col-md-3 col-12 p-2">
                        <div className="h-100 rounded video-card p-2 position-relative">
                            <div className="video-container" style={{ position: 'relative', height: '200px' }}>
                                <div
                                    className="play-pause-overlay"
                                    onClick={() => handlePlayPause(card.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        cursor: 'pointer',
                                        zIndex: 1,
                                        fontSize: '2rem',
                                        color: 'white',
                                    }}
                                >
                                    {iconState[card.id] !== false ? <IoMdPlay /> : <IoIosPause />}
                                </div>
                                <video
                                    ref={el => videoRefs.current[card.id] = el}
                                    src={`${ImageURL}${card.video_path}`}
                                    style={{ width: "100%", height: "200px" }}
                                    controls={false}
                                />
                            </div>
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
                ))}
            </div>
        </div>
    );
}

export default CourseVideoTestimonial;