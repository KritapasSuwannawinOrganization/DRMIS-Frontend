import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { resourceActions } from '../../../store/resourceSlice';

import MemberCurrentSection from '../components/memberCurrent/memberCurrentSection/MemberCurrentSection';
import './AdminMemberCurrent.scss';

function AdminMemberCurrent() {
  const dispatch = useDispatch();

  const allMemberArr = useSelector((store) => store.resource.allMemberArr);
  const memberProfileLinkArr = useSelector((store) => store.resource.memberProfileLinkArr);
  const studentImageArr = useSelector((store) => store.resource.studentImageArr);

  const [doneInitialize, setDoneInitialize] = useState(false);

  useEffect(() => {
    const promiseArr = [];

    promiseArr.push(
      new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/all-member`)
          .then((res) => res.json())
          .then((result) => {
            const { status, data, message } = result;

            if (status !== 'success') {
              throw new Error(message);
            }

            resolve(data.allMemberArr);
          })
          .catch((err) => reject(err));
      })
    );

    promiseArr.push(
      new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/member-profile-link`)
          .then((res) => res.json())
          .then((result) => {
            const { status, data, message } = result;

            if (status !== 'success') {
              throw new Error(message);
            }

            resolve(data.memberProfileLinkArr);
          })
          .catch((err) => reject(err.message));
      })
    );

    promiseArr.push(
      new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/student-image`)
          .then((res) => res.json())
          .then((result) => {
            const { status, data, message } = result;

            if (status !== 'success') {
              throw new Error(message);
            }

            resolve(data.studentImageArr);
          })
          .catch((err) => reject(err.message));
      })
    );

    Promise.all(promiseArr)
      .then((dataArr) => {
        const allMemberArr = dataArr[0];
        const memberProfileLinkArr = dataArr[1];
        const studentImageArr = dataArr[2];

        dispatch(resourceActions.setAllMemberArr(allMemberArr));
        dispatch(resourceActions.setMemberProfileLinkArr(memberProfileLinkArr));
        dispatch(resourceActions.setStudentImageArr(studentImageArr));

        setDoneInitialize(true);
      })
      .catch((err) => console.log(err.message));
  }, [dispatch]);

  if (!doneInitialize) {
    return <></>;
  }

  return (
    <div className="admin-member-current">
      <MemberCurrentSection
        title="Current Member"
        allMemberArr={allMemberArr}
        memberProfileLinkArr={memberProfileLinkArr}
        status="current"
        type="member"
      ></MemberCurrentSection>
      <MemberCurrentSection
        title="Visiting Member"
        allMemberArr={allMemberArr}
        memberProfileLinkArr={memberProfileLinkArr}
        status="current"
        type="visiting member"
      ></MemberCurrentSection>
      <MemberCurrentSection
        title="Graduate Student"
        allMemberArr={allMemberArr}
        memberProfileLinkArr={memberProfileLinkArr}
        status="current"
        type="graduate student"
        studentImage={studentImageArr[0]}
      ></MemberCurrentSection>
      <MemberCurrentSection
        title="Undergraduate Student"
        allMemberArr={allMemberArr}
        memberProfileLinkArr={memberProfileLinkArr}
        status="current"
        type="undergraduate student"
        studentImage={studentImageArr[1]}
      ></MemberCurrentSection>
    </div>
  );
}

export default AdminMemberCurrent;
