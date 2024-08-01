import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseSyllabus = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        session: "",
        lessons: [
          {
            lesson: "",
          },
        ],
      },
      // validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object", values);
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
    const addRow = () => {
      formik.setFieldValue("lessons", [
        ...formik.values.lessons,
        {
          lesson: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.lessons];
      updatedRow.pop();
      formik.setFieldValue("lessons", updatedRow);
    };
    useImperativeHandle(ref, () => ({
      courseSyllabus: formik.handleSubmit,
    }));
    return (
      <div className="container my-4">
        <div className="container-fluid">
        <h4 className="mb-4 fw-bold text-start">Course Syllabus</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Session</label>
                </div>
                <div className="input-group mb-3">
                  <select
                    type="text"
                    className={`form-select   ${
                      formik.touched.session && formik.errors.session
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="session"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("session")}
                  >
                    <option value={""}></option>
                    {Array.from({ length: 100 }, (_, i) => i + 1).map(
                      (value) => (
                        <option key={value} value={`session${value}`} className="py-1">
                          {`Session ${value}`}
                        </option>
                      )
                    )}
                  </select>
                  {formik.touched.session && formik.errors.session && (
                    <div className="invalid-feedback">
                      {formik.errors.session}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                {formik.values.lessons.map((lesson, index) => (
                  <div key={index}>
                    <div className="text-start">
                      <label>Lesson</label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.lessons?.[index]?.lesson &&
                          formik.errors.lessons?.[index]?.lesson
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label={`lesson-${index}`}
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps(`lessons.${index}.lesson`)}
                      />
                      {formik.touched.lessons?.[index]?.lesson &&
                        formik.errors.lessons?.[index]?.lesson && (
                          <div className="invalid-feedback">
                            {formik.errors.lessons[index].lesson}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container d-flex justify-content-end ">
              <button className="btn btn-sm btn-primary mx-1" onClick={addRow}>
                Add more
              </button>
              {formik.values.lessons.length > 1 && (
                <button className="btn btn-danger btn-sm" onClick={removeRow}>
                  X
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default CourseSyllabus;
