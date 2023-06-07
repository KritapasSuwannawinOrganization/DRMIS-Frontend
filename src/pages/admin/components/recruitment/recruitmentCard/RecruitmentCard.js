import { useDispatch } from 'react-redux';

import pathToUrl from '../../../../../utils/pathToUrl';

import { resourceActions } from '../../../../../store/resourceSlice';

import './RecruitmentCard.scss';

import grayBin from '../../../../../icons/gray-bin.svg';

function RecruitmentCard(props) {
  const { recruitment } = props;

  const dispatch = useDispatch();

  const { id, poster_file_path, title, number, period, contact, isDeleted } = recruitment;

  function deleteCardHandler() {
    dispatch(resourceActions.deleteRecruitment({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="recruitment-card">
      <p className="recruitment-card__title">Recruitment</p>
      <div className="recruitment-card__image-container">
        <img src={pathToUrl(poster_file_path)} alt=""></img>
        <input id={`recruitment#${id}#poster_file_path`} type="file" accept="image/*"></input>
      </div>
      <div className="recruitment-card__detail-container">
        <div>
          <label>Title</label>
          <input id={`recruitment#${id}#title`} type="text" defaultValue={title} placeholder="Title" required></input>
        </div>
        <div>
          <label>Number of Positions</label>
          <input id={`recruitment#${id}#number`} type="number" defaultValue={number} placeholder="Number of Positions" required></input>
        </div>
        <div>
          <label>Period</label>
          <input id={`recruitment#${id}#period`} type="text" defaultValue={period} placeholder="Period" required></input>
        </div>
        <div>
          <label>Contact</label>
          <input id={`recruitment#${id}#contact`} type="text" defaultValue={contact} placeholder="Contact" required></input>
        </div>
      </div>
      <button className="recruitment-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default RecruitmentCard;
