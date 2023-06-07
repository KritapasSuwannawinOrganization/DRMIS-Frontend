import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';

import './Project.scss';

import drmisProject from '../../icons/drmis-project.svg';

function Project() {
  const projectArr = useSelector((store) => store.resource.projectArr);

  const ref1 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const mainControl1 = useAnimation();

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.5 };

  useEffect(() => {
    if (isInView1) {
      mainControl1.start('visible');
    }
  }, [isInView1, mainControl1]);

  return (
    <div className="project">
      <motion.div className="project__container" variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
        <img className="project__title" src={drmisProject} alt=""></img>
        <div className="content">
          {projectArr.map((project) => (
            <a key={project.id} href={project.link || null} target="_blank" rel="noreferrer">
              <p>
                {project.start_date} - {project.end_date}: {project.description}
              </p>
              <ul>
                {project.title && <li>Title: {project.title}</li>}
                {project.collaboration && <li>Collaboration: {project.collaboration}</li>}
                {project.scope && <li>Scope: {project.scope}</li>}
                {project.funder && <li>Funder: {project.funder}</li>}
              </ul>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Project;
