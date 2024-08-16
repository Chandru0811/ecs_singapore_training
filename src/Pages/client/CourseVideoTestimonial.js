import React, { useEffect, useState, useRef } from "react";
import api from "../../config/BaseUrl";
import ImageURL from "../../config/ImageURL";
import { IoIosPause, IoMdPlay } from "react-icons/io";

function CourseVideoTestimonial() {
  const [datas, setDatas] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const videoRefs = useRef([]);

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

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];

    if (video) {
      if (video.paused) {
        // Pause any other playing videos
        videoRefs.current.forEach((v, i) => {
          if (v && i !== index) {
            v.pause();
          }
        });

        // Play the clicked video
        video.play();
        setPlayingVideoId(index);
      } else {
        // Pause the clicked video
        video.pause();
        setPlayingVideoId(null);
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
        {datas.length > 8 && (
          <button className="btn btn-sm btn-primary" onClick={toggleView}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
      <div className="row">
        {displayedCards && displayedCards.length > 0 ? (
          displayedCards.map((card, index) => (
            <div key={card.id} className="col-md-3 col-12 p-2">
              <div className="h-100 rounded video-card p-2 position-relative">
                <div
                  className="video-container"
                  style={{ position: "relative", height: "200px" }}
                >
                  <div
                    className="play-pause-overlay"
                    onClick={() => handlePlayPause(index)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                      zIndex: 1,
                      fontSize: "2rem",
                      color: "white",
                    }}
                  >
                    {playingVideoId === index ? <IoIosPause /> : <IoMdPlay />}
                  </div>
                  <video
                    ref={(el) => (videoRefs.current[index] = el)} // Assign each video its respective ref
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
          ))
        ) : (
          <div className="container-fluid p-5">
            <div className="row">
              <div className="col-12 text-center">
                <h3>Online training review unavailable</h3>
                <p>
                  We are working to add new online training review in this
                  section. Please check back later.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseVideoTestimonial;
