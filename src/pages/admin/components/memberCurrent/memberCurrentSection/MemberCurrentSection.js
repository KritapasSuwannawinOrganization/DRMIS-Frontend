import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';

import pathToUrl from '../../../../../utils/pathToUrl';

import { storage } from '../../../../../utils/firebase';
import { resourceActions } from '../../../../../store/resourceSlice';

import MemberCurrentCard from '../memberCurrentCard/MemberCurrentCard';
import './MemberCurrentSection.scss';

function MemberCurrentSection(props) {
  const { title, allMemberArr, memberProfileLinkArr, status, type, studentImage } = props;

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const memberArr = allMemberArr.filter((member) => member.status === status && member.type === type);

  function confirmHandler(e) {
    e.preventDefault();
    const inputArr = Array.from(e.target).filter((element) => element.tagName === 'INPUT');

    if (isLoading) {
      return;
    }

    const firstPromiseArr = [];
    const promiseArr = [];

    function insertNewMember() {
      const nemMemberIdArr = memberArr.filter((member) => member.isNew && !member.isDeleted).map((member) => member.id);
      nemMemberIdArr.forEach((id) => {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName: 'member', data: { id, status, type } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      });
    }

    function insertNewProfileLink() {
      const newProfileLinkIdArr = [];
      memberArr
        .map((member) =>
          memberProfileLinkArr
            .filter(
              (memberProfileLink) =>
                member.profile_link_id_arr.includes(memberProfileLink.id) && memberProfileLink.isNew && !memberProfileLink.isDeleted
            )
            .map((memberProfileLink) => memberProfileLink.id)
        )
        .forEach((idArr) => idArr.forEach((id) => newProfileLinkIdArr.push(id)));

      newProfileLinkIdArr.forEach((id) => {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName: 'member_profile_link', data: { id } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      });
    }

    function deleteMember() {
      const deleteMemberIdArr = memberArr.filter((member) => member.isDeleted && !member.isNew).map((member) => member.id);
      deleteMemberIdArr.forEach((id) => {
        const targetMember = allMemberArr.find((member) => member.id === id);

        let previousFileName;
        try {
          previousFileName = targetMember.img_file_path.split('/')[1];
        } catch (err) {
          previousFileName = undefined;
        }

        if (previousFileName) {
          firstPromiseArr.push(
            new Promise((resolve, reject) => {
              deleteObject(ref(storage, `member/${previousFileName}`))
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
              body: JSON.stringify({ tableName: 'member', id }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      });
    }

    function deleteProfileLink() {
      const deleteProfileLinkIdArr = [];
      memberArr
        .map((member) =>
          memberProfileLinkArr
            .filter(
              (memberProfileLink) =>
                member.profile_link_id_arr.includes(memberProfileLink.id) && memberProfileLink.isDeleted && !memberProfileLink.isNew
            )
            .map((memberProfileLink) => memberProfileLink.id)
        )
        .forEach((idArr) => idArr.forEach((id) => deleteProfileLinkIdArr.push(id)));

      deleteProfileLinkIdArr.forEach((id) => {
        firstPromiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName: 'member_profile_link', id }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      });
    }

    function updateMemberName() {
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
    }

    function updateMemberRank() {
      const rankInputArr = inputArr.filter((input) => input.id.includes('#rank'));
      rankInputArr.forEach((rankInput) => {
        const [tableName, id] = rankInput.id.split('#');
        const rank = rankInput.value.trim();

        promiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName, id, data: { rank } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      });
    }

    function updateMemberEducationArr() {
      memberArr
        .filter((member) => !member.isDeleted)
        .forEach((member) => {
          const educationInputArr = inputArr.filter((input) => input.id.includes(`#${member.id}#education_arr`));
          const educationArr = educationInputArr.map((educationInput) => educationInput.value.trim()).filter((education) => education);

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tableName: 'member',
                  id: member.id,
                  data: { educationArr },
                }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });
    }

    function updateMemberProfileLinkIdArr() {
      memberArr
        .filter((member) => !member.isDeleted)
        .forEach((member) => {
          const profileLinkIdArr = inputArr
            .filter(
              (input, i) =>
                input.id.includes(`#${member.id}#profile_link_id_arr`) &&
                input.id.endsWith('title') &&
                input.value.trim() &&
                inputArr[i + 1].value.trim()
            )
            .map((input) => input.id.split('#')[3]);

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tableName: 'member',
                  id: member.id,
                  data: { profileLinkIdArr },
                }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        });
    }

    function updateProfileLinkTitle() {
      const profileLinkTitleInputArr = inputArr.filter((input) => input.id.includes('#profile_link_id_arr') && input.id.endsWith('title'));
      profileLinkTitleInputArr.forEach((profileLinkTitleInput) => {
        const id = profileLinkTitleInput.id.split('#')[3];
        const title = profileLinkTitleInput.value.trim();

        if (title) {
          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName: 'member_profile_link', id, data: { title } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        }
      });
    }

    function updateProfileLinkLink() {
      const profileLinkLinkInputArr = inputArr.filter((input) => input.id.includes('#profile_link_id_arr') && input.id.endsWith('link'));
      profileLinkLinkInputArr.forEach((profileLinkLinkInput) => {
        const id = profileLinkLinkInput.id.split('#')[3];
        const link = profileLinkLinkInput.value.trim();

        if (link) {
          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName: 'member_profile_link', id, data: { link } }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        }
      });
    }

    function deleteEmptyProfileLink() {
      inputArr.forEach((input, i) => {
        if (input.id.includes('#title') && (!input.value.trim() || !inputArr[i + 1].value.trim())) {
          const id = input.id.split('#')[3];

          promiseArr.push(
            new Promise((resolve, reject) => {
              fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableName: 'member_profile_link', id }),
              })
                .then(() => resolve())
                .catch((err) => reject(err));
            })
          );
        }
      });
    }

    function updateStudentImage() {
      const imageInput = inputArr.find((input) => input.id.includes('student_image'));

      const [tableName, id] = imageInput.id.split('#');
      const file = imageInput.files[0];

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;

        let previousFileName;
        try {
          previousFileName = studentImage.file_path.split('/')[1];
        } catch (err) {
          previousFileName = undefined;
        }

        // Upload new image
        promiseArr.push(
          new Promise((resolve, reject) => {
            uploadBytes(ref(storage, `student-image/${fileName}`), file)
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
              deleteObject(ref(storage, `student-image/${previousFileName}`))
                .then(() => {
                  resolve();
                })
                .catch((err) => reject(err));
            })
          );
        }

        // Update file_path
        promiseArr.push(
          new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ tableName, id, data: { filePath: `student-image/${fileName}` } }),
            })
              .then(() => resolve())
              .catch((err) => reject(err));
          })
        );
      }
    }

    switch (type) {
      case 'member':
        // New member
        insertNewMember();

        // New profile link
        insertNewProfileLink();

        // Deleted member
        deleteMember();

        // Deleted profile link
        deleteProfileLink();
        break;
      case 'visiting member':
        insertNewMember();

        insertNewProfileLink();

        deleteMember();

        deleteProfileLink();
        break;
      case 'graduate student':
        insertNewMember();

        insertNewProfileLink();

        deleteMember();

        deleteProfileLink();
        break;
      case 'undergraduate student':
        insertNewMember();

        deleteMember();
        break;
      default:
        break;
    }

    setIsLoading(true);

    Promise.all(firstPromiseArr)
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        switch (type) {
          case 'member':
            // Update member - Image
            const imageInputArr = inputArr.filter((input) => input.id.includes('#img_file_path'));
            imageInputArr.forEach((imageInput) => {
              const [tableName, id] = imageInput.id.split('#');
              const file = imageInput.files[0];

              if (file) {
                const fileName = `${Date.now()}_${file.name}`;

                let previousFileName;
                try {
                  previousFileName = memberArr.find((member) => member.id === Number(id)).img_file_path.split('/')[1];
                } catch (err) {
                  previousFileName = undefined;
                }

                // Upload new image
                promiseArr.push(
                  new Promise((resolve, reject) => {
                    uploadBytes(ref(storage, `member/${fileName}`), file)
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
                      deleteObject(ref(storage, `member/${previousFileName}`))
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
                      body: JSON.stringify({ tableName, id, data: { imgFilePath: `member/${fileName}` } }),
                    })
                      .then(() => resolve())
                      .catch((err) => reject(err));
                  })
                );
              }
            });

            // Update member - Name
            updateMemberName();

            // Update member - Rank
            updateMemberRank();

            // Update member - Education Arr
            updateMemberEducationArr();

            // Update member - Profile link Id Arr
            updateMemberProfileLinkIdArr();

            // Update profile link - title
            updateProfileLinkTitle();

            // Update profile link - link
            updateProfileLinkLink();

            // Delete empty profile link
            deleteEmptyProfileLink();
            break;
          case 'visiting member':
            updateMemberName();

            updateMemberEducationArr();

            updateMemberProfileLinkIdArr();

            updateProfileLinkTitle();

            updateProfileLinkLink();

            deleteEmptyProfileLink();
            break;
          case 'graduate student':
            updateMemberName();

            updateMemberRank();

            updateMemberProfileLinkIdArr();

            updateProfileLinkTitle();

            updateProfileLinkLink();

            deleteEmptyProfileLink();

            updateStudentImage();
            break;
          case 'undergraduate student':
            updateMemberName();

            updateStudentImage();
            break;
          default:
            break;
        }

        Promise.all(promiseArr)
          .catch((err) => console.log(err.message))
          .finally(() => {
            inputArr.filter((input) => input.type === 'file').forEach((input) => (input.value = ''));

            const lastPromiseArr = [];

            lastPromiseArr.push(
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

            lastPromiseArr.push(
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

            lastPromiseArr.push(
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

            Promise.all(lastPromiseArr)
              .then((dataArr) => {
                const allMemberArr = dataArr[0];
                const memberProfileLinkArr = dataArr[1];
                const studentImageArr = dataArr[2];

                dispatch(resourceActions.setAllMemberArr(allMemberArr));
                dispatch(resourceActions.setMemberProfileLinkArr(memberProfileLinkArr));
                dispatch(resourceActions.setStudentImageArr(studentImageArr));
              })
              .catch((err) => console.log(err.message))
              .finally(() => setIsLoading(false));
          });
      });
  }

  function addMoreHandler() {
    dispatch(resourceActions.addMember({ status, type }));
  }

  return (
    <form className="member-current-section" onSubmit={confirmHandler}>
      <div className="content">
        <p className="member-current-section__title">{title}</p>
        {studentImage && (
          <div className="member-current-card student-img">
            <img src={pathToUrl(studentImage.file_path)} alt=""></img>
            <input id={`student_image#${type === 'graduate student' ? 1 : 2}`} type="file" accept="image/*"></input>
          </div>
        )}
        {memberArr.map((member, i) => (
          <Fragment key={i}>
            <MemberCurrentCard member={member} memberProfileLinkArr={memberProfileLinkArr}></MemberCurrentCard>
          </Fragment>
        ))}
        <button className="member-current-section__add-btn" type="button" onClick={addMoreHandler}>
          Add More
        </button>
        <button className="member-current-section__confirm-btn" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating' : 'Confirm'}
        </button>
      </div>
    </form>
  );
}

export default MemberCurrentSection;
