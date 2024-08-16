import React, { useEffect, useState, useRef } from "react";
import AddCourseVideoTestimonial from "../Course Video Testimonial/AddCourseVideoTestimonial";
import EditCourseVideoTestimonial from "./EditCourseVideoTestimonial";
import DeleteModel from "../../../components/DeleteModel";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";
import { IoIosPause, IoMdPlay } from "react-icons/io";
import toast from "react-hot-toast";

function CourseVideoTestimonial() {
  const [datas, setDatas] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [iconState, setIconState] = useState({});
  const videoRefs = useRef({});
  const [loader, setLoader] = useState(true);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await api.get("videotestimonial");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePublish = async () => {
    try {
      setLoadIndicator(true);
      const response = await api.post("publish/videotestimonial");
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      getData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setLoadIndicator(false);
    }
  };

  const handlePlayPause = (id) => {
    const video = videoRefs.current[id];

    // Check if the video exists
    if (video) {
      if (video.paused) {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          if (key !== id) {
            videoRefs.current[key].pause();
            setIconState((prevState) => ({ ...prevState, [key]: true }));
          }
        });

        // Play the selected video
        video.play();
        setIconState({ [id]: false });
      } else {
        // Pause the selected video
        video.pause();
        setIconState({ [id]: true });
      }
    }
  };

  return (
    <>
      {loader ? (
        <section class="dots-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </section>
      ) : (
        <div>
          <div className="card-header d-flex align-items-center justify-content-between p-2 bg-light">
            <h3 className="fw-bold">Online Training Review</h3>
            <div>
              <AddCourseVideoTestimonial onSuccess={getData} />
              <button
                type="submit"
                className="btn btn-danger mx-2"
                disabled={loadIndicator}
                onClick={handlePublish}
              >
                {loadIndicator ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span></span>
                )}
                Publish
              </button>
            </div>
          </div>
          <div className="row m-0 p-3">
            {datas.map((card) => (
              <div key={card.id} className="col-md-3 col-12 p-2">
                <div className="h-100 rounded video-card p-2 position-relative">
                  <div className="d-flex justify-content-between">
                    <EditCourseVideoTestimonial
                      id={card.id}
                      onSuccess={getData}
                    />
                    <DeleteModel
                      className="text-danger"
                      onSuccess={getData}
                      path={`videotestimonial/${card.id}`}
                    />
                  </div>
                  <div
                    className="video-container"
                    style={{ position: "relative", height: "200px" }}
                  >
                    <div
                      className="play-pause-overlay"
                      onClick={() => handlePlayPause(card.id)}
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
                      {iconState[card.id] !== false ? (
                        <IoMdPlay />
                      ) : (
                        <IoIosPause />
                      )}
                    </div>
                    <video
                      ref={(el) => (videoRefs.current[card.id] = el)}
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
                    <p className="card-text text-secondary">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CourseVideoTestimonial;
