import { useSelector } from 'react-redux';
import ScrollContainer from 'react-indiana-drag-scroll';

import pathToUrl from '../../utils/pathToUrl';
import './Activity.scss';

import drmisActivity from '../../icons/drmis-activity.svg';

function Activity() {
  const activityArr = useSelector((store) => store.resource.activityArr);

  return (
    <div className="activity">
      <img className="activity__title" src={drmisActivity} alt=""></img>
      <div className="activity__container">
        <ScrollContainer className="content">
          {activityArr.map((activity) => (
            <div key={activity.id} className="activity-card">
              <img src={pathToUrl(activity.poster_file_path)} alt="" className={activity.title ? 'short' : ''}></img>
              {activity.title &&
                (activity.link ? (
                  <a href={activity.link} target="_blank" rel="noreferrer">
                    {activity.title}
                  </a>
                ) : (
                  <p>{activity.title}</p>
                ))}
            </div>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}

export default Activity;
