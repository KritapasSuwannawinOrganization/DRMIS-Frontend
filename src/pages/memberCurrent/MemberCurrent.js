import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './MemberCurrent.scss';

import drmisMember from '../../icons/drmis-member.svg';
import drmisVisitingMember from '../../icons/drmis-visiting-member.svg';
import drmisGraduateStudent from '../../icons/drmis-graduate-student.svg';
import drmisUndergraduateStudent from '../../icons/drmis-undergraduate-student.svg';

import memberGraduateStudent from '../../images/member-graduate-students.png';
import memberUndergraduateStudent from '../../images/member-undergraduate-students.png';

function MemberCurrent() {
  let location = useLocation();

  const allMemberArr = useSelector((store) => store.resource.allMemberArr);
  const memberPublicationArr = useSelector((store) => store.resource.memberPublicationArr);

  const memberArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'member');
  const visitingMemberArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'visiting member');
  const graduateStudentArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'graduate student');
  const undergraduateStudentArr = allMemberArr.filter((member) => member.status === 'current' && member.type === 'undergraduate student');

  useEffect(() => {
    setTimeout(() => {
      document.getElementById(location.hash.slice(1)).scrollIntoView();
    }, 0);
  }, [location.hash]);

  return (
    <div className="member-current">
      <img className="member-current__title" src={drmisMember} alt=""></img>
      <div className="member-current__member-container">
        <div className="content">
          {memberArr.map((member, i) => (
            <React.Fragment key={member.id}>
              <img src={member.img_file_path} alt=""></img>
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
                {member.publication_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.publication_id_arr.map((id) => {
                      const memberPublication = memberPublicationArr.find((memberPublication) => memberPublication.id === id);
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
      </div>
      <img className="member-current__title sub" id="visiting-member" src={drmisVisitingMember} alt=""></img>
      <div className="member-current__member-container">
        <div className="content">
          <ol>
            {visitingMemberArr.map((member, i) => (
              <li key={member.id}>
                <p>
                  {member.name}
                  {member.education_arr ? ` (${member.education_arr[0]})` : ''}
                </p>
                {member.publication_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.publication_id_arr.map((id) => {
                      const memberPublication = memberPublicationArr.find((memberPublication) => memberPublication.id === id);
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
      </div>
      <img className="member-current__title sub" id="graduate-student" src={drmisGraduateStudent} alt=""></img>
      <div className="member-current__member-container">
        <div className="content">
          <img src={memberGraduateStudent} alt="" className="full-width"></img>
          <ol>
            {graduateStudentArr.map((member, i) => (
              <li key={member.id}>
                <p>
                  {member.name}
                  {member.rank ? ` (${member.rank})` : ''}
                </p>
                {member.publication_id_arr && member.publication_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    {member.publication_id_arr.map((id) => {
                      const memberPublication = memberPublicationArr.find((memberPublication) => memberPublication.id === id);
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
      </div>
      <img className="member-current__title long" id="undergraduate-student" src={drmisUndergraduateStudent} alt=""></img>
      <div className="member-current__member-container">
        <div className="content">
          <img src={memberUndergraduateStudent} alt="" className="full-width"></img>
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
      </div>
    </div>
  );
}

export default MemberCurrent;
