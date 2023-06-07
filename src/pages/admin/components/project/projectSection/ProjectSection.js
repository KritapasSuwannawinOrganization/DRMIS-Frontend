import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import ProjectCard from '../projectCard/ProjectCard';
import './ProjectSection.scss';

function ProjectSection(props) {
  const { projectArr } = props;

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
    const newProjectIdArr = projectArr.filter((project) => project.isNew && !project.isDeleted).map((project) => project.id);
    newProjectIdArr.forEach((id) => {
      firstPromiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName: 'project', data: { id } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Delete
    const deleteProjectIdArr = projectArr.filter((project) => project.isDeleted && !project.isNew).map((project) => project.id);
    deleteProjectIdArr.forEach((id) => {
      const targetProject = projectArr.find((project) => project.id === id);

      let previousFileName;
      try {
        previousFileName = targetProject.img_file_path.split('/')[1];
      } catch (err) {
        previousFileName = undefined;
      }

      if (previousFileName) {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            deleteObject(ref(storage, `project/${previousFileName}`))
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
            body: JSON.stringify({ tableName: 'project', id }),
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
          previousFileName = projectArr.find((project) => project.id === Number(id)).img_file_path.split('/')[1];
        } catch (err) {
          previousFileName = undefined;
        }

        // Upload new image
        promiseArr.push(
          new Promise((resolve, reject) => {
            uploadBytes(ref(storage, `project/${fileName}`), file)
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
              deleteObject(ref(storage, `project/${previousFileName}`))
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
              body: JSON.stringify({ tableName, id, data: { imgFilePath: `project/${fileName}` } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      }
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

    // Description
    const descriptionInputArr = inputArr.filter((input) => input.id.includes('#description'));
    descriptionInputArr.forEach((descriptionInput) => {
      const [tableName, id] = descriptionInput.id.split('#');
      const description = descriptionInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { description } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Collaboration
    const collaborationInputArr = inputArr.filter((input) => input.id.includes('#collaboration'));
    collaborationInputArr.forEach((collaborationInput) => {
      const [tableName, id] = collaborationInput.id.split('#');
      const collaboration = collaborationInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { collaboration } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Funder
    const funderInputArr = inputArr.filter((input) => input.id.includes('#funder'));
    funderInputArr.forEach((funderInput) => {
      const [tableName, id] = funderInput.id.split('#');
      const funder = funderInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { funder } }),
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

    // Start Date
    const startDateInputArr = inputArr.filter((input) => input.id.includes('#start_date'));
    startDateInputArr.forEach((startDateInput) => {
      const [tableName, id] = startDateInput.id.split('#');
      const startDate = startDateInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { startDate } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // End Date
    const endDateInputArr = inputArr.filter((input) => input.id.includes('#end_date'));
    endDateInputArr.forEach((endDateInput) => {
      const [tableName, id] = endDateInput.id.split('#');
      const endDate = endDateInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { endDate } }),
          })
            .then(() => resolve())
            .catch((err) => reject(err));
        })
      );
    });

    // Scope
    const scopeInputArr = inputArr.filter((input) => input.id.includes('#scope'));
    scopeInputArr.forEach((scopeInput) => {
      const [tableName, id] = scopeInput.id.split('#');
      const scope = scopeInput.value.trim();

      promiseArr.push(
        new Promise((resolve, reject) => {
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableName, id, data: { scope } }),
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

              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource/project`)
                .then((res) => res.json())
                .then((result) => {
                  const { status, data, message } = result;

                  if (status !== 'success') {
                    throw new Error(message);
                  }

                  const { projectArr } = data;

                  dispatch(resourceActions.setProjectArr(projectArr));
                })
                .catch((err) => console.log(err.message))
                .finally(() => setIsLoading(false));
            });
        });
    }
  }

  function addMoreHandler() {
    dispatch(resourceActions.addProject());
  }

  return (
    <form className="project-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="project-section__title">Project</p>
        {projectArr.map((project, i) => (
          <React.Fragment key={i}>
            <ProjectCard project={project}></ProjectCard>
          </React.Fragment>
        ))}
        <button className="project-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="project-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default ProjectSection;
