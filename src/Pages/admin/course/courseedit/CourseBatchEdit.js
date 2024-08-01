import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const data = {
  courseBatch: [
    {
      day: "Monday",
      courseStartData: "2022-01-01",
      courseEndDate: "2022-01-02",
      courseStartTime: "09:00",
      duration: "1 hour",
      noOfSlots: 20,
      amountPayable: 100,
    },
  ],
};

const CourseBatchEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        courseBatch: [
          {
            day: "",
            courseStartData: "",
            courseEndDate: "",
            courseStartTime: "",
            duration: "",
            noOfSlots: "",
            amountPayable: "",
          },
        ],
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
    // const addRow = () => {
    //   formik.setFieldValue("courseBatch", [
    //     ...formik.values.courseBatch,
    //     {
    //       day: "",
    //       courseStartData: "",
    //       courseEndDate: "",
    //       courseStartTime: "",
    //       duration: "",
    //       noOfSlots: "",
    //       amountPayable: "",
    //     },
    //   ]);
    // };
    // const removeRow = () => {
    //   const updatedRow = [...formik.values.courseBatch];
    //   updatedRow.pop();
    //   formik.setFieldValue("courseBatch", updatedRow);
    // };
    useImperativeHandle(ref, () => ({
      courseBatchEdit: formik.handleSubmit,
    }));

    useEffect(() => {
      formik.setValues({ ...data });
    }, []);

    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Batch</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.courseBatch.map((batch, index) => (
              <div className="row px-1" key={index}>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Day</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.day &&
                        formik.errors.courseBatch?.[index]?.day
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="day"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(`courseBatch.${index}.day`)}
                    />
                    {formik.touched.courseBatch?.[index]?.day &&
                      formik.errors.courseBatch?.[index]?.day && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].day}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Course Start Date</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.courseStartData &&
                        formik.errors.courseBatch?.[index]?.courseStartData
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseStartData"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseStartData`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.courseStartData &&
                      formik.errors.courseBatch?.[index]?.courseStartData && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].courseStartData}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Course End Date</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.courseEndDate &&
                        formik.errors.courseBatch?.[index]?.courseEndDate
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseEndDate"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseEndDate`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.courseEndDate &&
                      formik.errors.courseBatch?.[index]?.courseEndDate && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].courseEndDate}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Course Start Time</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="time"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.courseStartTime &&
                        formik.errors.courseBatch?.[index]?.courseStartTime
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="courseStartTime"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseStartTime`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.courseStartTime &&
                      formik.errors.courseBatch?.[index]?.courseStartTime && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].courseStartTime}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Duration</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.duration &&
                        formik.errors.courseBatch?.[index]?.duration
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="duration"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(`courseBatch.${index}.duration`)}
                    />
                    {formik.touched.courseBatch?.[index]?.duration &&
                      formik.errors.courseBatch?.[index]?.duration && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].duration}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>No of Slots</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.noOfSlots &&
                        formik.errors.courseBatch?.[index]?.noOfSlots
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="noOfSlots"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `courseBatch.${index}.noOfSlots`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.noOfSlots &&
                      formik.errors.courseBatch?.[index]?.noOfSlots && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].noOfSlots}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Amount Payable</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.amountPayable &&
                        formik.errors.courseBatch?.[index]?.amountPayable
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="amountPayable"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `courseBatch.${index}.amountPayable`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.amountPayable &&
                      formik.errors.courseBatch?.[index]?.amountPayable && (
                        <div className="invalid-feedback">
                          {formik.errors.courseBatch[index].amountPayable}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </form>
          {/* <div className="container ">
            <button className="btn btn-sm btn-primary mx-3" onClick={addRow}>
              Add More
            </button>
            {formik.values.courseBatch.length > 1 && (
              <button className="btn btn-sm btn-danger" onClick={removeRow}>
                X
              </button>
            )}
          </div> */}
        </div>
      </div>
    );
  }
);

export default CourseBatchEdit;
