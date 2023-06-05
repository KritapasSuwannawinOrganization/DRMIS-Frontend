import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import PublicationCard from '../publicationCard/PublicationCard';
import './PublicationSection.scss';

function PublicationSection(props) {
  const { publicationArr } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  function confirmHandler(e) {
    e.preventDefault();
    const inputArr = Array.from(e.target).filter((element) => element.tagName === 'INPUT' || element.tagName === 'SELECT');

    if (isLoading) {
      return;
    }

    const firstPromiseArr = [];
    const promiseArr = [];

    // New
    const newPublicationIdArr = publicationArr
      .filter((publication) => publication.isNew && !publication.isDeleted)
      .map((publication) => publication.id);
    newPublicationIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'research_publication', data: { id } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Delete
    const deletePublicationIdArr = publicationArr
      .filter((publication) => publication.isDeleted && !publication.isNew)
      .map((publication) => publication.id);

    deletePublicationIdArr.forEach((id) => {
      const targetPublication = publicationArr.find((publication) => publication.id === id);

      let previousFileName;
      try {
        previousFileName = targetPublication.img_file_path.split('/')[1];
      } catch (err) {
        previousFileName = undefined;
      }

      if (previousFileName) {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            deleteObject(ref(storage, `publication/${previousFileName}`))
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
            body: JSON.stringify({ tableName: 'research_publication', id }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Image
    const imageInputArr = inputArr.filter((input) => input.id.includes('#img_file_path'));
    imageInputArr.forEach((imageInput) => {
      const [tableName, id] = imageInput.id.split('#');
      const file = imageInput.files[0];

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;

        let previousFileName;
        try {
          previousFileName = publicationArr.find((publication) => publication.id === Number(id)).img_file_path.split('/')[1];
        } catch (err) {
          previousFileName = undefined;
        }

        // Upload new image
        promiseArr.push(
          new Promise((resolve, reject) => {
            uploadBytes(ref(storage, `publication/${fileName}`), file)
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
              deleteObject(ref(storage, `publication/${previousFileName}`))
                .then(() => {
                  resolve();
                })
                .catch((err) => reject(err));
            })
          );
        }

        // Update img_file_path
        promiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName, id, data: { imgFilePath: `publication/${fileName}` } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      }
    });

    // Name
    const nameInputArr = inputArr.filter((input) => input.id.includes('#full_name'));
    nameInputArr.forEach((nameInput) => {
      const [tableName, id] = nameInput.id.split('#');
      const fullName = nameInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { fullName } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Category
    const categoryInputArr = inputArr.filter((input) => input.id.includes('#category_name'));
    categoryInputArr.forEach((categoryInput) => {
      const [tableName, id] = categoryInput.id.split('#');
      const categoryName = categoryInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { categoryName } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
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

    // Year
    const yearInputArr = inputArr.filter((input) => input.id.includes('#year'));
    yearInputArr.forEach((yearInput) => {
      const [tableName, id] = yearInput.id.split('#');
      const year = yearInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { year } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    if (firstPromiseArr.length || promiseArr.length) {
      setIsLoading(true);

      Promise.all(firstPromiseArr)
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          Promise.all(promiseArr)
            .catch((err) => console.log(err.message))
            .finally(() => {
              inputArr.filter((input) => input.type === 'file').forEach((input) => (input.value = ''));

              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/publication`)
                .then((res) => res.json())
                .then((result) => {
                  const { status, data, message } = result;

                  if (status !== 'success') {
                    throw new Error(message);
                  }

                  const { researchPublicationArr } = data;

                  dispatch(resourceActions.setResearchPublicationArr(researchPublicationArr));
                })
                .catch((err) => console.log(err.message))
                .finally(() => setIsLoading(false));
            });
        });
    }
  }

  function addMoreHandler() {
    dispatch(resourceActions.addResearchPublication());
  }

  return (
    <form className="publication-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="publication-section__title">Research Publication</p>
        {publicationArr.map((publication, i) => (
          <React.Fragment key={i}>
            <PublicationCard publication={publication}></PublicationCard>
          </React.Fragment>
        ))}
        <button className="publication-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="publication-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default PublicationSection;
