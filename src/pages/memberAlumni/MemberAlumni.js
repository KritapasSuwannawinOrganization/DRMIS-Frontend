import { useSelector } from 'react-redux';

import './MemberAlumni.scss';

import drmisAlumni from '../../icons/drmis-alumni.svg';

function MemberAlumni() {
  const allMemberArr = useSelector((store) => store.resource.allMemberArr);

  const allAlumniArr = allMemberArr.filter((member) => member.status === 'alumni');

  const typeArr = ['master', 'bachelor', 'internship'];
  const yearArr = [];

  allAlumniArr.forEach((alumni) => {
    const year = alumni.year;
    !yearArr.includes(year) && yearArr.push(year);
  });
  yearArr.sort().reverse();

  function renderAlumni(year, type, i) {
    const filteredAlumniArr = allAlumniArr.filter((alumni) => alumni.year === year && alumni.type === type);

    if (filteredAlumniArr.length === 0) {
      return <></>;
    }

    return (
      <div>
        <p>{type}'s Alumni</p>
        <ol>
          {filteredAlumniArr.map((alumni, i) => (
            <li>{alumni.name}</li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="member-alumni">
      <img className="member-alumni__title" src={drmisAlumni} alt=""></img>
      <div className="member-alumni__alumni-container">
        <div>
          {yearArr.map((year) => (
            <div key={year} className="alumni-year">
              <p className="alumni-year__year">{year} Alumni</p>
              <div className="alumni-year__card-container">{typeArr.map((type, i) => renderAlumni(year, type, i))}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberAlumni;
