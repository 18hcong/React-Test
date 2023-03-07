   import ModalCreateUser from "./ModalCreateUser";
   import "./ManagementUser.scss";
   import { FcPlus } from "react-icons/fc";
   import TableUser from "./TableUser";
   import { useEffect, useState } from "react";
   import { getAllUsers } from "../../../services/apiServices";
   import ModalEditUser from "./ModalEditUser";

   const ManagementUser = (props) => {
      const [showModalCreateUser, setShowModalCreateUser] = useState(false);
      const [showModalEditUser, setShowModalEditUser] = useState(false);
      const [listUser, setListUser] = useState([]);
      const [dataEdit, setDataEdit] = useState({});

   useEffect(() => {
      fetchListUsers();
   }, []);

   const fetchListUsers = async () => {
      let res = await getAllUsers();
      console.log(res);
      if (res.EC === 0) {
         setListUser(res.DT);
      }
   };

   const handleClickBtnEdit = (user) => {
      setShowModalEditUser(true);
      setDataEdit(user);
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
            <TableUser
               handleClickBtnEdit={handleClickBtnEdit}
               listUser={listUser}
            />
         </div>

         <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
         />

         <ModalEditUser 
         show={showModalEditUser} 
         setShow={setShowModalEditUser}
         dataEdit={dataEdit}
         />
         </div>
      </div>
   );
   };
   export default ManagementUser;
