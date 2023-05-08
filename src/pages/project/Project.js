import { useSelector } from 'react-redux';

import './Project.scss';

import drmisProject from '../../icons/drmis-project.svg';

function Project() {
  const projectArr = useSelector((store) => store.resource.projectArr);

  return (
    <div className="project">
      <img className="project__title" src={drmisProject} alt=""></img>
      <div className="project__container">
        <div className="content">
          {projectArr.map((project) => (
            <div key={project.id}>
              <p>
                {project.start_date} - {project.end_date}: {project.showing_title}
              </p>
              <ul>
                {project.title && <li>Title: {project.title}</li>}
                {project.collaboration && <li>Collaboration: {project.collaboration}</li>}
                {project.scope && <li>Scope: {project.scope}</li>}
                {project.funder && <li>Funder: {project.funder}</li>}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Project;
