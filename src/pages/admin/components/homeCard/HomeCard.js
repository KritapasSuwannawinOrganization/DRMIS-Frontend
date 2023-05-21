import pathToUrl from '../../../../utils/pathToUrl';

import './HomeCard.scss';

function HomeCard(props) {
  const { image, id } = props;

  return (
    <div className="home-card">
      <p className="home-card__title">Image {id}</p>
      <div className="home-card__img-container">
        <img src={pathToUrl(image.file_path)} alt="" className={`home-img-${id}`}></img>
      </div>
      <input id={`home_image#${id}`} type="file" accept="image/*"></input>
    </div>
  );
}

export default HomeCard;
