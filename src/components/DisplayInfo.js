import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

// class DisplayInfo extends React.Component {
//   render() {
//     console.log(">>> call me render");
//     //destructuring array/object
//     const { listUsers } = this.props; //object
//     // console.log(listUsers);
//     //props =>  VIET TẮT properties
//     return (
//       <div>
//         {listUsers.map((User, index) => {
//           return (
//             <div className="display-info-container">
//               {true && (
//                 <>
//                   {listUsers.map((user, index) => {
//                     return (
//                       <div
//                         key={User.id}
//                         className={+User.age > 20 ? "blue" : "red"}
//                       >
//                         <div>My Name's: {User.name} </div>
//                         <div>My Age's: {User.age}</div>
//                         <div>
//                           <button
//                             onClick={() => this.props.handleDeleteUser(user.id)}
//                           >
//                             Delete
//                           </button>
//                         </div>
//                         <hr />
//                       </div>
//                     );
//                   })}
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
// }

  const DisplayInfo = (props) => {
    const {listUsers}= props; 
          return (
                  <div className="display-info-container">
                    {true && (
                      <>
                        {listUsers.map((user, index) => {
                          return (
                            <div key={user.id} className={+user.age > 20 ? "blue" : "red"} >
                              <div>My Name's: {user.name} </div>
                              <div>My Age's: {user.age}</div>
                              <div>
                                <button onClick={() => props.handleDeleteUser(user.id)} > Delete </button>
                              </div>
                              <hr />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                );
              }

export default DisplayInfo;
