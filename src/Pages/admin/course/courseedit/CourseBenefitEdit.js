import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const data = {
  benefitsTitle: "Elevate Your Learning Experience",
  keyFeature: [
    {
      keyFeatures: "Expert teachers",
    },
    {
      keyFeatures: "Interactive lessons",
    },
    {
      keyFeatures: "Customized courses",
    },
    {
      keyFeatures: "Personalized learning plans",
    },
    {
      keyFeatures: "Flexible scheduling",
    },
    {
      keyFeatures: "Community support",
    },
    {
      keyFeatures: "High-quality content",
    },
    {
      keyFeatures: "Guaranteed success",
    },
  ],
};

const CourseBenefitEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const validationSchema = Yup.object().shape({
      benefitsTitle: Yup.string().required("Title is required"),
      keyFeature: Yup.array().of(
        Yup.object().shape({
          keyFeatures: Yup.string().required("Key feature is required"),
        })
      ),
    });

    const formik = useFormik({
      initialValues: {
        benefitsTitle: "",
        keyFeature: [
          {
            keyFeatures: "",
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
    const addRow = () => {
      formik.setFieldValue("keyFeature", [
        ...formik.values.keyFeature,
        {
          keyFeatures: "",
        },
      ]);
    };
    const removeRow = () => {
      const updatedRow = [...formik.values.keyFeature];
      updatedRow.pop();
      formik.setFieldValue("keyFeature", updatedRow);
    };

    useImperativeHandle(ref, () => ({
      courseBenefitEdit: formik.handleSubmit,
    }));

    useEffect(() => {
      formik.setValues({ ...data });
    }, []);

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
                      formik.touched.benefitsTitle &&
                      formik.errors.benefitsTitle
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="benefitsTitle"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("benefitsTitle")}
                  />
                  {formik.touched.benefitsTitle &&
                    formik.errors.benefitsTitle && (
                      <div className="invalid-feedback text-start">
                        {formik.errors.benefitsTitle}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                {formik.values.keyFeature.map((feature, index) => (
                  <div key={index}>
                    <div className="text-start">
                      <label>Key Features</label>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          formik.touched.keyFeature?.[index]?.keyFeatures &&
                          formik.errors.keyFeature?.[index]?.keyFeatures
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="keyFeatures"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps(
                          `keyFeature.${index}.keyFeatures`
                        )}
                      />
                      {formik.touched.keyFeature?.[index]?.keyFeatures &&
                        formik.errors.keyFeature?.[index]?.keyFeatures && (
                          <div className="invalid-feedback text-start">
                            {formik.errors.keyFeature[index].keyFeatures}
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
            {formik.values.keyFeature.length > 1 && (
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

export default CourseBenefitEdit;
