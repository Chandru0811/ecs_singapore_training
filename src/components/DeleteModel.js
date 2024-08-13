import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import api from "../config/BaseUrl";
import toast from "react-hot-toast";

const DeleteModel = ({ onSuccess, path, className }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handelDelete = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.delete(path);
      if (response.status === 201) {
        onSuccess();
        handleClose();
        toast.success(response.data.message);
      } else if (response.status === 200) {
        onSuccess();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting data:", error);
    }finally {
      setLoadIndicator(false);
    }
  };

  return (
    <>
      <button className={`btn ${className}`} onClick={handleShow}>
        <FaTrash />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm btn-secondary text-danger-hover linkPadding"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn btn-sm btn-danger text-danger-hover linkPadding"
            onClick={handelDelete}
            disabled={loadIndicator}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModel;