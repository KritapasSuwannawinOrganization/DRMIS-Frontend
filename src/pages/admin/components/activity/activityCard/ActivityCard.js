import { useDispatch } from 'react-redux';

import pathToUrl from '../../../../../utils/pathToUrl';

import { resourceActions } from '../../../../../store/resourceSlice';

import './ActivityCard.scss';

import grayBin from '../../../../../icons/gray-bin.svg';

function ActivityCard(props) {
  const { activity } = props;

  const dispatch = useDispatch();

  const { id, poster_file_path, title, link, isDeleted, isNew } = activity;

  function deleteCardHandler() {
    dispatch(resourceActions.deleteActivity({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="activity-card">
      <p className="activity-card__title">Activity</p>
      <div className="activity-card__image-container">
        <img src={pathToUrl(poster_file_path)} alt=""></img>
        <input id={`activity#${id}#poster_file_path`} type="file" accept="image/*" required={isNew}></input>
      </div>
      <div className="activity-card__detail-container">
        <div className="title-container">
          <label>Title</label>
          <input id={`activity#${id}#title`} type="text" defaultValue={title} placeholder="Title"></input>
        </div>
        <div className="link-container">
          <label>Link</label>
          <input id={`activity#${id}#link`} type="text" defaultValue={link} placeholder="Link"></input>
        </div>
      </div>
      <button className="activity-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default ActivityCard;
