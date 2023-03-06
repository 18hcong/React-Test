   const TableUser = (props) => {
   const {listUser} = props;
   //const listUser = props.listUser;

   //componentsDidMount

   return (
      <>
         <table className="table table-hover table-info table-bordered">
         <thead>
            <tr>
               <th scope="col">ID</th>
               <th scope="col">USERNAME</th>
               <th scope="col">EMAIL</th>
               <th scope="col">ROLE</th>
               <th>ACTION</th>
            </tr>
         </thead>
         <tbody>
            {listUser &&
               listUser.length > 0 &&
               listUser.map((item, index) => {
               return (
                  <tr key={`table-user-${index}`}>
                     <td>{item.id}</td>
                     <td>{item.username}</td>
                     <td>{item.email}</td>
                     <td>{item.role}</td>
                     <td>
                     <button className="btn btn-secondary">View</button>
                     <button className="btn btn-warning mx-2">Update</button>
                     <button className="btn btn-danger">Delete</button>
                     </td>
                  </tr>
               );
               })}
            {listUser && listUser.length === 0 && (
               <tr>
               <td colSpan={"4"}> Not found USER</td>
               </tr>
            )}
         </tbody>
         </table>
      </>
   );
   };
   export default TableUser;
