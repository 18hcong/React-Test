import './QuizQA.scss';
import Select from 'react-select';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { FcQuestions, FcFullTrash } from 'react-icons/fc';
import { FiUserX, FiUserPlus } from 'react-icons/fi';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from 'react-awesome-lightbox';
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from '../../../../services/apiServices';
import { toast } from 'react-toastify';
const QuizQA = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      // isValidateQuestions: false,
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
          // isValidateAnswers: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const [isPreviewImage, setIsPreViewImage] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: '',
  });

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) {return res.arrayBuffer();})
      .then(function (buf) {return new File([buf], filename, { type: mimeType });})
      );
    }
  const fetchQuizWithQA = async () => {
    let rs = await getQuizWithQA(selectedQuiz.value);
    console.log('check res: ', rs);
    if (rs && rs.EC === 0) {
      // convert base64 to file object
      let newQA = [];
      for (let i = 0; i < rs.DT.qa.length; i++) {
        let q = rs.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            `image/png`
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
      console.log(">check newQA:", newQA);
      console.log(">check rs:", rs);
    }
  };
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswers = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      };

      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === 'REMOVE') {
      let index = questionsClone.findIndex((item) => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionsClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      // console.log("check file:",event.target.files[0] )
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    // console.log(type, answerId, questionId, value, index);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === 'CHECKBOX') {
              answer.isCorrect = value;
            }
            if (type === 'INPUT') {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      // console.log("check file:",event.target.files[0] )
      setQuestions(questionsClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please select a Quiz');
      return;
    }

    //validate answers
    let isValidateAnswers = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidateAnswers = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidateAnswers === false) break;
    }
    if (isValidateAnswers === false) {
      toast.error(`Not empty Answers ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }

    //validate questions
    let isValidateQuestions = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidateQuestions = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidateQuestions === false) {
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
      return;
    }

    //validate Data
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });
    if(res & res.EC === 0){
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreViewImage(true);
    }
  };

  return (
    <div className="question-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz: </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className="mt-3 mb-2">Add Question:</div>
        <div>
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => {
              return (
                <div key={question.id} className="q-main mb-3">
                  <div className="question-content">
                    <div className="form-floating description  ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name@example.com"
                        value={question.description}
                        onChange={(event) =>
                          handleOnChange(
                            'QUESTION',
                            question.id,
                            event.target.value
                          )
                        }
                      />
                      <label>Question's {index + 1} Description</label>
                    </div>

                    <div className="group-upload ">
                      <label htmlFor={`${question.id}`}>
                        <RiImageAddFill className="label-upload" />
                      </label>
                      <input
                        id={`${question.id}`}
                        onChange={(event) =>
                          handleOnChangeFileQuestion(question.id, event)
                        }
                        type={'file'}
                        hidden
                      />
                      <span>
                        {question.imageName ? (
                          <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePreviewImage(question.id)}
                          >
                            {question.imageName}
                          </span>
                        ) : (
                          'NOT file is upload!!!'
                        )}
                      </span>
                    </div>

                    <div className="btn-add">
                      <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                        <FcQuestions className="icon-add" />
                      </span>
                      {questions.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveQuestion('REMOVE', question.id)
                          }
                        >
                          <FcFullTrash className="icon-remove" />
                        </span>
                      )}
                    </div>
                  </div>

                  {question.answers &&
                    question.answers.length > 0 &&
                    question.answers.map((answer, index) => {
                      return (
                        <div className="answer-content">
                          <input
                            className="form-check-input isCorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                'CHECKBOX',
                                answer.id,
                                question.id,
                                event.target.checked
                              )
                            }
                          />
                          <div className="form-floating answer-name">
                            <input
                              value={answer.description}
                              type="text"
                              className="form-control"
                              placeholder="name@example.com"
                              onChange={(event) =>
                                handleAnswerQuestion(
                                  'INPUT',
                                  answer.id,
                                  question.id,
                                  event.target.value
                                )
                              }
                            />
                            <label>Answers {index + 1}</label>
                          </div>
                          <div className="btn-group">
                            <span
                              onClick={() =>
                                handleAddRemoveAnswers('ADD', question.id)
                              }
                            >
                              <FiUserPlus className="icon-add" />
                            </span>
                            {question.answers.length > 1 && (
                              <span
                                onClick={() =>
                                  handleAddRemoveAnswers(
                                    'REMOVE',
                                    question.id,
                                    answer.id
                                  )
                                }
                              >
                                <FiUserX className="icon-remove" />
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          {questions && questions.length > 0 && (
            <div>
              <button
                onClick={() => handleSubmitQuestionForQuiz()}
                className="btn btn-warning"
              >
                Save Questions
              </button>
            </div>
          )}
          {isPreviewImage === true && (
            <Lightbox
              image={dataImagePreview.url}
              title={dataImagePreview.title}
              onClose={() => setIsPreViewImage(false)}
            ></Lightbox>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuizQA;
