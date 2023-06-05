import { useDispatch } from 'react-redux';

import { resourceActions } from '../../../../../store/resourceSlice';

import './MemberAlumniCard.scss';

import grayBin from '../../../../../icons/gray-bin.svg';

function MemberAlumniCard(props) {
  const { alumni, typeArr } = props;
  const dispatch = useDispatch();

  const { id, type, name, isDeleted } = alumni;

  function deleteCardHandler() {
    dispatch(resourceActions.deleteMember({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="member-alumni-card">
      <p className="member-alumni-card__title">Alumni</p>
      <div className="name-container">
        <label>Name</label>
        <input id={`member#${id}#name`} type="text" defaultValue={name} placeholder="Name" required></input>
      </div>
      <select id={`member#${id}#type`} defaultValue={type || 'bachelor'}>
        {typeArr.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button className="member-alumni-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default MemberAlumniCard;
