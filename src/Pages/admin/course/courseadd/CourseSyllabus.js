import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseSyllabus = forwardRef(
    ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
      const formik = useFormik({
        initialValues: {
          session:"",
          lesson:""
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
          console.log("object", values);
        //   handleNext();
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
        courseSyllabus: formik.handleSubmit,
      }));
      return (
        <div className="container my-5">
            <form onSubmit={formik.handleSubmit}>
              <div className="container-fluid">
                <div className="row px-1">
                  <div className="col-md-6 col-12 mb-3">
                    <div className="text-start">
                      <label>Session</label>
                    </div>
                    <div className="input-group mb-3">
                      <select
                        type="text"
                        className={`form-control   ${
                          formik.touched.session && formik.errors.session
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="session"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("session")}
                      >
                        <option value={""}></option>
                      </select>
                      {formik.touched.session && formik.errors.session && (
                        <div className="invalid-feedback">
                          {formik.errors.session}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="text-start">
                      <label>Lesson</label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className={`form-control   ${
                          formik.touched.lesson &&
                          formik.errors.lesson
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="lesson"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("lesson")}
                      />
                      {formik.touched.lesson &&
                        formik.errors.lesson && (
                          <div className="invalid-feedback">
                            {formik.errors.lesson}
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
  

export default CourseSyllabus;
