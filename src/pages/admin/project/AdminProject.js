import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import ProjectSection from '../components/project/projectSection/ProjectSection';
import './AdminProject.scss';

function AdminProject() {
  const dispatch = useDispatch();

  const projectArr = useSelector((store) => store.resource.projectArr);

  const [doneInitialize, setDoneInitialize] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/project`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { projectArr } = data;

        dispatch(resourceActions.setProjectArr(projectArr));
        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-project">
      <ProjectSection projectArr={projectArr}></ProjectSection>
    </div>
  );
}

export default AdminProject;
