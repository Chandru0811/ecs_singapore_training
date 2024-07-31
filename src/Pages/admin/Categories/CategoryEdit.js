import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";

function CategoryEdit({ tableData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => {
    formik.setValues(tableData);
    setShow(true);
  };

  const formik = useFormik({
    initialValues: {
      categoryImg: null,
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("categoryImg", values.categoryImg);
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Simulate form submission
      console.log("Submitted Data:", values);

      handleClose();
    },
  });

  useEffect(() => {
    formik.setValues(tableData);
  }, [tableData]);

  return (
    <>
      <span onClick={handleShow}>
        <FaEdit />
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                name="categoryImg"
                className={`form-control ${
                  formik.touched.categoryImg && formik.errors.categoryImg
                    ? "is-invalid"
                    : ""
                }`}
                onChange={(event) => {
                  formik.setFieldValue(
                    "categoryImg",
                    event.currentTarget.files[0]
                  );
                }}
              />
              {formik.touched.categoryImg && formik.errors.categoryImg && (
                <div className="invalid-feedback">
                  {formik.errors.categoryImg}
                </div>
              )}
            </div>
            <div className="mb-2">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="title"
                className={`form-control ${
                  formik.touched.title && formik.errors.title
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="invalid-feedback">{formik.errors.title}</div>
              )}
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                {...formik.getFieldProps("description")}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryEdit;
