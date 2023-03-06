   import ModalCreateUser from "./ModalCreateUser";
   import "./ManagementUser.scss";
   import { FcPlus } from "react-icons/fc";
   import TableUser from "./TableUser";
   import { useEffect, useState } from "react";
   import { getAllUsers } from "../../../services/apiServices";

   const ManagementUser = (props) => {
   const [showModalCreateUser, setShowModalCreateUser] = useState(false);
   const [listUser, setListUser] = useState([]);
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
            <TableUser listUser={listUser} />
         </div>
         <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
         />
         </div>
      </div>
   );
   };
   export default ManagementUser;
