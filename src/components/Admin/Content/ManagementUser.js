   import ModalCreateUser from "./ModalCreateUser";
   import "./ManagementUser.scss";

   const ManagementUser = (props) => {
   return (
      <div className="manager-users-container">
         <div className="title">Manager Users</div>
         <div className="users-content">
         <div>
            <button>Add new users</button>
         </div>
         <div>Table Users</div>
         <ModalCreateUser />
         </div>
      </div>
   );
   };
   export default ManagementUser;
