import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';

import './Publication.scss';

import drmisPublication from '../../icons/drmis-publication.svg';

function Publication() {
  const researchPublicationArr = useSelector((store) => store.resource.researchPublicationArr);

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

  const yearArr = [];

  researchPublicationArr.forEach((publication) => {
    const year = publication.year;
    !yearArr.includes(year) && yearArr.push(year);
  });
  yearArr.sort().reverse();

  return (
    <div className="publication">
      <motion.div className="publication__container" variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
        <img className="publication__title" src={drmisPublication} alt=""></img>
        <div className="content">
          {yearArr.map((year) => (
            <div key={year}>
              <p>Year {year}</p>
              <ul>
                {researchPublicationArr
                  .filter((publication) => publication.year === year)
                  .map((publication, i) => (
                    <li key={i}>
                      <a href={publication.link || null} target="_blank" rel="noreferrer">
                        {publication.full_name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Publication;
