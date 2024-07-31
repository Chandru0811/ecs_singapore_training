import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseBenefit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        day: "",
        courseStartData: "",
        courseEndDate: "",
        courseStartTime: "",
        duration: "",
        noOfSlots: "",
        amountPayable: "",
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
      courseBenefit: formik.handleSubmit,
    }));
    return (
      <div className="container my-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Benefits</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.benefitsTitle &&
                      formik.errors.benefitsTitle
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="benefitsTitle"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("benefitsTitle")}
                  />
                  {formik.touched.benefitsTitle &&
                    formik.errors.benefitsTitle && (
                      <div className="invalid-feedback">
                        {formik.errors.benefitsTitle}
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
                      formik.touched.benefitsSubtitle &&
                      formik.errors.benefitsSubtitle
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="benefitsSubtitle"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("benefitsSubtitle")}
                  />
                  {formik.touched.benefitsSubtitle &&
                    formik.errors.benefitsSubtitle && (
                      <div className="invalid-feedback">
                        {formik.errors.benefitsSubtitle}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Key Features</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.keyFeatures && formik.errors.keyFeatures
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="keyFeatures"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("keyFeatures")}
                  />
                  {formik.touched.keyFeatures && formik.errors.keyFeatures && (
                    <div className="invalid-feedback">
                      {formik.errors.keyFeatures}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Key Points</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.keyFeaturesPoints &&
                      formik.errors.keyFeaturesPoints
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="keyFeaturesPoints"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("keyFeaturesPoints")}
                  />
                  {formik.touched.keyFeaturesPoints &&
                    formik.errors.keyFeaturesPoints && (
                      <div className="invalid-feedback">
                        {formik.errors.keyFeaturesPoints}
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

export default CourseBenefit;
