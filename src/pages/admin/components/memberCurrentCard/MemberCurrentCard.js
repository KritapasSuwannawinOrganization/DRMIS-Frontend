import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import pathToUrl from '../../../../utils/pathToUrl';

import { resourceActions } from '../../../../store/resourceSlice';

import './MemberCurrentCard.scss';

import grayBin from '../../../../icons/gray-bin.svg';

function MemberCurrentCard(props) {
  const { member, memberProfileLinkArr } = props;
  const dispatch = useDispatch();

  const { id, type, img_file_path, name, rank, education_arr, profile_link_id_arr, isNew, isDeleted } = member;

  const addMoreProfileLinkHandler = useCallback(() => {
    dispatch(resourceActions.addMemberProfileLink({ memberId: id }));
  }, [dispatch, id]);

  const addMoreEducationHandler = useCallback(() => {
    dispatch(resourceActions.updateMember({ id, educationArr: [...education_arr, ''] }));
  }, [dispatch, id, education_arr]);

  useEffect(() => {
    if (!profile_link_id_arr) {
      dispatch(resourceActions.updateMember({ id, profileLinkIdArr: [] }));
    }

    if (!education_arr) {
      dispatch(resourceActions.updateMember({ id, educationArr: [] }));
    }
  }, [dispatch, id, education_arr, profile_link_id_arr]);

  useEffect(() => {
    if (profile_link_id_arr && profile_link_id_arr.length === 0) {
      addMoreProfileLinkHandler();
    }

    if (education_arr && education_arr.length === 0) {
      addMoreEducationHandler();
    }
  }, [profile_link_id_arr, education_arr, addMoreProfileLinkHandler, addMoreEducationHandler]);

  function deleteCardHandler() {
    dispatch(resourceActions.deleteMember({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className={`member-current-card ${type === 'undergraduate student' ? 'align-center' : ''}`}>
      <p className="member-current-card__title">{member.type}</p>
      {type === 'member' && (
        <div className="member-current-card__image-container">
          <img src={pathToUrl(img_file_path)} alt=""></img>
          <input id={`member#${id}#img_file_path`} type="file" accept="image/*" required={isNew}></input>
        </div>
      )}
      <div className="member-current-card__name-rank-education-container">
        <div className={`name-container ${type === 'undergraduate student' ? 'flex-row' : ''}`}>
          <label>Name</label>
          <input id={`member#${id}#name`} type="text" defaultValue={name} placeholder="Name" required></input>
        </div>
        {(type === 'member' || type === 'graduate student') && (
          <div className="rank-container">
            <label>Rank</label>
            <input id={`member#${id}#rank`} type="text" defaultValue={rank} placeholder="Rank" required></input>
          </div>
        )}
        {(type === 'member' || type === 'visiting member') && (
          <div className="education-container">
            <label>{type === 'visiting member' ? 'University' : 'Education'}</label>
            {education_arr &&
              education_arr.map((education, i) => (
                <input
                  id={`member#${id}#education_arr#${i}`}
                  type="text"
                  defaultValue={education}
                  key={i}
                  placeholder={type === 'member' ? 'Education' : 'University'}
                  required={i === 0}
                ></input>
              ))}
            {type === 'member' && (
              <button onClick={addMoreEducationHandler} type="button">
                Add More
              </button>
            )}
          </div>
        )}
      </div>
      {(type === 'member' || type === 'visiting member' || type === 'graduate student') && (
        <div className="member-current-card__profile-link-container">
          <label>Profile Link</label>
          {profile_link_id_arr &&
            profile_link_id_arr.map((profileLinkId, i) => {
              const { title, link } = memberProfileLinkArr.find((memberProfileLink) => memberProfileLink.id === profileLinkId);
              return (
                <div key={i} className="profile-link">
                  <input
                    id={`member#${id}#profile_link_id_arr#${profileLinkId}#title`}
                    type="text"
                    defaultValue={title}
                    className="title"
                    placeholder="Title"
                  ></input>
                  <input
                    id={`member#${id}#profile_link_id_arr#${profileLinkId}#link`}
                    type="text"
                    defaultValue={link}
                    className="link"
                    placeholder="Link"
                  ></input>
                </div>
              );
            })}
          <button onClick={addMoreProfileLinkHandler} type="button">
            Add More
          </button>
        </div>
      )}
      <button className="member-current-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default MemberCurrentCard;
