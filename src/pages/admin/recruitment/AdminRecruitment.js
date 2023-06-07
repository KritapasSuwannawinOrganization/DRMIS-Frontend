import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import RecruitmentSection from '../components/recruitment/recruitmentSection/RecruitmentSection';
import './AdminRecruitment.scss';

function AdminRecruitment() {
  const dispatch = useDispatch();

  const recruitmentArr = useSelector((store) => store.resource.recruitmentArr);

  const [doneInitialize, setDoneInitialize] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/recruitment`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { recruitmentArr } = data;

        dispatch(resourceActions.setRecruitmentArr(recruitmentArr));
        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-recruitment">
      <RecruitmentSection recruitmentArr={recruitmentArr}></RecruitmentSection>
    </div>
  );
}

export default AdminRecruitment;
