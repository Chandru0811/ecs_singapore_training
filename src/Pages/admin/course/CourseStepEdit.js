import React, { useRef, useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import CourseDetailsEdit from "./courseedit/CourseDetailsEdit";
import CourseBatchEdit from "./courseedit/CourseBatchEdit";
import CourseBenefitEdit from "./courseedit/CourseBenefitEdit";
import CourseFAQEdit from "./courseedit/CourseFAQEdit";
import CourseSyllabusEdit from "./courseedit/CourseSyllabusEdit";

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
  const [formData, setFormData] = useState({});
  const childRef = useRef();

  const isStepSkipped = (step) => skipped.has(step);

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleNext = () => {
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      if (isStepSkipped(activeStep)) {
        newSkipped.delete(activeStep);
      }
      return newSkipped;
    });
    setActiveStep((prev) => prev + 1);
  };

  const handleButtonClick = () => {
    if (childRef.current) {
      switch (activeStep) {
        case 0:
          childRef.current.courseDetailsEdit();
          break;
        case 1:
          childRef.current.courseBatchEdit();
          break;
        case 2:
          childRef.current.courseBenefitEdit();
          break;
        case 3:
          childRef.current.courseFAQEdit();
          break;
        case 4:
          childRef.current.courseSyllabusEdit();
          break;
        default:
          break;
      }
    }
  };

  const CurrentStepComponent = steps[activeStep].component;

  return (
    <div className="container my-5">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
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
            setLoadIndicator={setLoadIndicator}
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
              type="submit"
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
