import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

import pathToUrl from '../../utils/pathToUrl';

import './Slider.scss';

import yellowArrowRight from '../../icons/yellow-arrow-right.svg';
import blueArrowRight from '../../icons/blue-arrow-right.svg';
// import blackEye from '../../icons/black-eye.svg';

function Slider(props) {
  const { title, dataArr, type, sliderRef } = props;

  const [categoryArr, setCategoryArr] = useState([]);
  const [currentCategory, setCurrentCategory] = useState();
  const [categorizedDataArr, setCategorizedDataArr] = useState([]);
  const [showingDataArr, setShowingDataArr] = useState([]);
  const [hasMore, setHasMore] = useState();
  const [startingIndex, setStartingIndex] = useState(0);

  const ref1 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const mainControl1 = useAnimation();

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };
  const transition = { duration: 0.5 };

  useEffect(() => {
    if (isInView1) {
      mainControl1.start('visible');
    }
  }, [isInView1, mainControl1]);

  useEffect(() => {
    setCategoryArr(Array.from(new Set(dataArr.map((data) => data.category_name))).filter((cat) => cat !== ''));
  }, [dataArr]);

  useEffect(() => {
    setCategorizedDataArr(dataArr.filter((data) => !currentCategory || data.category_name === currentCategory));
    setStartingIndex(0);
  }, [currentCategory, dataArr]);

  useEffect(() => {
    setShowingDataArr(categorizedDataArr.slice(startingIndex, startingIndex + 6));
  }, [startingIndex, categorizedDataArr]);

  useEffect(() => {
    setHasMore(categorizedDataArr.length > 6);
  }, [categorizedDataArr]);

  function categoryChangeHandler() {
    setCurrentCategory(this);
  }

  function scrollIntoView() {
    if (window.innerWidth <= 500 && sliderRef) {
      sliderRef.current.scrollIntoView();
    }
  }

  function nextClickHandler() {
    // if (showingDataArr[showingDataArr.length - 1].id === categorizedDataArr[categorizedDataArr.length - 1].id) {
    //   setStartingIndex(0);
    //   return;
    // }

    setStartingIndex((prev) => prev + 6);
    scrollIntoView();
  }

  function previousClickHandler() {
    // if (showingDataArr[0].id === categorizedDataArr[0].id) {
    //   setStartingIndex(categorizedDataArr.length - (categorizedDataArr.length % 6));
    //   return;
    // }

    setStartingIndex((prev) => prev - 6);
    scrollIntoView();
  }

  return (
    <div className="slider" ref={sliderRef}>
      <p className={`slider__title ${type}`}>{title}</p>
      <div className={`slider__nav ${type}`}>
        <button onClick={categoryChangeHandler} className={!currentCategory ? 'current' : ''}>
          Show All
        </button>
        {categoryArr.map((category) => (
          <button key={category} className={currentCategory === category ? 'current' : ''} onClick={categoryChangeHandler.bind(category)}>
            {category}
          </button>
        ))}
      </div>
      <motion.div className={`slider__body ${type}`} variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
        {hasMore && (
          <button onClick={previousClickHandler} className={`${showingDataArr[0].id === categorizedDataArr[0].id ? 'hide' : ''}`}>
            <img className="invert" src={type === 'dark-bg' ? yellowArrowRight : blueArrowRight} alt=""></img>
          </button>
        )}
        <div className="card-container">
          {showingDataArr.map((data) => (
            <a key={data.id} href={data.link || null} target="_blank" rel="noreferrer" className="card">
              <img className="card__img" src={data.img_file_path ? pathToUrl(data.img_file_path) : ''} alt=""></img>
              <div className="card__content">
                {data.category_name && (
                  <div className="card__content--header">
                    <p className="category">{data.category_name}</p>
                    {/* <div className="view-count">
                    <img src={blackEye} alt=""></img>
                    <p>{data.view_count}</p>
                  </div> */}
                  </div>
                )}
                <p className="card__content--title">{data.title}</p>
                {/* <div className="card__content--footer">
                  <img src={data.author_img_file_path} alt=""></img>
                  <p>{data.author_name}</p>
                </div> */}
              </div>
            </a>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={nextClickHandler}
            className={`${showingDataArr[showingDataArr.length - 1].id === categorizedDataArr[categorizedDataArr.length - 1].id ? 'hide' : ''}`}
          >
            <img src={type === 'dark-bg' ? yellowArrowRight : blueArrowRight} alt=""></img>
          </button>
        )}
        {hasMore && (
          <div className="bottom-btn-container">
            <button onClick={previousClickHandler} className={`${showingDataArr[0].id === categorizedDataArr[0].id ? 'hide' : ''}`}>
              <img className="invert" src={type === 'dark-bg' ? yellowArrowRight : blueArrowRight} alt=""></img>
            </button>
            <button
              onClick={nextClickHandler}
              className={`${showingDataArr[showingDataArr.length - 1].id === categorizedDataArr[categorizedDataArr.length - 1].id ? 'hide' : ''}`}
            >
              <img src={type === 'dark-bg' ? yellowArrowRight : blueArrowRight} alt=""></img>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Slider;
