import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//   state = {
//     name: "",
//     address: "Dak Lak",
//     age: "",
//   };
//   handleOnchangeAge = (event) => {
//     this.setState({ age: event.target.value });
//   };

//   handleOnchangeInput = (event) => {
//     this.setState({ name: event.target.value });
//   };

//   handleOnSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state);

//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is: {this.state.name} and address: {this.state.address} age:{" "}
//         {this.state.age}
//         <form onSubmit={(event) => this.handleOnSubmit(event)}>
//           <label>Your Name: </label>
//           <input
//             value={this.state.name}
//             type="text"
//             onChange={(event) => {
//               this.handleOnchangeInput(event);
//             }}
//           />
//           <label>Your Age: </label>
//           <input
//             value={this.state.age}
//             type="text"
//             onChange={(event) => {
//               this.handleOnchangeAge(event);
//             }}
//           />
//           <button> Submit </button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfor = (props) => {
  // state = {
  //   name: "",
  //   address: "Dak Lak",
  //   age: "",
  // };
  const [name, setName] = useState('')
  const [address, setnAddress] = useState('Dak lak')
  const [age, setAge] = useState('')

  const handleOnchangeAge = (event) => {
    setAge(event.target.value)
    // this.setState({ age: event.target.value });
  };

  const handleOnchangeInput = (event) => {
    setName(event.target.value)
    // this.setState({ name: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state); 
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  return (
    <div>
      My name is: {name} and address: {address} age:{" "}
      {this.state.age}
      <form onSubmit={(event) =>handleOnSubmit(event)}>
        <label>Your Name: </label>
        <input
          value={name}
          type="text"
          onChange={(event) => {handleOnchangeInput(event);}}
        />
        <label>Your Age: </label>
        <input
          value={age}
          type="text"
          onChange={(event) => {handleOnchangeAge(event)}}
        />
        <button> Submit </button>
      </form>
    </div>
  );
};
export default AddUserInfor;
