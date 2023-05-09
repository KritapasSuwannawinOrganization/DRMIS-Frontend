import { useState } from 'react';
import { useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';

import pathToUrl from '../../utils/pathToUrl';
import './Activity.scss';

import drmisActivity from '../../icons/drmis-activity.svg';

function Activity() {
  const activityArr = useSelector((store) => store.resource.activityArr);

  const [modalImageURL, setModalImageURL] = useState();

  function imageClickHandler() {
    setModalImageURL(this);
  }

  function closeClickHandler() {
    setModalImageURL();
  }

  return (
    <div className="activity">
      {modalImageURL && (
        <div className="activity__modal-container">
          <div className="modal">
            <img src={modalImageURL} alt=""></img>
            <div className="close-btn" onClick={closeClickHandler}>
              <div className="line slash"></div>
              <div className="line back-slash"></div>
            </div>
          </div>
        </div>
      )}
      <img className="activity__title" src={drmisActivity} alt=""></img>
      <div className="activity__container">
        <ScrollContainer className="content">
          {activityArr.map((activity) => (
            <div key={activity.id} className="activity-card">
              <img
                src={pathToUrl(activity.poster_file_path)}
                alt=""
                className={activity.title ? 'short' : ''}
                onClick={imageClickHandler.bind(pathToUrl(activity.poster_file_path))}
              ></img>
              {activity.title &&
                (activity.link ? (
                  <a href={activity.link} target="_blank" rel="noreferrer">
                    {activity.title}
                  </a>
                ) : (
                  <p>{activity.title}</p>
                ))}
            </div>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Activity;
