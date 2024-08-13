import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/BaseUrl";

const CourseBatch = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      batches: Yup.array().of(
        Yup.object().shape({
          date: Yup.string().required("Date is required*"),
          day: Yup.string().required("Day is required*"),
          // courseStartDate: Yup.string().required(
          //   "Course Start Date is required*"
          // ),
          // courseEndDate: Yup.string().required("Course End Date is required*"),
          start_time: Yup.string().required("Course Start Time is required*"),
          end_time: Yup.string().required("Course End Time is required*"),
          duration: Yup.string().required("Duration is required*"),
        })
      ),
    });
    const formik = useFormik({
      initialValues: {
        batches: [
          {
            date: "",
            day: "",
            start_time: "",
            end_time: "",
            duration: "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log("object", values);
        console.log("form ", formData);
        setLoadIndicators(true);
        try {
          const response = await api.post(
            `/courses/${formData.id}/batches`,
            values
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values,  }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("error");
        } finally {
          setLoadIndicators(false);
        }
      },
    });
   

    const calculateDuration = (startTime, endTime) => {
      const start = new Date(`1970-01-01T${startTime}:00Z`);
      const end = new Date(`1970-01-01T${endTime}:00Z`);

      const diff = Math.abs(end - start) / 60000; // difference in minutes
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;

      return `${hours}h ${minutes}m`;
    };

    const handleTimeChange = (index, field, value) => {
      formik.setFieldValue(`batches.${index}.${field}`, value);

      const startTime = field === "start_time" ? value : formik.values.batches[index].start_time;
      const endTime = field === "end_time" ? value : formik.values.batches[index].end_time;

      if (startTime && endTime) {
        const duration = calculateDuration(startTime, endTime);
        formik.setFieldValue(`batches.${index}.duration`, duration);
      }
    };

    const addRow = () => {
      formik.setFieldValue("batches", [
        ...formik.values.batches,
        {
          date: "",
          day: "",
          // courseStartDate: "",
          // courseEndDate: "",
          start_time: "",
          end_time: "",
          duration: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.batches];
      updatedRow.pop();
      formik.setFieldValue("batches", updatedRow);
    };
    useImperativeHandle(ref, () => ({
      courseBatch: formik.handleSubmit,
    }));

    useEffect(()=>{
      if(formData.batches){
        formik.setFieldValue("batches",formData.batches)}
    },[])
    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Batch</h4>
          <form onSubmit={formik.handleSubmit}>
            {(formik.values.batches).map((batch, index) => (
              <div className="row px-1" key={index}>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Date</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.batches?.[index]?.date &&
                        formik.errors.batches?.[index]?.date
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`batches.${index}.date`)}
                    />
                    {formik.touched.batches?.[index]?.date &&
                      formik.errors.batches?.[index]?.date && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.batches[index].date}
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
                        formik.touched.batches?.[index]?.day &&
                        formik.errors.batches?.[index]?.day
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`batches.${index}.day`)}
                    >
                      <option value="" label="Select day" />
                      <option value="Monday" label="Monday" />
                      <option value="Tuesday" label="Tuesday" />
                      <option value="Wednesday" label="Wednesday" />
                      <option value="Thursday" label="Thursday" />
                      <option value="Friday" label="Friday" />
                    </select>
                    {formik.touched.batches?.[index]?.day &&
                      formik.errors.batches?.[index]?.day && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.batches[index].day}
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
                        formik.touched.batches?.[index]?.start_time &&
                        formik.errors.batches?.[index]?.start_time
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`batches.${index}.start_time`)}
                      onChange={(e) =>
                        handleTimeChange(index, "start_time", e.target.value)
                      }
                    />
                    {formik.touched.batches?.[index]?.start_time &&
                      formik.errors.batches?.[index]?.start_time && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.batches[index].start_time}
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
                        formik.touched.batches?.[index]?.end_time &&
                        formik.errors.batches?.[index]?.end_time
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`batches.${index}.end_time`)}
                      onChange={(e) =>
                        handleTimeChange(index, "end_time", e.target.value)
                      }
                    />
                    {formik.touched.batches?.[index]?.end_time &&
                      formik.errors.batches?.[index]?.end_time && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.batches[index].end_time}
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
                        formik.touched.batches?.[index]?.duration &&
                        formik.errors.batches?.[index]?.duration
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(`batches.${index}.duration`)}
                      readOnly
                    />
                    {formik.touched.batches?.[index]?.duration &&
                      formik.errors.batches?.[index]?.duration && (
                        <div className="invalid-feedback text-start">
                          {formik.errors.batches[index].duration}
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
              {formik.values?.courseBatch?.length > 1 && (
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
