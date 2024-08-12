import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/BaseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CourseSyllabusEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();

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
        syllabus: formData.syllabus || [
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
      validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);

        const payload = {
          syllabus: values.syllabus.map((item) => ({
            session: item.session,
            lessons: item.lessons.map((lessonObj) => ({
              lesson: lessonObj.lesson,
              duration: lessonObj.duration,
            })),
          })),
        };

        try {
          const response = await api.post(`/courses/${formData.id}/syllabus`, payload);
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...values }));
            navigate("/course");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("An error occurred while submitting the form");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    const updateArray = (fieldName, index, action) => {
      const updatedArray = [...formik.values[fieldName]];
      action(updatedArray, index);
      formik.setFieldValue(fieldName, updatedArray);
    };

    const addSyllabusRow = () => {
      updateArray("syllabus", null, (arr) => {
        arr.push({
          session: "",
          lessons: [{ lesson: "", duration: "" }],
        });
      });
    };

    const removeSyllabusRow = () => {
      updateArray("syllabus", null, (arr) => {
        if (arr.length > 1) arr.pop();
      });
    };

    const addLesson = (syllabusIndex) => {
      updateArray(`syllabus.${syllabusIndex}.lessons`, null, (arr) => {
        arr.push({ lesson: "", duration: "" });
      });
    };

    const removeLesson = (syllabusIndex) => {
      updateArray(`syllabus.${syllabusIndex}.lessons`, null, (arr) => {
        if (arr.length > 1) arr.pop();
      });
    };

    useImperativeHandle(ref, () => ({
      courseSyllabusEdit: formik.handleSubmit,
    }));
    return (
      <div className="container my-4">
        <div className="container-fluid">
          <h4 className="mb-4 fw-bold text-start">Course Syllabus</h4>
          <form onSubmit={formik.handleSubmit}>
            {formik.values.syllabus.map((syllabusItem, syllabusIndex) => (
              <div key={syllabusIndex} className="mb-4">
                <div className="row">
                  <div className="col-md-6 col-12 mb-3 text-start">
                    <label htmlFor={`session-${syllabusIndex}`} className="form-label">Session</label>
                    <select
                      id={`session-${syllabusIndex}`}
                      className={`form-select ${
                        formik.touched.syllabus?.[syllabusIndex]?.session &&
                        formik.errors.syllabus?.[syllabusIndex]?.session
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label={`session-${syllabusIndex}`}
                      {...formik.getFieldProps(`syllabus.${syllabusIndex}.session`)}
                    >
                      <option value="">Select Session</option>
                      {Array.from({ length: 100 }, (_, i) => (
                        <option key={i + 1} value={`session${i + 1}`}>
                          {`Session ${i + 1}`}
                        </option>
                      ))}
                    </select>
                    {formik.touched.syllabus?.[syllabusIndex]?.session &&
                      formik.errors.syllabus?.[syllabusIndex]?.session && (
                        <div className="invalid-feedback">
                          {formik.errors.syllabus[syllabusIndex].session}
                        </div>
                      )}
                  </div>
    
                  {syllabusItem.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="row mb-3">
                      <div className="col-md-6 col-12 mb-3 text-start">
                        <label htmlFor={`lesson-${syllabusIndex}-${lessonIndex}`} className="form-label">Lesson</label>
                        <input
                          type="text"
                          id={`lesson-${syllabusIndex}-${lessonIndex}`}
                          className={`form-control ${
                            formik.touched.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.lesson &&
                            formik.errors.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.lesson
                              ? "is-invalid"
                              : ""
                          }`}
                          aria-label={`lesson-${syllabusIndex}-${lessonIndex}`}
                          {...formik.getFieldProps(`syllabus.${syllabusIndex}.lessons.${lessonIndex}.lesson`)}
                        />
                        {formik.touched.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.lesson &&
                          formik.errors.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.lesson && (
                            <div className="invalid-feedback">
                              {formik.errors.syllabus[syllabusIndex].lessons[lessonIndex].lesson}
                            </div>
                          )}
                      </div>
    
                      <div className="col-md-6 col-12 mb-3 text-start">
                        <label htmlFor={`duration-${syllabusIndex}-${lessonIndex}`} className="form-label">Duration</label>
                        <select
                          id={`duration-${syllabusIndex}-${lessonIndex}`}
                          className={`form-select ${
                            formik.touched.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.duration &&
                            formik.errors.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.duration
                              ? "is-invalid"
                              : ""
                          }`}
                          aria-label={`duration-${syllabusIndex}-${lessonIndex}`}
                          {...formik.getFieldProps(`syllabus.${syllabusIndex}.lessons.${lessonIndex}.duration`)}
                        >
                          <option value="">Select Duration</option>
                          {["15 Min", "30 Min", "45 Min", "1 Hrs", "1.15 Hrs", "1.30 Hrs", "1.45 Hrs", "2 Hrs", "2.15 Hrs", "2.30 Hrs", "2.45 Hrs", "3 Hrs"].map(duration => (
                            <option key={duration} value={duration}>
                              {duration}
                            </option>
                          ))}
                        </select>
                        {formik.touched.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.duration &&
                          formik.errors.syllabus?.[syllabusIndex]?.lessons?.[lessonIndex]?.duration && (
                            <div className="invalid-feedback">
                              {formik.errors.syllabus[syllabusIndex].lessons[lessonIndex].duration}
                            </div>
                          )}
                      </div>
    
                      <div className="d-flex justify-content-end mb-3">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mx-1"
                          onClick={() => addLesson(syllabusIndex)}
                        >
                          Add Lesson
                        </button>
                        {syllabusItem.lessons.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => removeLesson(syllabusIndex)}
                          >
                            Remove Lesson
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
    
                  <div className="d-flex justify-content-center mb-4">
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
                        className="btn btn-sm btn-danger"
                        onClick={removeSyllabusRow}
                      >
                        Remove Syllabus
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    );
    
  }
);

export default CourseSyllabusEdit;
