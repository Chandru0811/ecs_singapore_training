import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const EnrollModel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    name: Yup.string().required("*Name is required"),
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    number: Yup.string().required("*Number is required"),
    course: Yup.string().required("*Course is required"),
    description: Yup.string().required("*Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
      course: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form values:", values); // Log form values to console
      handleClose(); // Close the modal after form submission
    },
  });

  return (
    <>
      <button className="btn enroll-btn" onClick={handleShow}>
        Enroll Now
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <div className="col-12 mb-2 text-start">
                  <label htmlFor="name" className="form-label mb-0">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ borderRadius: "3px" }}
                    placeholder="Enter name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
                <div className="col-12 mb-2 text-start">
                  <label htmlFor="email" className="form-label mb-0">
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ borderRadius: "3px" }}
                    placeholder="Enter email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-12 mb-2 text-start">
                  <label htmlFor="number" className="form-label mb-0">
                    Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    
                    className={`form-control ${
                      formik.touched.number && formik.errors.number
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ borderRadius: "3px" }}
                    placeholder="Enter number"
                    {...formik.getFieldProps("number")}
                  />
                  {formik.touched.number && formik.errors.number && (
                    <div className="invalid-feedback">
                      {formik.errors.number}
                    </div>
                  )}
                </div>
                <div className="col-12 mb-2 text-start">
                  <label htmlFor="course" className="form-label mb-0">
                    Course<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("course")}
                    name="course"
                    className={`form-select ${
                      formik.touched.course && formik.errors.course
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option value="">Select a course</option>
                    <option value="Java">Java</option>
                    {/* Add more options as needed */}
                  </select>
                  {formik.touched.course && formik.errors.course && (
                    <div className="invalid-feedback">
                      {formik.errors.course}
                    </div>
                  )}
                </div>
                <div className="col-md-12 text-start">
                  <label className="form-label mb-0">
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ borderRadius: "3px" }}
                    placeholder="Enter description"
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EnrollModel;
