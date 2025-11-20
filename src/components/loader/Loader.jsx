import React from 'react';
import './Loader.css'; // Import CSS file for loader styles
import {Modal , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Loader({show, setshow}) {
  // const [show, setShow] = useState(false);

  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
     
     

    <div className="loader_container">
      <div className="loader">

      </div>
      <p>Please wait...</p>
    </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Loader;

