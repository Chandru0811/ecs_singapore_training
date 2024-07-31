import { Step, StepLabel, Stepper } from '@mui/material';
import React, { useRef, useState } from 'react'
import Tooltip from "react-bootstrap/Tooltip";
import { OverlayTrigger } from 'react-bootstrap';
import CourseDetails from './courseadd/CourseDetails';
import CourseBatch from './courseadd/CourseBatch';
import CourseBenefit from './courseadd/CourseBenefit';
import CourseFAQ from './courseadd/CourseFAQ';
import CourseSyllabus from './courseadd/CourseSyllabus';

const steps = [{ tooltip: "Course Details" }, { tooltip: "Course Batch" },{ tooltip: "Course Benefit" },
    { tooltip: "Course & FAQ" },{ tooltip: "Course Syllabus" }];
    
const CourseStepAdd = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const childRef = useRef();
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [formData, setFormData] = useState({});

    const isStepSkipped = (step) => {
        return skipped.has(step);
      };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      };

      const handleButtonClick = () => {
        switch (activeStep.toString()) {
          case "0":
            if (childRef.current) {
              childRef.current.courseDetails();
            }
            break;
          case "1":
            if (childRef.current) {
              childRef.current.courseBatch();
            }
            break;
          case "2":
            if (childRef.current) {
              childRef.current.courseBenefit();
            }
            break;
          case "3":
            if (childRef.current) {
              childRef.current.courseFaq();
            }
            break;
          case "4":
            if (childRef.current) {
              childRef.current.courseSyllabus();
            }
            break;
    
          default:
            break;
        }
      };
  return (
    <div class="container  my-5">
      <Stepper className="my-5" activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index}>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-${index}`}>{step.tooltip}</Tooltip>
              }
            >
              <StepLabel></StepLabel>
            </OverlayTrigger>
          </Step>
        ))}
      </Stepper>
      <div class="container-fluid py-3 card shadow border-0 mb-7 mt-5">
        <React.Fragment>
          {activeStep === 0 && (
            <CourseDetails
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 1 && (
            <CourseBatch
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

           {activeStep === 2 && (
            <CourseBenefit
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 3 && (
            <CourseFAQ
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          {activeStep === 4 && (
            <CourseSyllabus
              formData={formData}
              ref={childRef}
              setFormData={setFormData}
              handleNext={handleNext}
              setLoadIndicators={setLoadIndicator}
            />
          )}

          <div className="container-fluid p-1 d-flex align-items-center justify-content-center">
          {activeStep > 0 && (
            <button
              className="btn btn-danger btn-sm"
              style={{ padding: "7px" }}
              disabled={activeStep === 0}
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
              className="btn btn-primary "
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              {activeStep === steps.length - 1 ? "Submit" : " Save And Next"}
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  )
}

export default CourseStepAdd
