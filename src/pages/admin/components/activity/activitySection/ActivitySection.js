import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import ActivityCard from '../activityCard/ActivityCard';
import './ActivitySection.scss';

function ActivitySection(props) {
  const { activityArr } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  function confirmHandler(e) {
    e.preventDefault();
    const inputArr = Array.from(e.target).filter((element) => element.tagName === 'INPUT' || element.tagName === 'SELECT');

    if (isLoading) {
      return;
    }

    const firstPromiseArr = [];

    // New
    const newActivityIdArr = activityArr.filter((activity) => activity.isNew && !activity.isDeleted).map((activity) => activity.id);
    newActivityIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'activity', data: { id } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Delete
    const deleteActivityIdArr = activityArr.filter((activity) => activity.isDeleted && !activity.isNew).map((activity) => activity.id);
    deleteActivityIdArr.forEach((id) => {
      const targetActivity = activityArr.find((activity) => activity.id === id);

      let previousFileName;
      try {
        previousFileName = targetActivity.poster_file_path.split('/')[1];
      } catch (err) {
        previousFileName = undefined;
      }

      if (previousFileName) {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            deleteObject(ref(storage, `activity/${previousFileName}`))
              .then(() => {
                resolve();
              })
              .catch((err) => reject(err));
          })
        );
      }

      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'activity', id }),
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

        // Image
        const imageInputArr = inputArr.filter((input) => input.id.includes('#poster_file_path'));
        imageInputArr.forEach((imageInput) => {
          const [tableName, id] = imageInput.id.split('#');
          const file = imageInput.files[0];

          if (file) {
            const fileName = `${Date.now()}_${file.name}`;

            let previousFileName;
            try {
              previousFileName = activityArr.find((activity) => activity.id === Number(id)).poster_file_path.split('/')[1];
            } catch (err) {
              previousFileName = undefined;
            }

            // Upload new image
            promiseArr.push(
              new Promise((resolve, reject) => {
                uploadBytes(ref(storage, `activity/${fileName}`), file)
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => reject(err));
              })
            );

            // Remove old image
            if (previousFileName) {
              promiseArr.push(
                new Promise((resolve, reject) => {
                  deleteObject(ref(storage, `activity/${previousFileName}`))
                    .then(() => {
                      resolve();
                    })
                    .catch((err) => reject(err));
                })
              );
            }

            // Update poster_file_path
            promiseArr.push(
              new Promise((resolve, reject) => {
                fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ tableName, id, data: { posterFilePath: `activity/${fileName}` } }),
                })
                  .then(() => resolve())
                  .catch((err) => reject(err));
              })
            );
          }
        });

        // Title
        const titleInputArr = inputArr.filter((input) => input.id.includes('#title'));
        titleInputArr.forEach((titleInput) => {
          const [tableName, id] = titleInput.id.split('#');
          const title = titleInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { title } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        // Link
        const linkInputArr = inputArr.filter((input) => input.id.includes('#link'));
        linkInputArr.forEach((linkInput) => {
          const [tableName, id] = linkInput.id.split('#');
          const link = linkInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { link } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        Promise.all(promiseArr)
          .catch((err) => console.log(err.message))
          .finally(() => {
            inputArr.filter((input) => input.type === 'file').forEach((input) => (input.value = ''));

            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/activity`)
              .then((res) => res.json())
              .then((result) => {
                const { status, data, message } = result;

                if (status !== 'success') {
                  throw new Error(message);
                }

                const { activityArr } = data;

                dispatch(resourceActions.setActivityArr(activityArr));
              })
              .catch((err) => console.log(err.message))
              .finally(() => setIsLoading(false));
          });
      });
  }

  function addMoreHandler() {
    dispatch(resourceActions.addActivity());
  }

  return (
    <form className="activity-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="activity-section__title">Activity</p>
        {activityArr.map((activity, i) => (
          <React.Fragment key={i}>
            <ActivityCard activity={activity}></ActivityCard>
          </React.Fragment>
        ))}
        <button className="activity-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="activity-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default ActivitySection;
