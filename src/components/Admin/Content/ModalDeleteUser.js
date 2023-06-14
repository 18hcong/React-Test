import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiServices";

const ModalDeleteUser = (props) => {
	const { show, setShow, dataDelete } = props;

	const handleClose = () => setShow(false);

	const handleSubmitDeleteUser = async () => {
		let data = await deleteUser(dataDelete.id);
		if (data && data.EC === 0) {
			toast.success(data.EM);
			handleClose();
			// await props.fetchListUsers();
			props.setCurrentPage(1);
			await props.fetchListUsersWithPaginate(props.currentPage);
		}
		if (data && data.EC !== 0) {
			toast.error(data.EM);
		}
	};
	return (
		<>
			<Modal show={show} onHide={handleClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Confirm Delete the user?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete the user! email =
					<b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleSubmitDeleteUser}>
						Confirm Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalDeleteUser;
