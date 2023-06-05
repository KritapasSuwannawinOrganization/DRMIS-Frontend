import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import PublicationSection from '../components/publication/publicationSection/PublicationSection';
import './AdminPublication.scss';

function AdminPublication() {
  const dispatch = useDispatch();

  const publicationArr = useSelector((store) => store.resource.researchPublicationArr);

  const [doneInitialize, setDoneInitialize] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/publication`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { researchPublicationArr } = data;

        dispatch(resourceActions.setResearchPublicationArr(researchPublicationArr));
        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-publication">
      <PublicationSection publicationArr={publicationArr}></PublicationSection>
    </div>
  );
}

export default AdminPublication;
