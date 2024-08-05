import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseBatch = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      courseBatch: Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required("Date is required*"),
          day: Yup.string().required("Day is required*"),
          courseStartDate: Yup.string().required(
            "Course Start Date is required*"
          ),
          courseEndDate: Yup.string().required("Course End Date is required*"),
          courseStartTime: Yup.string().required(
            "Course Start Time is required*"
          ),
          courseEndTime: Yup.string().required("Course End Time is required*"),
          duration: Yup.string().required("Duration is required*"),
        })
      ),
    });
    const formik = useFormik({
      initialValues: {
        courseBatch: [
          {
            date: "",
            day: "",
            courseStartDate: "",
            courseEndDate: "",
            courseStartTime: "",
            courseEndTime: "",
            duration: "",
          },
        ],
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

    const calculateDuration = (startTime, endTime) => {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const start = new Date(0, 0, 0, startHour, startMinute, 0);
      const end = new Date(0, 0, 0, endHour, endMinute, 0);

      let diff = (end - start) / 60000; // difference in minutes
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      return `${hours}h ${minutes}m`;
    };

    const handleTimeChange = (index, field, value) => {
      formik.setFieldValue(`courseBatch.${index}.${field}`, value);

      const startTime = formik.values.courseBatch[index].courseStartTime;
      const endTime = formik.values.courseBatch[index].courseEndTime;

      if (startTime && endTime) {
        const duration = calculateDuration(startTime, endTime);
        formik.setFieldValue(`courseBatch.${index}.duration`, duration);
      }
    };

    const addRow = () => {
      formik.setFieldValue("courseBatch", [
        ...formik.values.courseBatch,
        {
          date: "",
          day: "",
          courseStartDate: "",
          courseEndDate: "",
          courseStartTime: "",
          courseEndTime: "",
          duration: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.courseBatch];
      updatedRow.pop();
      formik.setFieldValue("courseBatch", updatedRow);
    };
    useImperativeHandle(ref, () => ({
      courseBatch: formik.handleSubmit,
    }));
    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Batch</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.courseBatch.map((batch, index) => (
              <div className="row px-1" key={index}>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Date</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.date &&
                        formik.errors.courseBatch?.[index]?.date
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`courseBatch.${index}.date`)}
                    />
                    {formik.touched.courseBatch?.[index]?.date &&
                      formik.errors.courseBatch?.[index]?.date && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].date}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Day</label>
                  </div>
                  <div className="input-group mb-3">
                    <select
                      className={`form-select ${
                        formik.touched.courseBatch?.[index]?.day &&
                        formik.errors.courseBatch?.[index]?.day
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`courseBatch.${index}.day`)}
                    >
                      <option value="" label="Select day" />
                      <option value="Monday" label="Monday" />
                      <option value="Tuesday" label="Tuesday" />
                      <option value="Wednesday" label="Wednesday" />
                      <option value="Thursday" label="Thursday" />
                      <option value="Friday" label="Friday" />
                    </select>
                    {formik.touched.courseBatch?.[index]?.day &&
                      formik.errors.courseBatch?.[index]?.day && (
                        <div className="invalid-feedback text-start">
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
                        formik.touched.courseBatch?.[index]?.courseStartDate &&
                        formik.errors.courseBatch?.[index]?.courseStartDate
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseStartDate`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.courseStartDate &&
                      formik.errors.courseBatch?.[index]?.courseStartDate && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].courseStartDate}
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
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseEndDate`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.courseEndDate &&
                      formik.errors.courseBatch?.[index]?.courseEndDate && (
                        <div className="invalid-feedback text-start">
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
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseStartTime`
                      )}
                      onChange={(e) =>
                        handleTimeChange(
                          index,
                          "courseStartTime",
                          e.target.value
                        )
                      }
                    />
                    {formik.touched.courseBatch?.[index]?.courseStartTime &&
                      formik.errors.courseBatch?.[index]?.courseStartTime && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].courseStartTime}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Course End Time</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="time"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.courseEndTime &&
                        formik.errors.courseBatch?.[index]?.courseEndTime
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        `courseBatch.${index}.courseEndTime`
                      )}
                      onChange={(e) =>
                        handleTimeChange(index, "courseEndTime", e.target.value)
                      }
                    />
                    {formik.touched.courseBatch?.[index]?.courseEndTime &&
                      formik.errors.courseBatch?.[index]?.courseEndTime && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].courseEndTime}
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
                      {...formik.getFieldProps(`courseBatch.${index}.duration`)}
                      readOnly
                    />
                    {formik.touched.courseBatch?.[index]?.duration &&
                      formik.errors.courseBatch?.[index]?.duration && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].duration}
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
                      type="number"
                      className={`form-control ${
                        formik.touched.courseBatch?.[index]?.amountPayable &&
                        formik.errors.courseBatch?.[index]?.amountPayable
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        `courseBatch.${index}.amountPayable`
                      )}
                    />
                    {formik.touched.courseBatch?.[index]?.amountPayable &&
                      formik.errors.courseBatch?.[index]?.amountPayable && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.courseBatch[index].amountPayable}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
            <div className="container">
              <button
                className="btn btn-sm btn-primary mx-3"
                type="button"
                onClick={addRow}
              >
                Add More
              </button>
              {formik.values.courseBatch.length > 1 && (
                <button
                  className="btn btn-sm btn-danger"
                  type="button"
                  onClick={removeRow}
                >
                  Remove
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default CourseBatch;
