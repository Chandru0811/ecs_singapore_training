import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

const validationSchema = Yup.object({
  categoryImg: Yup.mixed().required("Image is required"),
  title: Yup.string().required("title is required"),
  description: Yup.string(),
});

function CategoryAdd() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      categoryImg: null,
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
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

  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={handleShow}>
        Add Category
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label className="form-label">
                Image<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
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
            </div>
            <div className="mb-2">
              <label className="form-label">
                Title<span className="text-danger">*</span>
              </label>
              <div className="mb-3">
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
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  {...formik.getFieldProps("description")}
                />
              </div>
            </div>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button className="btn btn-sm" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CategoryAdd;
