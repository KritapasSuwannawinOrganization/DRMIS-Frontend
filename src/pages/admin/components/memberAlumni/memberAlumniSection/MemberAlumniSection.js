import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import { resourceActions } from '../../../../../store/resourceSlice';

import MemberAlumniCard from '../memberAlumniCard/MemberAlumniCard';
import './MemberAlumniSection.scss';

function MemberAlumniSection(props) {
  const { year, typeArr, allAlumniArr } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const alumniArr = allAlumniArr.filter((alumni) => alumni.year === year);

  function confirmHandler(e) {
    e.preventDefault();
    const inputArr = Array.from(e.target).filter((element) => element.tagName === 'INPUT' || element.tagName === 'SELECT');

    if (isLoading) {
      return;
    }

    const firstPromiseArr = [];

    // New member
    const nemMemberIdArr = alumniArr.filter((member) => member.isNew && !member.isDeleted).map((member) => member.id);
    nemMemberIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'member', data: { id, status: 'alumni', year } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Delete member
    const deleteMemberIdArr = alumniArr.filter((member) => member.isDeleted && !member.isNew).map((member) => member.id);
    deleteMemberIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'member', id }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    setIsLoading(true);

    Promise.all(firstPromiseArr)
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        const promiseArr = [];

        // Update name
        const nameInputArr = inputArr.filter((input) => input.id.includes('#name'));
        nameInputArr.forEach((nameInput) => {
          const [tableName, id] = nameInput.id.split('#');
          const name = nameInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { name } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        // Update type
        const typeInputArr = inputArr.filter((input) => input.id.includes('#type'));
        typeInputArr.forEach((typeInput) => {
          const [tableName, id] = typeInput.id.split('#');
          const type = typeInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { type } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        Promise.all(promiseArr)
          .catch((err) => console.log(err.message))
          .finally(() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/all-member`)
              .then((res) => res.json())
              .then((result) => {
                const { status, data, message } = result;

                if (status !== 'success') {
                  throw new Error(message);
                }

                const { allMemberArr } = data;

                dispatch(resourceActions.setAllMemberArr(allMemberArr));
              })
              .catch((err) => console.log(err.message))
              .finally(() => setIsLoading(false));
          });
      });
  }

  function addMoreHandler() {
    dispatch(resourceActions.addMember({ status: 'alumni', year }));
  }

  return (
    <form className="member-alumni-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="member-alumni-section__title">{year} Alumni</p>
        {alumniArr.map((alumni, i) => (
          <Fragment key={i}>
            <MemberAlumniCard alumni={alumni} typeArr={typeArr}></MemberAlumniCard>
          </Fragment>
        ))}
        <button className="member-alumni-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="member-alumni-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default MemberAlumniSection;
