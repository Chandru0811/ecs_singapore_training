import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CourseFAQ = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        faq: [
          {
            faQTitle: "",
            faqSubDescription: "",
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
    const addRow = () => {
      formik.setFieldValue("faq", [
        ...formik.values.faq,
        {
          faQTitle: "",
          faqSubDescription: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.faq];
      updatedRow.pop();
      formik.setFieldValue("faq", updatedRow);
    };
    useImperativeHandle(ref, () => ({
      courseFaq: formik.handleSubmit,
    }));
    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course FAQ</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.faq.map((faqItem, index) => (
              <div className="row px-1" key={index}>
                <div className="col-md-6 col-12 mb-3">
                  <div className="text-start">
                    <label>Title</label>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.faq?.[index]?.faQTitle &&
                        formik.errors.faq?.[index]?.faQTitle
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="faQTitle"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(`faq.${index}.faQTitle`)}
                    />
                    {formik.touched.faq?.[index]?.faQTitle &&
                      formik.errors.faq?.[index]?.faQTitle && (
                        <div className="invalid-feedback">
                          {formik.errors.faq[index].faQTitle}
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
                      className={`form-control ${
                        formik.touched.faq?.[index]?.faqSubDescription &&
                        formik.errors.faq?.[index]?.faqSubDescription
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="faqSubDescription"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps(
                        `faq.${index}.faqSubDescription`
                      )}
                    />
                    {formik.touched.faq?.[index]?.faqSubDescription &&
                      formik.errors.faq?.[index]?.faqSubDescription && (
                        <div className="invalid-feedback">
                          {formik.errors.faq[index].faqSubDescription}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </form>
          <div className="container">
            <button className="btn btn-sm btn-primary mx-2" onClick={addRow}>
              Add more
            </button>
            {formik.values.faq.length > 1 && (
              <button className="btn btn-sm btn-danger" onClick={removeRow}>
                X
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default CourseFAQ;
