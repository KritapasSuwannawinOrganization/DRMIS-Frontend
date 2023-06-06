import { useDispatch } from 'react-redux';

import pathToUrl from '../../../../../utils/pathToUrl';

import { resourceActions } from '../../../../../store/resourceSlice';

import './ProjectCard.scss';

import grayBin from '../../../../../icons/gray-bin.svg';

function ProjectCard(props) {
  const { project } = props;

  const dispatch = useDispatch();

  const { id, category_name, img_file_path, title, link, collaboration, scope, funder, start_date, end_date, description, isDeleted, isNew } =
    project;

  function deleteCardHandler() {
    dispatch(resourceActions.deleteProject({ id }));
  }

  if (isDeleted) {
    return <></>;
  }

  return (
    <div className="project-card">
      <p className="project-card__title">Project</p>
      <div className="project-card__image-container">
        <img src={pathToUrl(img_file_path)} alt=""></img>
        <input id={`project#${id}#img_file_path`} type="file" accept="image/*" required={isNew}></input>
      </div>
      <div className="project-card__detail-container">
        <div className="row">
          <div>
            <label>Category</label>
            <input id={`project#${id}#category_name`} type="text" defaultValue={category_name} placeholder="Category" required></input>
          </div>
          <div>
            <label>Title</label>
            <input id={`project#${id}#title`} type="text" defaultValue={title} placeholder="Title" required></input>
          </div>
        </div>
        <div className="row">
          <div>
            <label>Description</label>
            <input id={`project#${id}#description`} type="text" defaultValue={description} placeholder="Description" required></input>
          </div>
          <div>
            <label>Collaboration</label>
            <input id={`project#${id}#collaboration`} type="text" defaultValue={collaboration} placeholder="Collaboration"></input>
          </div>
        </div>
        <div className="row">
          <div>
            <label>Funder</label>
            <input id={`project#${id}#funder`} type="text" defaultValue={funder} placeholder="Funder"></input>
          </div>
          <div>
            <label>Link</label>
            <input id={`project#${id}#link`} type="text" defaultValue={link} placeholder="Link"></input>
          </div>
        </div>
        <div className="row">
          <div>
            <label>Start Date</label>
            <input id={`project#${id}#start_date`} type="text" defaultValue={start_date} placeholder="Start Date" required></input>
          </div>
          <div>
            <label>End Date</label>
            <input id={`project#${id}#end_date`} type="text" defaultValue={end_date} placeholder="End Date" required></input>
          </div>
        </div>
        <div className="row">
          <div className="fill">
            <label>Scope</label>
            <input id={`project#${id}#scope`} type="text" defaultValue={scope} placeholder="Scope"></input>
          </div>
        </div>
      </div>
      <button className="project-card__delete-btn" type="button" onClick={deleteCardHandler}>
        <img src={grayBin} alt=""></img>
      </button>
    </div>
  );
}

export default ProjectCard;
