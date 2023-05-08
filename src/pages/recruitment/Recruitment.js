import React from 'react';
import { useSelector } from 'react-redux';

import './Recruitment.scss';

import drmisRecruitment from '../../icons/drmis-recruitment.svg';

function Recruitment() {
  const recruitmentArr = useSelector((store) => store.resource.recruitmentArr);

  return (
    <div className="recruitment">
      <img className="recruitment__title" src={drmisRecruitment} alt=""></img>
      <div className="recruitment__container">
        <div className="content">
          {recruitmentArr.map((recruitment) => (
            <React.Fragment key={recruitment.id}>
              <img src={recruitment.poster}></img>
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
      </div>
    </div>
  );
}

export default Recruitment;
