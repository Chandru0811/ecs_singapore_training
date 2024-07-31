import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseBatch = forwardRef(
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
      courseBatch: formik.handleSubmit,
    }));
    return (
      <div className="container my-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="container-fluid">
              <div className="row px-1">
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>day</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control   ${
                        formik.touched.day && formik.errors.day
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="day"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("day")}
                    />
                    {formik.touched.day && formik.errors.day && (
                      <div className="invalid-feedback">
                        {formik.errors.day}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>courseStartData</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.courseStartData &&
                        formik.errors.courseStartData
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseStartData"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("courseStartData")}
                    />
                    {formik.touched.courseStartData &&
                      formik.errors.courseStartData && (
                        <div className="invalid-feedback">
                          {formik.errors.courseStartData}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>courseEndDate</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.courseEndDate &&
                        formik.errors.courseEndDate
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseEndDate"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("courseEndDate")}
                    />
                    {formik.touched.courseEndDate &&
                      formik.errors.courseEndDate && (
                        <div className="invalid-feedback">
                          {formik.errors.courseEndDate}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>courseStartTime</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.courseStartTime &&
                        formik.errors.courseStartTime
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseStartTime"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("courseStartTime")}
                    />
                    {formik.touched.courseStartTime &&
                      formik.errors.courseStartTime && (
                        <div className="invalid-feedback">
                          {formik.errors.courseStartTime}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>duration</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.duration && formik.errors.duration
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="duration"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("duration")}
                    />
                    {formik.touched.duration && formik.errors.duration && (
                      <div className="invalid-feedback">
                        {formik.errors.duration}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>noOfSlots</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.noOfSlots && formik.errors.noOfSlots
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="noOfSlots"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("noOfSlots")}
                    />
                    {formik.touched.noOfSlots && formik.errors.noOfSlots && (
                      <div className="invalid-feedback">
                        {formik.errors.noOfSlots}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>amountPayable</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control   ${
                        formik.touched.amountPayable &&
                        formik.errors.amountPayable
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="amountPayable"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("amountPayable")}
                    />
                    {formik.touched.amountPayable &&
                      formik.errors.amountPayable && (
                        <div className="invalid-feedback">
                          {formik.errors.amountPayable}
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

export default CourseBatch;
