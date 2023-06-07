import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';

import pathToUrl from '../../utils/pathToUrl';
import './Recruitment.scss';

import drmisRecruitment from '../../icons/drmis-recruitment.svg';

function Recruitment() {
  const recruitmentArr = useSelector((store) => store.resource.recruitmentArr);

  const [show, setShow] = useState(false);

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

  function imgLoadHandler() {
    setShow(true);
  }

  return (
    <div className="recruitment">
      <motion.div className="recruitment__container" variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
        <img className="recruitment__title" src={drmisRecruitment} alt=""></img>
        <div className="content">
          {recruitmentArr.map((recruitment) => (
            <React.Fragment key={recruitment.id}>
              {recruitment.poster_file_path && (
                <img src={pathToUrl(recruitment.poster_file_path)} alt="" className={`${show ? 'show' : ''}`} onLoad={imgLoadHandler}></img>
              )}
              <div>
                <p>{recruitment.title}</p>
                <ul>
                  <li>Number of positions: {recruitment.number} position</li>
                  <li>Working period: {recruitment.period}</li>
                  <li>Contact: {recruitment.contact}</li>
                </ul>
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Recruitment;
