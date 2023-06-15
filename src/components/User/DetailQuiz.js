import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import { SidebarFooter } from 'react-pro-sidebar';
import { FaMailchimp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import RightContent from './Content/RightConten';

const DetailQuiz = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetQuestions();
  }, [quizId]);

  const fetQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy('id')
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let image,
            questionDescription = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };
  const handleCheckbox = (answersId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answersId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  const handleFinishQuiz = async () => {
    if (getDataQuiz && dataQuiz.length > 0) {
      console.log('finish: ', dataQuiz);
      let payload = {
        quizId: +quizId,
        answers: [],
      };
      let answer = [];
      if (dataQuiz && dataQuiz.length > 0) {
        dataQuiz.forEach((question) => {
          let questionId = question.questionId;
          let userAnswerId = [];

          //todo: userAnswerId
          question.answers.forEach((a) => {
            if (a.isSelected === true) {
              userAnswerId.push(a.id);
            }
          });
          answer.push({
            questionId: +questionId,
            userAnswerId: userAnswerId,
          });
        });
        payload.answers = answer;
        //submit api
        let res = await postSubmitQuiz(payload);
        console.log(`check res:`, res);
        if (res && res.EC === 0) {
          setDataModalResult({
            countCorrect: res.DT.countCorrect,
            countTotal: res.DT.countTotal,
            quizData: res.DT.quizData,
          });
          setIsShowModalResult(true);
        } else {
          alert(`wrong answer`);
        }
      }
    }
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state.quizTitle}
        </div>
        <hr />
        <div className="question-body">
          <img src="" />
        </div>
        <div className="question-content">
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >
            Finish
          </button>
        </div>
        <div className="footer-back">
          <SidebarFooter style={{ textAlign: 'center' }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: '20px 24px',
              }}
            >
              <span className="sidebar-btn" onClick={() => navigate('/users')}>
                <FaMailchimp /> Go Back
              </span>
            </div>
          </SidebarFooter>
        </div>
      </div>
      <div className="right-content">
        <RightContent
        dataQuiz={dataQuiz}/>
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
