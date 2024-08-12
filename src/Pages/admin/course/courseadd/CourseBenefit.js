import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/BaseUrl";

const CourseBenefit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      benefit: Yup.string().required("Title is required"),
      features: Yup.array().of(
        Yup.object().shape({
          keyFeatures: Yup.string().required("Key feature is required"),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        benefit: "",
        features: [
          {
            keyFeatures: "",
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log("object", values);
        console.log("form ", formData);
        setLoadIndicators(true);
        const payLoad = {
          benefit: values.benefit,
          features: values.features.map((key, i) => key.keyFeatures),
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
          toast.error("error");
        } finally {
          setLoadIndicators(false);
        }
      },
    });
    const addRow = () => {
      formik.setFieldValue("features", [
        ...formik.values.features,
        {
          keyFeatures: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.features];
      updatedRow.pop();
      formik.setFieldValue("features", updatedRow);
    };

    useImperativeHandle(ref, () => ({
      courseBenefit: formik.handleSubmit,
    }));

    useEffect(()=>{
      if(formData){
        formik.setValues(formData)
        formik.setFieldValue("features",formData.features)}
    },[])
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
                    className={`form-control   ${
                      formik.touched.benefit && formik.errors.benefit
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="benefit"
                    aria-describedby="basic-addon1"
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
                {formik.values.features?.map((feature, index) => (
                  <div key={index}>
                    <div className="text-start">
                      <label>Key Features</label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.features?.[index]?.keyFeatures &&
                          formik.errors.features?.[index]?.keyFeatures
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="keyFeatures"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps(
                          `features.${index}.keyFeatures`
                        )}
                      />
                      {formik.touched.features?.[index]?.keyFeatures &&
                        formik.errors.features?.[index]?.keyFeatures && (
                          <div className="invalid-feedback text-start">
                            {formik.errors.features[index].keyFeatures}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </form>
          <div className="container d-flex justify-content-end">
            <button className="btn btn-sm btn-primary mx-2" onClick={addRow}>
              Add More
            </button>
            {formik.values.features?.length > 1 && (
              <button
                className="btn btn-sm btn-danger mx-2"
                onClick={removeRow}
              >
                X
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default CourseBenefit;
