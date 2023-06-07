import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';
import { motion, useInView, useAnimation } from 'framer-motion';

import pathToUrl from '../../utils/pathToUrl';
import './Activity.scss';

import drmisActivity from '../../icons/drmis-activity.svg';

function Activity() {
  const activityArr = useSelector((store) => store.resource.activityArr);

  const [show, setShow] = useState(false);
  const [modalImageURL, setModalImageURL] = useState();

  const ref1 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const mainControl1 = useAnimation();

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.5 };

  useEffect(() => {
    if (isInView1) {
      mainControl1.start('visible');
    }
  }, [isInView1, mainControl1]);

  function imageClickHandler() {
    setModalImageURL(this);
  }

  function closeClickHandler() {
    setModalImageURL();
  }

  function imgLoadHandler() {
    setShow(true);
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
      <motion.div className="activity__container" variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
        <img className="activity__title" src={drmisActivity} alt=""></img>
        <ScrollContainer className="content">
          {activityArr.map((activity) => {
            const posterURL = pathToUrl(activity.poster_file_path);

            return (
              <div key={activity.id} className={`activity-img ${show ? 'show' : ''}`}>
                <img
                  src={posterURL}
                  alt=""
                  className={activity.title ? 'short' : ''}
                  onClick={imageClickHandler.bind(posterURL)}
                  onLoad={imgLoadHandler}
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
            );
          })}
        </ScrollContainer>
      </motion.div>
    </div>
  );
}

export default Activity;
