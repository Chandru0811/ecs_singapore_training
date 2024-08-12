import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/BaseUrl";

const CourseFAQ = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      faq: Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required("Title is required*"),
          answer: Yup.string().required("Description is required*"),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        faq: [
          {
            question: "",
            answer: "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);

        try {
          const response = await api.post(
            `/courses/${formData.id}/faqs`,
            values
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...values }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("Error submitting form");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const addRow = () => {
      formik.setFieldValue("faq", [
        ...formik.values.faq,
        {
          question: "",
          answer: "",
        },
      ]);
    };

    const removeRow = () => {
      if (formik.values.faq.length > 1) {
        formik.setFieldValue("faq", formik.values.faq.slice(0, -1));
      }
    };

    useImperativeHandle(ref, () => ({
      courseFaq: formik.handleSubmit,
    }));

    useEffect(() => {
      if (formData?.faq) {
        formik.setValues({
          faq: formData.faq,
        });
      }
    }, [formData, formik]);

    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course FAQ</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.faq.map((faqItem, index) => (
              <div className="row px-1" key={index}>
                <div className="col-md-6 col-12 mb-3 text-start">
                  <label className="form-label ">Title</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.faq?.[index]?.question &&
                        formik.errors.faq?.[index]?.question
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label={`question-${index}`}
                      {...formik.getFieldProps(`faq.${index}.question`)}
                    />
                    {formik.touched.faq?.[index]?.question &&
                      formik.errors.faq?.[index]?.question && (
                        <div className="invalid-feedback">
                          {formik.errors.faq[index].question}
                        </div>
                      )}
                  </div>
                </div>

                <div className="col-md-6 col-12 mb-3 text-start">
                  <label className="form-label">Description</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.faq?.[index]?.answer &&
                        formik.errors.faq?.[index]?.answer
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label={`answer-${index}`}
                      {...formik.getFieldProps(`faq.${index}.answer`)}
                    />
                    {formik.touched.faq?.[index]?.answer &&
                      formik.errors.faq?.[index]?.answer && (
                        <div className="invalid-feedback">
                          {formik.errors.faq[index].answer}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
            <div className="container">
              <button
                type="button"
                className="btn btn-sm btn-primary mx-2"
                onClick={addRow}
              >
                Add More
              </button>
              {formik.values.faq.length > 1 && (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={removeRow}
                >
                  Remove Last
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default CourseFAQ;
