import { useState } from 'react';
import './ManagementQuiz.scss';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
  { value: 'EASY', label: 'Easy' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HARD', label: 'Hard' },
];

const ManagementQuiz = (props) => {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error('Name/Description is required.');
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName('');
      setDescription('');
      setImage('null');
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Cong Hoang - whoIsHoang</Accordion.Header>
          <Accordion.Body>
            <div className="add-new-quiz">
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
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quiz Type"
                  />
                </div>
                <div className="more-actions">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)}
                  />
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
            <div className="list-details">
              <TableQuiz />
            </div>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>UPDATE Question/Answer Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA/>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default ManagementQuiz;
