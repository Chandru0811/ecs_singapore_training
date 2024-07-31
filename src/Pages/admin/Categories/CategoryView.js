import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import courseImg from "../../../assets/client/pythone.png";
import { FaEye } from "react-icons/fa";
import { useFormik } from "formik";

function CategoryView({ tableData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    formik.setValues(tableData);
    setShow(true);
  };

  const formik = useFormik({
    initialValues: {
      image: courseImg,
      title: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
                    <img src={formik.values.image} alt="category" />
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
                      : {formik.values.title}
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
                      : {formik.values.description}
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
