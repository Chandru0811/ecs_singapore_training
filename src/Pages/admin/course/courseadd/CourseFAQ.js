import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseFAQ = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        faQTitle: "",
        faQSubHeading: "",
        faqSubDescription: "",
      },
      // validationSchema: validationSchema,
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
      courseFaq: formik.handleSubmit,
    }));
    return (
      <div className="container my-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Title</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.faQTitle && formik.errors.faQTitle
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="faQTitle"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("faQTitle")}
                  />
                  {formik.touched.faQTitle && formik.errors.faQTitle && (
                    <div className="invalid-feedback">
                      {formik.errors.faQTitle}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Subtitle</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.faQSubHeading &&
                      formik.errors.faQSubHeading
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="faQSubHeading"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("faQSubHeading")}
                  />
                  {formik.touched.faQSubHeading &&
                    formik.errors.faQSubHeading && (
                      <div className="invalid-feedback">
                        {formik.errors.faQSubHeading}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Description</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.faqSubDescription &&
                      formik.errors.faqSubDescription
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="faqSubDescription"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("faqSubDescription")}
                  />
                  {formik.touched.faqSubDescription &&
                    formik.errors.faqSubDescription && (
                      <div className="invalid-feedback">
                        {formik.errors.faqSubDescription}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default CourseFAQ;
