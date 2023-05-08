import { useSelector } from 'react-redux';

import './Publication.scss';

import drmisPublication from '../../icons/drmis-publication.svg';

function Publication() {
  const researchPublicationArr = useSelector((store) => store.resource.researchPublicationArr);

  const yearArr = [];

  researchPublicationArr.forEach((publication) => {
    const year = publication.year;
    !yearArr.includes(year) && yearArr.push(year);
  });
  yearArr.sort().reverse();

  console.log(yearArr);

  return (
    <div className="publication">
      <img className="publication__title" src={drmisPublication} alt=""></img>
      <div className="publication__container">
        <div className="content">
          {yearArr.map((year) => (
            <div key={year}>
              <p>Year {year}</p>
              <ul>
                {researchPublicationArr
                  .filter((publication) => publication.year === year)
                  .map((publication, i) => (
                    <li key={i}>
                      <a href={publication.link} target="_blank" rel="noreferrer">
                        {publication.full_name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Publication;
