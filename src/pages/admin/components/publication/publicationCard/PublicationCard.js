import { useDispatch } from 'react-redux';

import pathToUrl from '../../../../../utils/pathToUrl';

import { resourceActions } from '../../../../../store/resourceSlice';

import './PublicationCard.scss';

import grayBin from '../../../../../icons/gray-bin.svg';

function PublicationCard(props) {
  const { publication } = props;

  const dispatch = useDispatch();

  const { id, category_name, img_file_path, title, link, full_name, year, isDeleted, isNew } = publication;

  function deleteCardHandler() {
    dispatch(resourceActions.deleteResearchPublication({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="publication-card">
      <p className="publication-card__title">Publication</p>
      <div className="publication-card__image-container">
        <img src={pathToUrl(img_file_path)} alt=""></img>
        <input id={`research_publication#${id}#img_file_path`} type="file" accept="image/*" required={isNew}></input>
      </div>
      <div className="publication-card__detail-container">
        <div className="top">
          <div className="full-name-container">
            <label>Full Name</label>
            <input id={`research_publication#${id}#full_name`} type="text" defaultValue={full_name} placeholder="Full Name" required></input>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom__top">
            <div className="category-container">
              <label>Category</label>
              <input id={`research_publication#${id}#category_name`} type="text" defaultValue={category_name} placeholder="Category" required></input>
            </div>
            <div className="title-container">
              <label>Title</label>
              <input id={`research_publication#${id}#title`} type="text" defaultValue={title} placeholder="Title" required></input>
            </div>
          </div>
          <div className="bottom__bottom">
            <div className="link-container">
              <label>Link</label>
              <input id={`research_publication#${id}#link`} type="text" defaultValue={link} placeholder="Link"></input>
            </div>
            <div className="year-container">
              <label>Year</label>
              <input id={`research_publication#${id}#year`} type="number" defaultValue={year} placeholder="Year" required></input>
            </div>
          </div>
        </div>
      </div>
      <button className="publication-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default PublicationCard;
