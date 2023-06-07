import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';

import pathToUrl from '../../utils/pathToUrl';

import './MemberCurrent.scss';

import drmisMember from '../../icons/drmis-member.svg';
import drmisVisitingMember from '../../icons/drmis-visiting-member.svg';
import drmisGraduateStudent from '../../icons/drmis-graduate-student.svg';
import drmisUndergraduateStudent from '../../icons/drmis-undergraduate-student.svg';

function MemberCurrent() {
  let location = useLocation();

  const allMemberArr = useSelector((store) => store.resource.allMemberArr);
  const memberProfileLinkArr = useSelector((store) => store.resource.memberProfileLinkArr);
  const studentImageArr = useSelector((store) => store.resource.studentImageArr);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });
  const isInView4 = useInView(ref4, { once: true });

  const mainControl1 = useAnimation();
  const mainControl2 = useAnimation();
  const mainControl3 = useAnimation();
  const mainControl4 = useAnimation();

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

  useEffect(() => {
    if (isInView2) {
      mainControl2.start('visible');
    }
  }, [isInView2, mainControl2]);

  useEffect(() => {
    if (isInView3) {
      mainControl3.start('visible');
    }
  }, [isInView3, mainControl3]);

  useEffect(() => {
    if (isInView4) {
      mainControl4.start('visible');
    }
  }, [isInView4, mainControl4]);

  const memberArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'member');
  const visitingMemberArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'visiting member');
  const graduateStudentArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'graduate student');
  const undergraduateStudentArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'undergraduate student');

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const doc = document.getElementById(location.hash.slice(1));
        doc && doc.scrollIntoView();
      }, 0);
    }
  }, [location.hash]);

  function imgURLFromId(id) {
    if (studentImageArr.length > 0) {
      const filePath = studentImageArr.find((obj) => obj.id === id).file_path;
      return filePath ? pathToUrl(filePath) : '';
    }

    return '';
  }

  return (
    <div className="member-current">
      <motion.div
        className="member-current__member-container"
        variants={variants}
        initial="hidden"
        animate={mainControl1}
        transition={transition}
        ref={ref1}
      >
        <img className="member-current__title" src={drmisMember} alt=""></img>
        <div className="content">
          {memberArr.map((member, i) => (
            <React.Fragment key={member.id}>
              <img src={pathToUrl(member.img_file_path)} alt=""></img>
              <div>
                <p>
                  {i + 1}. {member.name}
                  {member.rank ? ` (${member.rank})` : ''}
                </p>
                <ul>
                  {member.education_arr.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
                {member.profile_link_id_arr && member.profile_link_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.profile_link_id_arr.map((id) => {
                      const memberPublication = memberProfileLinkArr.find(
                        (memberPublication) => memberPublication.id === id && memberPublication.title && memberPublication.link
                      );

                      if (!memberPublication) {
                        return <React.Fragment key={id}></React.Fragment>;
                      }

                      return (
                        <a key={id} target="_blank" rel="noreferrer" href={memberPublication.link}>
                          {memberPublication.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="member-current__member-container"
        variants={variants}
        initial="hidden"
        animate={mainControl2}
        transition={transition}
        ref={ref2}
      >
        <img className="member-current__title sub" id="visiting-member" src={drmisVisitingMember} alt=""></img>
        <div className="content">
          <ol>
            {visitingMemberArr.map((member, i) => (
              <li key={member.id}>
                <p>
                  {member.name}
                  {member.education_arr ? ` (${member.education_arr[0]})` : ''}
                </p>
                {member.profile_link_id_arr && member.profile_link_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.profile_link_id_arr.map((id) => {
                      const memberPublication = memberProfileLinkArr.find(
                        (memberPublication) => memberPublication.id === id && memberPublication.title && memberPublication.link
                      );
                      return (
                        <a key={id} target="_blank" rel="noreferrer" href={memberPublication.link}>
                          {memberPublication.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
      <motion.div
        className="member-current__member-container"
        variants={variants}
        initial="hidden"
        animate={mainControl3}
        transition={transition}
        ref={ref3}
      >
        <img className="member-current__title sub" id="graduate-student" src={drmisGraduateStudent} alt=""></img>
        <div className="content">
          <img src={imgURLFromId(1)} alt="" className="full-width"></img>
          <ol>
            {graduateStudentArr.map((member, i) => (
              <li key={member.id}>
                <p>
                  {member.name}
                  {member.rank ? ` (${member.rank})` : ''}
                </p>
                {member.profile_link_id_arr && member.profile_link_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.profile_link_id_arr.map((id) => {
                      const memberPublication = memberProfileLinkArr.find(
                        (memberPublication) => memberPublication.id === id && memberPublication.title && memberPublication.link
                      );
                      return (
                        <a key={id} target="_blank" rel="noreferrer" href={memberPublication.link}>
                          {memberPublication.title}
                        </a>
                      );
                    })}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
      <motion.div
        className="member-current__member-container"
        variants={variants}
        initial="hidden"
        animate={mainControl4}
        transition={transition}
        ref={ref4}
      >
        <img className="member-current__title long" id="undergraduate-student" src={drmisUndergraduateStudent} alt=""></img>
        <div className="content">
          <img src={imgURLFromId(2)} alt="" className="full-width"></img>
          <div>
            {undergraduateStudentArr.map((member, i) => (
              <div key={member.id}>
                <p>
                  {i + 1}. {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default MemberCurrent;
