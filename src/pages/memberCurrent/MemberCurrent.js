import React from 'react';
import { useSelector } from 'react-redux';

import './MemberCurrent.scss';

import drmisMember from '../../icons/drmis-member.svg';

function MemberCurrent() {
  const memberArr = useSelector((store) => store.resource.memberArr).filter((memberArr) => memberArr.status === 'current');
  const memberPublicationArr = useSelector((store) => store.resource.memberPublicationArr);

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
                  {member.rank !== '' ? ` (${member.rank})` : ''}
                </p>
                <ul>
                  {member.education_arr.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
                {member.publication_id_arr.length > 0 && (
                  <div className="content__publication">
                    <p>Publication:</p>&nbsp;
                    <div>
                      {member.publication_id_arr.map((id) => {
                        const memberPublication = memberPublicationArr.find((memberPublication) => memberPublication.id === id);
                        return (
                          <a key={id} href={memberPublication.link}>
                            {memberPublication.title}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberCurrent;
