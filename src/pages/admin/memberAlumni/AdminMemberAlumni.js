import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import MemberAlumniSection from '../components/memberAlumni/memberAlumniSection/MemberAlumniSection';
import './AdminMemberAlumni.scss';

function AdminMemberAlumni() {
  const dispatch = useDispatch();

  const allMemberArr = useSelector((store) => store.resource.allMemberArr);

  const [doneInitialize, setDoneInitialize] = useState(false);
  const [yearArr, setYearArr] = useState([]);

  const allAlumniArr = allMemberArr.filter((member) => member.status === 'alumni');

  const typeArr = ['doctor', 'master', 'bachelor', 'internship'];

  /* eslint-disable */
  useEffect(() => {
    const newYearArr = [];
    allAlumniArr.forEach((alumni) => {
      const year = alumni.year;
      !newYearArr.includes(year) && newYearArr.push(year);
    });
    newYearArr.sort().reverse();
    setYearArr(newYearArr);
  }, []);
  /* eslint-enable */

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/all-member`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { allMemberArr } = data;

        dispatch(resourceActions.setAllMemberArr(allMemberArr));
        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  function addYearHandler() {
    setYearArr((prev) => [prev[0] + 1, ...prev]);
  }

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-member-alumni">
      <div className="admin-member-alumni__add-more">
        <button onClick={addYearHandler}>Add Year</button>
      </div>
      {yearArr.map((year, i) => (
        <React.Fragment key={i}>
          <MemberAlumniSection year={year} typeArr={typeArr} allAlumniArr={allAlumniArr}></MemberAlumniSection>
        </React.Fragment>
      ))}
    </div>
  );
}

export default AdminMemberAlumni;
