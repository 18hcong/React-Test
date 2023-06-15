import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const [isPreviewImage, setIsPreViewImage] = useState(false);
  const { data, index } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleHandleCheckBox = (event, answersId, questionId) => {
    props.handleCheckbox(answersId, questionId);
  };
  return (
    <>
      {data.image ? 
        <div className="question-image">
          <img 
          style={{cursor: 'pointer'}}
          onClick={() => setIsPreViewImage(true)}
          src={`data:image/jpeg;base64,${data.image}`}
          />
          {isPreviewImage === true && (
						<Lightbox
							image={`data:image/jpeg;base64,${data.image}`}
							title={"question image"}
							onClose={() => setIsPreViewImage(false)}
						></Lightbox>
					)}
        </div>
      : 
        <div className="question-image"></div>
      }
      <div className="question">
        Question {index + 1}: {data.questionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answers-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={(event) =>
                      handleHandleCheckBox(event, a.id, data.questionId)
                    }
                  />
                  <label className="form-check-label">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
