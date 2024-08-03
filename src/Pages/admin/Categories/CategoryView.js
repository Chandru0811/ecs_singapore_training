import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";

function CategoryView({ id }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    try {
      const response = await api.get(`/category/${id}`);
      setData(response.data.data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setShow(true);
    }
  };

  return (
    <>
      <span onClick={handleShow}>
        <FaEye />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : <img src={`${ImageURL}${data.logo_path}`} alt={data.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Title</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.title}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Description</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryView;