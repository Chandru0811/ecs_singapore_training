import React, { useEffect, useRef, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CourseDetailsEdit from "./courseedit/CourseDetailsEdit";
import CourseBatchEdit from "./courseedit/CourseBatchEdit";
import CourseBenefitEdit from "./courseedit/CourseBenefitEdit";
import CourseFAQEdit from "./courseedit/CourseFAQEdit";
import CourseSyllabusEdit from "./courseedit/CourseSyllabusEdit";
import { useParams } from "react-router-dom";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";  // Ensure toast is imported for error handling

const steps = [
  { label: "Course Details", component: CourseDetailsEdit },
  { label: "Course Batch", component: CourseBatchEdit },
  { label: "Course Benefit", component: CourseBenefitEdit },
  { label: "Course & FAQ", component: CourseFAQEdit },
  { label: "Course Syllabus", component: CourseSyllabusEdit },
];

function CourseStepEdit() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const childRef = useRef(null);

  const isStepSkipped = (step) => skipped.has(step);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`course/${id}`);
      if (response.data.status === 200) {
        setFormData(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleNext = () => {
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped);
      if (isStepSkipped(activeStep)) {
        newSkipped.delete(activeStep);
      }
      return newSkipped;
    });
    setActiveStep((prev) => prev + 1);
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex < activeStep) {
      setActiveStep(stepIndex);
    } else {
      handleButtonClick(); // Handle validation or saving before navigating forward
    }
  };

  const handleButtonClick = () => {
    if (childRef.current) {
      const methodName = [
        "courseDetailEdit",
        "courseBatchEdit",
        "courseBenefitEdit",
        "courseFAQEdit",
        "courseSyllabusEdit",
      ][activeStep];
      
      if (typeof childRef.current[methodName] === 'function') {
        childRef.current[methodName]();
      } else {
        console.warn(`Method ${methodName} not found on childRef.current`);
      }
    }
  };

  const CurrentStepComponent = steps[activeStep].component;

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container my-5">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => handleStepClick(index)}
            completed={activeStep > index}
            style={{ cursor: 'pointer' }}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-${index}`}>{step.label}</Tooltip>}
            >
              <StepLabel>{step.label}</StepLabel>
            </OverlayTrigger>
          </Step>
        ))}
      </Stepper>

      <div className="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        <React.Fragment>
          <CurrentStepComponent
            formData={formData}
            ref={childRef}
            setFormData={setFormData}
            handleNext={handleNext}
            setLoadIndicators={setLoadIndicator}
          />
          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
            {activeStep > 0 && (
              <button
                className="btn btn-danger btn-sm"
                style={{ padding: "7px" }}
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <div style={{ flex: "1 1 auto" }}></div>
            <button
              type="button"
              onClick={handleButtonClick}
              style={{ padding: "7px" }}
              className="btn btn-primary"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep === steps.length - 1 ? "Submit" : "Save And Next"}
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default CourseStepEdit;
