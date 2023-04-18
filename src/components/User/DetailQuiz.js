import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss';

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  useEffect(() => {
    fetQuestions();
  }, [quizId]);

  const fetQuestions = async () => {
    let res = await getDataQuiz(quizId);
    console.log(`check: `, res);
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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
        Quiz {quizId}: {location?.state.quizTitle}
        </div>
        <hr/>
        <div className="question-body">
          <img/>
        </div>
        <div className="question-content">
          <div className='question'>
          Question 1: What do you do for living?
          </div>
          <div className='answer'>
            <div className='a-child'>A. 18</div>
            <div className='a-child'>B. 20</div>
            <div className='a-child'>C. 23</div>
            <div className='a-child'>D. 30</div> 
          </div>
        </div>
        <div className='footer'>
          <button className='btn btn-secondary'>Prev</button>
          <button className='btn btn-primary'>Next</button>
        </div>
      </div>
      <div className="right-content">
        countdown
      </div>
    </div>
  );
};
export default DetailQuiz;
