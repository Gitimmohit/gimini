import React from "react";
import "./Loader.css"; // Import CSS file for loader styles
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Loader({ show, setshow }) {
  const handleClose = () => setshow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="transparent-modal"
      >
        {/* <Modal.Body> */}
          <div className="loader_container">
            <div className="loader">
              <div className="loader">
                <div className="loader">
                  <div className="loader">
                    <div className="loader">
                      <div className="loader">
                        <div className="loader">
                          <div className="loader">
                            <div className="loader"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <p>Please wait...</p> */}
          </div>
        {/* </Modal.Body> */}
      </Modal>
    </>
  );
}

export default Loader;
