   import React, { useState } from "react";
   import Button from "react-bootstrap/Button";
   import Modal from "react-bootstrap/Modal";

   const ModalCreateUser = () => {
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Button variant="primary" onClick={handleShow}>
         Launch demo modal
         </Button>

         <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>Add new users</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <form className="row g-3">
               <div className="col-md-6">
               <label className="form-label">Email</label>
               <input type="email" className="form-control" />
               </div>
               <div className="col-md-6">
               <label className="form-label">Password</label>
               <input type="password" className="form-control" />
               </div>
               {/* <div className="col-12">
                  <label for="inputAddress" className="form-label">
                     Address
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="inputAddress"
                     placeholder="1234 Main St"
                  />
               </div>
               <div className="col-12">
                  <label for="inputAddress2" className="form-label">
                     Address 2
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="inputAddress2"
                     placeholder="Apartment, studio, or floor"
                  />
               </div> */}
               <div className="col-md-6">
               <label className="form-label">User Name</label>
               <input type="text" className="form-control" />
               </div>
               <div className="col-md-4">
               <label className="form-label">Role</label>
               <select className="form-select">
                  <option selected value="USER">
                     USER
                  </option>
                  <option value="ADMIN">ADMIN</option>
               </select>
               </div>
               {/* <div className="col-md-2">
                  <label for="inputZip" className="form-label">
                     Zip
                  </label>
                  <input type="text" className="form-control" id="inputZip" />
               </div>
               <div className="col-12">
                  <div className="form-check">
                     <input
                     className="form-check-input"
                     type="checkbox"
                     id="gridCheck"
                     />
                     <label className="form-check-label" for="gridCheck">
                     Check me out
                     </label>
                  </div>
               </div>
               <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                     Sign in
                  </button>
               </div> */}
               <div className="col-md-12">
               <label className="form-label">Image</label>
               <input type="file" />
               </div>
            </form>
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
   );
   };
   export default ModalCreateUser;
