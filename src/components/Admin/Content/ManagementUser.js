   import ModalCreateUser from "./ModalCreateUser";
   import "./ManagementUser.scss";
   import { FcPlus } from "react-icons/fc";
   import { useState } from "react";

   const ManagementUser = (props) => {
   const [showModalCreateUser, setShowModalCreateUser] = useState(false);
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
         <div className="table-users-container">Table Users</div>
         <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
         />
         </div>
      </div>
   );
   };
   export default ManagementUser;
