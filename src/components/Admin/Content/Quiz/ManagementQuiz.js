import { useState } from 'react';
import './ManagementQuiz.scss';
import Select from 'react-select';

const options = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
];

const ManagementQuiz = (props) => {
  const [type, seType] = useState('EASY');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const handleChangeFile = (event) =>{

  }

  return (
    <div className="quiz-container">
      <div className="title">Cong Hoang Quiz</div>
      <div className="add-new-quiz">
        <hr />
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Your Quiz Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Your Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>Description</label>
          </div>
          <div className="my-3">
            <Select
              value={type}
              // onChange={this.handleChange}
              options={options}
              placeholder="Quiz Type"

            />
          </div>
          <div className="more-actions">
            <label className="mb-1">Upload Image</label>
            <input type="file" className="form-control" onChange={(event) => handleChangeFile(event)} />
          </div>
        </fieldset>
      </div>
      <div className="list-details">Create Table</div>
    </div>
  );
};
export default ManagementQuiz;
