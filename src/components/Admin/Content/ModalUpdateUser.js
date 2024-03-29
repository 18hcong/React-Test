  import React, { useEffect, useState } from 'react';
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import { FcPlus } from 'react-icons/fc';
  import { toast } from 'react-toastify';
  import { putUpdateUser } from '../../../services/apiServices.js';
  import _ from 'lodash';

  const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

    const handleClose = () => {
      setEmail('');
      setImage('');
      setPassword('');
      setUserName('');
      setRole('USER');
      setPreviewImage('');
      setShow(false);
      props.resetUpdateData();
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
      if (!_.isEmpty(dataUpdate)) {
        //update  state
        setEmail(dataUpdate.email);
        setUserName(dataUpdate.username);
        setRole(dataUpdate.role);
        setImage('');
        if (dataUpdate.image) {
          setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
      }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
      if (event.target && event.target.files && event.target.files[0]) {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
      } else {
        // setPreviewImage("");
      }
    };
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleSubmitCreateUser = async () => {
      //validate
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.error('Invalid email');
        return;
      }

      let data = await putUpdateUser(dataUpdate.id, UserName, role, image);
      if (data && data.EC === 0) {
        toast.success(data.EM);
        handleClose();
        // await props.fetchListUsers();
      await props.fetchListUsersWithPaginate(props.currentPage)
      }
      if (data && data.EC !== 0) {
        toast.error(data.EM);
      }
    };

    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="xl"
          backdrop="static"
          className="modal-add-user"
        >
          <Modal.Header closeButton>
            <Modal.Title>Update a users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  disabled
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  disabled
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={UserName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <div className="col-md-12">
                <label className="form-label label-upload" htmlFor="labelUpload">
                  <FcPlus /> Up load file{' '}
                </label>
                <input
                  type="file"
                  hidden
                  id="labelUpload"
                  onChange={(event) => handleUploadImage(event)}
                />
              </div>
              <div className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage} />
                ) : (
                  <span> PREVIEW PICTURE </span>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  export default ModalUpdateUser;
