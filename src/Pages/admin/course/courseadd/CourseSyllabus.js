import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CourseSyllabus = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate =useNavigate()
    const validationSchema = Yup.object().shape({
      syllabus: Yup.array().of(
        Yup.object().shape({
          session: Yup.string().required("Session is required*"),
          lessons: Yup.array().of(
            Yup.object().shape({
              lesson: Yup.string().required("Lesson is required*"),
              duration: Yup.string().required("Duration is required*"),
            })
          ),
        })
      ),
    });
    const formik = useFormik({
      initialValues: {
        syllabus: [
          {
            session: "",
            lessons: [
              {
                duration: "",
                lesson: "",
              },
            ],
          },
        ],
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // console.log("object", values);
        console.log("form ", formData);
        setLoadIndicators(true);

        const payLoad = {
          syllabus: values.syllabus.map((item) => ({
            session: item.session,
            lessons: item.lessons.map((lessonObj) => ({
              lesson: lessonObj.lesson,
              duration: lessonObj.duration,
            })),
          })),
        };
        try {
          const response = await api.post(
            `/courses/${formData.id}/syllabus`,
            payLoad
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            // handleNext();
            navigate("/course")
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

    // Add a new syllabus row
    const addSyllabusRow = () => {
      formik.setFieldValue("syllabus", [
        ...formik.values.syllabus,
        {
          session: "",
          lessons: [
            {
              lesson: "",
              duration: "",
            },
          ],
        },
      ]);
    };

    // Remove the last syllabus row using the pop method
    const removeSyllabusRow = () => {
      const updatedSyllabus = [...formik.values.syllabus];
      if (updatedSyllabus.length > 1) {
        updatedSyllabus.pop();
        formik.setFieldValue("syllabus", updatedSyllabus);
      }
    };

    // Add a new lesson within a specific syllabus row
    const addLesson = (syllabusIndex) => {
      const updatedSyllabus = [...formik.values.syllabus];
      updatedSyllabus[syllabusIndex].lessons.push({ lesson: "", duration: "" });
      formik.setFieldValue("syllabus", updatedSyllabus);
    };

    // Remove the last lesson within a specific syllabus row using pop
    const removeLesson = (syllabusIndex) => {
      const updatedSyllabus = [...formik.values.syllabus];
      if (updatedSyllabus[syllabusIndex].lessons.length > 1) {
        updatedSyllabus[syllabusIndex].lessons.pop();
        formik.setFieldValue("syllabus", updatedSyllabus);
      }
    };

    useImperativeHandle(ref, () => ({
      courseSyllabus: formik.handleSubmit,
    }));

    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Syllabus</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.syllabus.map((_, syllabusIndex) => (
              <div key={syllabusIndex}>
                <div className="row px-1">
                  <div className="col-md-6 col-12 mb-3">
                    <div className="text-start">
                      <label>Session</label>
                    </div>
                    <div className="input-group mb-3">
                      <select
                        className={`form-select ${
                          formik.touched.syllabus?.[syllabusIndex]?.session &&
                          formik.errors.syllabus?.[syllabusIndex]?.session
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label={`session-${syllabusIndex}`}
                        {...formik.getFieldProps(
                          `syllabus.${syllabusIndex}.session`
                        )}
                      >
                        <option value=""></option>
                        {Array.from({ length: 100 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={`session${i + 1}`}
                            className="py-1"
                          >
                            {`Session ${i + 1}`}
                          </option>
                        ))}
                      </select>
                      {formik.touched.syllabus?.[syllabusIndex]?.session &&
                        formik.errors.syllabus?.[syllabusIndex]?.session && (
                          <div className="invalid-feedback text-start">
                            {formik.errors.syllabus[syllabusIndex].session}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3"></div>
                  
                  {formik.values.syllabus[syllabusIndex].lessons.map(
                    (lesson, lessonIndex) => (
                      <div key={lessonIndex}>
                        <div className="col-md-6 col-12 mb-3">
                    <div className="text-start">
                      <label>Duration</label>
                    </div>
                    <div className="input-group mb-3">
                      <select
                        className={`form-select ${
                          formik.touched.syllabus?.[syllabusIndex]
                                  ?.lessons?.[lessonIndex]?.duration &&
                                  formik.errors.syllabus?.[syllabusIndex]
                                  ?.lessons?.[lessonIndex]?.duration
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label={`duration-${syllabusIndex}`}
                        {...formik.getFieldProps(
                          `syllabus.${syllabusIndex}.lessons.${lessonIndex}.duration`
                        )}
                      >
                        <option value=""></option>
                        <option value="15">15 Min</option>
                        <option value="30">30 Min</option>
                        <option value="45">45 Min</option>
                        <option value="1">1 Hrs</option>
                        <option value="1.15">1.15 Hrs</option>
                        <option value="1.30">1.30 Hrs</option>
                        <option value="1.45">1.45 Hrs</option>
                        <option value="2">2 Hrs</option>
                        <option value="2.15">2.15 Hrs</option>
                        <option value="2.30">2.30 Hrs</option>
                        <option value="2.45">2.45 Hrs</option>
                        <option value="3">3 Hrs</option>
                      </select>
                      {formik.touched.syllabus?.[syllabusIndex]
                              ?.lessons?.[lessonIndex]?.duration &&
                        formik.errors.syllabus?.[syllabusIndex]
                        ?.lessons?.[lessonIndex]?.duration && (
                          <div className="invalid-feedback text-start">
                            {formik.errors.syllabus[syllabusIndex]
                                      .lessons[lessonIndex].duration}
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
                              className={`form-control ${
                                formik.touched.syllabus?.[syllabusIndex]
                                  ?.lessons?.[lessonIndex]?.lesson &&
                                formik.errors.syllabus?.[syllabusIndex]
                                  ?.lessons?.[lessonIndex]?.lesson
                                  ? "is-invalid"
                                  : ""
                              }`}
                              aria-label={`lesson-${syllabusIndex}-${lessonIndex}`}
                              {...formik.getFieldProps(
                                `syllabus.${syllabusIndex}.lessons.${lessonIndex}.lesson`
                              )}
                            />
                            {formik.touched.syllabus?.[syllabusIndex]
                              ?.lessons?.[lessonIndex]?.lesson &&
                              formik.errors.syllabus?.[syllabusIndex]
                                ?.lessons?.[lessonIndex]?.lesson && (
                                <div className="invalid-feedback text-start">
                                  {
                                    formik.errors.syllabus[syllabusIndex]
                                      .lessons[lessonIndex].lesson
                                  }
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary mx-1"
                      onClick={() => addLesson(syllabusIndex)}
                    >
                      Add
                    </button>
                    {formik.values.syllabus[syllabusIndex].lessons.length >
                      1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeLesson(syllabusIndex)}
                      >
                        X
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn btn-sm btn-primary mx-1"
                onClick={addSyllabusRow}
              >
                Add Syllabus
              </button>
              {formik.values.syllabus.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={removeSyllabusRow}
                >
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
