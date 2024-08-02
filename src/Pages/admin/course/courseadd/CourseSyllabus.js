import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";

const CourseSyllabus = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        syllabus: [
          {
            session: "",
            lessons: [
              {
                lesson: "",
              },
            ],
          },
        ],
      },
      onSubmit: async (values) => {
        console.log("object", values);
        // Your form submission logic here
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
      updatedSyllabus[syllabusIndex].lessons.push({ lesson: "" });
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
                          <div className="invalid-feedback">
                            {formik.errors.syllabus[syllabusIndex].session}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <div className="text-start">
                      <label>Lesson</label>
                    </div>
                    {formik.values.syllabus[syllabusIndex].lessons.map(
                      (lesson, lessonIndex) => (
                        <div key={lessonIndex} className="input-group mb-3">
                          <input
                            type="text"
                            className={`form-control ${
                              formik.touched.syllabus?.[syllabusIndex]?.lessons?.[
                                lessonIndex
                              ]?.lesson &&
                              formik.errors.syllabus?.[syllabusIndex]?.lessons?.[
                                lessonIndex
                              ]?.lesson
                                ? "is-invalid"
                                : ""
                            }`}
                            aria-label={`lesson-${syllabusIndex}-${lessonIndex}`}
                            {...formik.getFieldProps(
                              `syllabus.${syllabusIndex}.lessons.${lessonIndex}.lesson`
                            )}
                          />
                          {formik.touched.syllabus?.[syllabusIndex]?.lessons?.[
                            lessonIndex
                          ]?.lesson &&
                            formik.errors.syllabus?.[syllabusIndex]?.lessons?.[
                              lessonIndex
                            ]?.lesson && (
                              <div className="invalid-feedback">
                                {
                                  formik.errors.syllabus[syllabusIndex]
                                    .lessons[lessonIndex].lesson
                                }
                              </div>
                            )}
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
