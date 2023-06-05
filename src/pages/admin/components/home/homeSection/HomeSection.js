import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import HomeCard from '../homeCard/HomeCard';
import './HomeSection.scss';

function HomeSection(props) {
  const { title, imageArr } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  function confirmHandler(e) {
    e.preventDefault();
    const form = e.target;

    if (isLoading) {
      return;
    }

    const promiseArr = [];

    Array.from(form)
      .slice(0, -1)
      .forEach((input) => {
        const [tableName, id] = input.id.split('#');
        const file = input.files[0];

        if (file) {
          const fileName = `${Date.now()}_${file.name}`;

          let previousFileName;
          try {
            previousFileName = imageArr.find((image) => image.id === Number(id)).file_path.split('/')[1];
          } catch (err) {
            previousFileName = undefined;
          }

          // Upload new image
          promiseArr.push(
            new Promise((resolve, reject) => {
              uploadBytes(ref(storage, `home/${fileName}`), file)
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
                deleteObject(ref(storage, `home/${previousFileName}`))
                  .then(() => {
                    resolve();
                  })
                  .catch((err) => reject(err));
              })
            );
          }

          // Update filePath
          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName, id, data: { filePath: `home/${fileName}` } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        }
      });

    if (promiseArr.length) {
      setIsLoading(true);

      Promise.all(promiseArr)
        .catch((err) => console.log(err.message))
        .finally(() => {
          Array.from(form)
            .slice(0, -1)
            .forEach((input) => {
              input.value = '';
            });

          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/home-image`)
            .then((res) => res.json())
            .then((result) => {
              const { status, message, data } = result;

              if (status !== 'success') {
                throw new Error(message);
              }

              dispatch(resourceActions.setHomeImageArr(data.homeImageArr));
            })
            .catch((err) => console.log(err.message))
            .finally(() => setIsLoading(false));
        });
    }
  }

  return (
    <form className="home-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="home-section__title">{title}</p>
        {imageArr.map((image, i) => (
          <Fragment key={i}>
            <HomeCard image={image}></HomeCard>
          </Fragment>
        ))}
        <button className="home-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default HomeSection;
