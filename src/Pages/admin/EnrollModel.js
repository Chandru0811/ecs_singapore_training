import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EnrollModel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <button className="btn enroll-btn" onClick={handleShow}>Enroll Now</button>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enroll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className=' '>
              <form>
                <div className='row mb-3'>
                  <div className='col-12 mb-2 text-start'>
                    <label htmlFor="firstName" className="form-label mb-0">Name<span className="text-danger">*</span></label>
                    <input type="text" className="form-control " id="firstName" />
                  </div>
                  <div className='col-12 mb-2 text-start'>
                    <label htmlFor="email" className="form-label mb-0">Email<span className="text-danger">*</span></label>
                    <input type="email" className="form-control " id="email" />
                  </div>
                  <div className='col-12 mb-2 text-start'>
                    <label htmlFor="phoneNumber" className="form-label mb-0">Number<span className="text-danger">*</span></label>
                    <input onInput={(event) => { event.target.value = event.target.value.replace( /[^0-9]/g, "")}} 
                    type="text" className="form-control " id="phoneNumber" />
                  </div>
                  <div className='col-12 mb-2 text-start'>
                    <label htmlFor="course" className="form-label mb-0">Course<span className="text-danger">*</span></label>
                    <select type="text" className="form-select " id="course" >
                        <option value={""}> </option>
                    </select>
                  </div>
                  <div className='col-md-12 text-start'>
                    <label className="form-label mb-0">Description<span className="text-danger">*</span></label>
                    <textarea className="form-control "></textarea>
                  </div>
                </div>
                
              </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EnrollModel
