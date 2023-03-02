   import ModalCreateUser from "./ModalCreateUser";

   const ManagementUser = (props) => {
   return (
      <div className="manager-users-container">
         <div className="title">Manager Users</div>
         <div className="users-content">
         <div>
            <button>Add new users</button>
         </div>
         <div>
            Table Users
            <ModalCreateUser />
         </div>
         </div>
      </div>
   );
   };
   export default ManagementUser;
