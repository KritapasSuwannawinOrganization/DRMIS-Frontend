import pathToUrl from '../../../../utils/pathToUrl';

import './HomeCard.scss';

function HomeCard(props) {
  const { image } = props;

  return (
    <div className="home-card">
      <p className="home-card__title">Image {image.id}</p>
      <div className="home-card__img-container">
        <img src={pathToUrl(image.file_path)} alt="" className={`home-img-${image.id}`}></img>
      </div>
      <input id={`home_image#${image.id}`} type="file" accept="image/*"></input>
    </div>
  );
}

export default HomeCard;
