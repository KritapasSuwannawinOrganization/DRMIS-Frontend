import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import RecruitmentCard from '../recruitmentCard/RecruitmentCard';
import './RecruitmentSection.scss';

function RecruitmentSection(props) {
  const { recruitmentArr } = props;

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
    const newRecruitmentIdArr = recruitmentArr
      .filter((recruitment) => recruitment.isNew && !recruitment.isDeleted)
      .map((recruitment) => recruitment.id);

    newRecruitmentIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'recruitment', data: { id } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Delete
    const deleteRecruitmentIdArr = recruitmentArr
      .filter((recruitment) => recruitment.isDeleted && !recruitment.isNew)
      .map((recruitment) => recruitment.id);

    deleteRecruitmentIdArr.forEach((id) => {
      const targetRecruitment = recruitmentArr.find((recruitment) => recruitment.id === id);

      let previousFileName;
      try {
        previousFileName = targetRecruitment.poster_file_path.split('/')[1];
      } catch (err) {
        previousFileName = undefined;
      }

      if (previousFileName) {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            deleteObject(ref(storage, `recruitment/${previousFileName}`))
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
            body: JSON.stringify({ tableName: 'recruitment', id }),
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
              previousFileName = recruitmentArr.find((recruitment) => recruitment.id === Number(id)).poster_file_path.split('/')[1];
            } catch (err) {
              previousFileName = undefined;
            }

            // Upload new image
            promiseArr.push(
              new Promise((resolve, reject) => {
                uploadBytes(ref(storage, `recruitment/${fileName}`), file)
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
                  deleteObject(ref(storage, `recruitment/${previousFileName}`))
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
                  body: JSON.stringify({ tableName, id, data: { posterFilePath: `recruitment/${fileName}` } }),
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

        // Number
        const numberInputArr = inputArr.filter((input) => input.id.includes('#number'));
        numberInputArr.forEach((numberInput) => {
          const [tableName, id] = numberInput.id.split('#');
          const number = Math.round(Number(numberInput.value));

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { number } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        // Period
        const periodInputArr = inputArr.filter((input) => input.id.includes('#period'));
        periodInputArr.forEach((periodInput) => {
          const [tableName, id] = periodInput.id.split('#');
          const period = periodInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { period } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });

        // Contact
        const contactInputArr = inputArr.filter((input) => input.id.includes('#contact'));
        contactInputArr.forEach((contactInput) => {
          const [tableName, id] = contactInput.id.split('#');
          const contact = contactInput.value.trim();

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { contact } }),
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

            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/recruitment`)
              .then((res) => res.json())
              .then((result) => {
                const { status, data, message } = result;

                if (status !== 'success') {
                  throw new Error(message);
                }

                const { recruitmentArr } = data;

                dispatch(resourceActions.setRecruitmentArr(recruitmentArr));
              })
              .catch((err) => console.log(err.message))
              .finally(() => setIsLoading(false));
          });
      });
  }

  function addMoreHandler() {
    dispatch(resourceActions.addRecruitment());
  }

  return (
    <form className="recruitment-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="recruitment-section__title">Recruitment</p>
        {recruitmentArr.map((recruitment, i) => (
          <React.Fragment key={i}>
            <RecruitmentCard recruitment={recruitment}></RecruitmentCard>
          </React.Fragment>
        ))}
        <button className="recruitment-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="recruitment-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default RecruitmentSection;
