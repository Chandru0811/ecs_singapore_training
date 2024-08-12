import React, { forwardRef, useImperativeHandle,useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CourseBenefitEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      benefit: Yup.string().required("Title is required"),
      features: Yup.array().of(
        Yup.string().required("Key feature is required")
      ),
    });

    const formik = useFormik({
      initialValues: {
        benefit: "",
        features: [""],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        const payLoad = {
          benefit: values.benefit,
          features: values.features,
        };

        try {
          const response = await api.post(
            `/courses/${formData.id}/benefits`,
            payLoad
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
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
      formik.setFieldValue("features", [...formik.values.features, ""]);
    };

    const removeRow = () => {
      const updatedFeatures = formik.values.features.slice(0, -1);
      formik.setFieldValue("features", updatedFeatures);
    };

    useImperativeHandle(ref, () => ({
      courseBenefitEdit: formik.handleSubmit,
    }));

    useEffect(() => {
      if (formData) {
        formik.setValues({
          benefit: formData.benefits,
          features: formData.features || [""],
        });
      }
    }, [formData]);

    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Benefit</h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Benefits</label>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.benefit && formik.errors.benefit
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="benefit"
                    {...formik.getFieldProps("benefit")}
                  />
                  {formik.touched.benefit && formik.errors.benefit && (
                    <div className="invalid-feedback text-start">
                      {formik.errors.benefit}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                {formik.values.features.map((feature, index) => (
                  <div key={index}>
                    <div className="text-start">
                      <label>Key Feature {index + 1}</label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.features?.[index] &&
                          formik.errors.features?.[index]
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label={`keyFeature-${index}`}
                        {...formik.getFieldProps(`features.${index}`)}
                      />
                      {formik.touched.features?.[index] &&
                        formik.errors.features?.[index] && (
                          <div className="invalid-feedback text-start">
                            {formik.errors.features[index]}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container d-flex justify-content-end">
              <button className="btn btn-sm btn-primary mx-2" type="button" onClick={addRow}>
                Add More
              </button>
              {formik.values.features.length > 1 && (
                <button className="btn btn-sm btn-danger mx-2" type="button" onClick={removeRow}>
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

export default CourseBenefitEdit;
