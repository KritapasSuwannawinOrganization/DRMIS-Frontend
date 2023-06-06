import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import ActivitySection from '../components/activity/activitySection/ActivitySection';
import './AdminActivity.scss';

function AdminActivity() {
  const dispatch = useDispatch();

  const activityArr = useSelector((store) => store.resource.activityArr);

  const [doneInitialize, setDoneInitialize] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/activity`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { activityArr } = data;

        dispatch(resourceActions.setActivityArr(activityArr));
        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-activity">
      <ActivitySection activityArr={activityArr}></ActivitySection>
    </div>
  );
}

export default AdminActivity;
