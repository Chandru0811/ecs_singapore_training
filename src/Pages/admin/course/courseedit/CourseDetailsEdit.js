import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const data = {
  logo: "",
  title: "Test Course",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lacus vel turpis consectetur luctus.",
  category: "Technology",
  offerPrice: 10,
  orginalPrice: 100,
};

const CourseDetailsEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object({
      logo: Yup.string().required("Logo is required*"),
      title: Yup.string().required("Title is required*"),
      description: Yup.string().required("Description is required*"),
      category: Yup.string().required("Category is required*"),
      offerPrice: Yup.number()
        .required("Offer Price is required*")
        .positive("Offer Price must be a positive number"),
      orginalPrice: Yup.number()
        .required("Original Price is required*")
        .positive("Original Price must be a positive number"),
    });

    const formik = useFormik({
      initialValues: {
        logo: "",
        title: "",
        description: "",
        category: "",
        offerPrice: "",
        orginalPrice: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object", values);
        handleNext();
        // setLoadIndicators(true);
        // try {
        //   const formData = new FormData();

        //   // Add each data field manually to the FormData object
        //   formData.append("role", values.role);
        //   formData.append("teacherName", values.teacherName);
        //   formData.append("dateOfBirth", values.dateOfBirth);
        //   formData.append("idType", values.idType);
        //   formData.append("idNo", values.idNo);
        //   formData.append("citizenship", values.citizenship);
        //   formData.append("shortIntroduction", values.shortIntroduction);
        //   formData.append("gender", values.gender);
        //   formData.append("file", values.file);

        //   const response = await api.post(
        //     "/createUserWithProfileImage",
        //     formData,
        //     {
        //       headers: {
        //         "Content-Type": "multipart/form-data",
        //       },
        //     }
        //   );

        //   if (response.status === 201) {
        //     const user_id = response.data.user_id;
        //     toast.success(response.data.message);
        //     setFormData((prv) => ({ ...prv, ...values, user_id }));
        //     handleNext();
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   toast.error(error);
        // }finally {
        //   setLoadIndicators(false);
        // }
      },
    });
    useImperativeHandle(ref, () => ({
      courseDetailsEdit: formik.handleSubmit,
    }));

    useEffect(() => {
      formik.setValues({ ...data });
    }, []);

    return (
      <div className="container my-5">
        <h4 className="mb-4 fw-bold text-start">Course Batch</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>
                    Logo<span className="text-danger">*</span>
                  </label>
                </div>
                <input
                  className="form-control"
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.logo}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Title</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.title}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Category</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                />
                {formik.touched.category && formik.errors.category && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.category}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Description</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.description}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Orginal Price</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="orginalPrice"
                  name="orginalPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orginalPrice}
                />
                {formik.touched.orginalPrice && formik.errors.orginalPrice && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.orginalPrice}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Offer Price</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="offerPrice"
                  name="offerPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.offerPrice}
                />
                {formik.touched.offerPrice && formik.errors.offerPrice && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.offerPrice}</small>
                  </div>
                )}
              </div>

              {/* <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-sm btn-primary">
              Submit
            </button>
          </div> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default CourseDetailsEdit;
