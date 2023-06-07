import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';

import './MemberAlumni.scss';

import drmisAlumni from '../../icons/drmis-alumni.svg';

function MemberAlumni() {
  const allMemberArr = useSelector((store) => store.resource.allMemberArr);

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

  const allAlumniArr = allMemberArr.filter((member) => member.status === 'alumni');

  const typeArr = ['doctor', 'master', 'bachelor', 'internship'];
  const yearArr = [];

  allAlumniArr.forEach((alumni) => {
    const year = alumni.year;
    !yearArr.includes(year) && yearArr.push(year);
  });
  yearArr.sort().reverse();

  function renderAlumni(year, type, i) {
    const filteredAlumniArr = allAlumniArr.filter((alumni) => alumni.year === year && alumni.type === type);

    if (filteredAlumniArr.length === 0) {
      return <React.Fragment key={i}></React.Fragment>;
    }

    return (
      <div key={i}>
        <p>{type}'s Alumni</p>
        <ol>
          {filteredAlumniArr.map((alumni, j) => (
            <li key={j}>{alumni.name}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="member-alumni">
      <motion.div
        className="member-alumni__alumni-container"
        variants={variants}
        initial="hidden"
        animate={mainControl1}
        transition={transition}
        ref={ref1}
      >
        <img className="member-alumni__title" src={drmisAlumni} alt=""></img>
        <div>
          {yearArr.map((year) => (
            <div key={year} className="alumni-year">
              <p className="alumni-year__year">{year} Alumni</p>
              <div className="alumni-year__card-container">{typeArr.map((type, i) => renderAlumni(year, type, i))}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default MemberAlumni;
