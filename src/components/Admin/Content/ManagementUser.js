import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import {
	getAllUsers,
	getUserWithPaginate,
} from "../../../services/apiServices";
import "./ManagementUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import TableUserPaginate from "./TableUserPaginate";

const ManagementUser = (props) => {
	const LIMIT_USER = 5;
	const [pageCount, setPageCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [showModalCreateUser, setShowModalCreateUser] = useState(false);
	const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
	const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
	const [listUser, setListUser] = useState([]);
	const [dataUpdate, setDataUpdate] = useState({});
	const [dataDelete, setDataDelete] = useState({});

	useEffect(() => {
		// fetchListUsers();
		fetchListUsersWithPaginate(1);
	}, []);
	const fetchListUsers = async () => {
		let res = await getAllUsers();
		if (res.EC === 0) {
			setListUser(res.DT);
		}
	};
	const fetchListUsersWithPaginate = async (page) => {
		let res = await getUserWithPaginate(page, LIMIT_USER);
		if (res.EC === 0) {
			console.log("res.dt = ", res.DT);
			setListUser(res.DT.users);
			setPageCount(res.DT.totalPages);
		}
	};

	const handleClickBtnUpdate = (user) => {
		setShowModalUpdateUser(true);
		setDataUpdate(user);
	};

	const resetUpdateData = () => {
		setDataUpdate({});
	};

	const handleClickBtnDelete = (user) => {
		setShowModalDeleteUser(true);
		setDataDelete(user);
	};

	return (
		<div className="manager-users-container">
			<div className="title">Manager Users</div>
			<div className="users-content">
				<div className="btn-add-new">
					<button
						className="btn btn-dark"
						onClick={() => setShowModalCreateUser(true)}
					>
						{" "}
						<FcPlus /> Add new users
					</button>
				</div>
				<div className="table-users-container">
					{/* <TableUser
              handleClickBtnUpdate={handleClickBtnUpdate}
              handleClickBtnDelete={handleClickBtnDelete}
              listUser={listUser}
            /> */}
					<TableUserPaginate
						handleClickBtnUpdate={handleClickBtnUpdate}
						handleClickBtnDelete={handleClickBtnDelete}
						listUser={listUser}
						fetchListUsersWithPaginate={fetchListUsersWithPaginate}
						pageCount={pageCount}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>

				<ModalCreateUser
					show={showModalCreateUser}
					setShow={setShowModalCreateUser}
					fetchListUsers={fetchListUsers}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					fetchListUsersWithPaginate={fetchListUsersWithPaginate}
				/>

				<ModalUpdateUser
					show={showModalUpdateUser}
					setShow={setShowModalUpdateUser}
					dataUpdate={dataUpdate}
					fetchListUsers={fetchListUsers}
					setDataUpdate={setDataUpdate}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					resetUpdateData={resetUpdateData}
					fetchListUsersWithPaginate={fetchListUsersWithPaginate}
				/>
				<ModalDeleteUser
					show={showModalDeleteUser}
					setShow={setShowModalDeleteUser}
					dataDelete={dataDelete}
					fetchListUsers={fetchListUsers}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					fetchListUsersWithPaginate={fetchListUsersWithPaginate}
				/>
			</div>
		</div>
	);
};
export default ManagementUser;
