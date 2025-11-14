import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, useInView, useAnimation } from 'framer-motion';

import pathToUrl from '../../utils/pathToUrl';

import Slider from '../../components/slider/Slider';
import './Home.scss';

import homeInfo1 from '../../icons/home-info-1.svg';
import homeInfo2 from '../../icons/home-info-2.svg';
import homeInfo3 from '../../icons/home-info-3.svg';

import homePartner1 from '../../icons/home-partner-1.svg';
import homePartner2 from '../../icons/home-partner-2.svg';

function Home() {
  const homeImageArr = useSelector((store) => store.resource.homeImageArr);
  const researchPublicationArr = useSelector((store) => store.resource.researchPublicationArr);
  const projectArr = useSelector((store) => store.resource.projectArr);

  const researchRef = useRef();
  const projectRef = useRef();

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const isInView1 = useInView(ref1, { once: true });
  const isInView2 = useInView(ref2, { once: true });

  const mainControl1 = useAnimation();
  const mainControl2 = useAnimation();

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
    if (isInView2) {
      mainControl2.start('visible');
    }
  }, [isInView2, mainControl2]);

  function imgURLFromId(id) {
    if (homeImageArr.length > 0) {
      const filePath = homeImageArr.find((obj) => obj.id === id).file_path;
      return pathToUrl(filePath);
    }

    return '';
  }

  return (
    <div className="home">
      <div className="home__landing"></div>
      <div className="home__info">
        <div>
          <img className="green" src={homeInfo1} alt=""></img>
          <p>チュラーロンコーン大学災害リスク管理情報システム研究室</p>
        </div>
        <div>
          <img className="purple" src={homeInfo2} alt=""></img>
          <p>
            ศูนย์เชี่ยวชาญเฉพาะทางด้านระบบสารสนเทศการจัดการ <br></br>
            ภัยพิบัติและความเสี่ยงจุฬาลงกรณ์มหาวิทยาลัย <br></br>
          </p>
        </div>
        <div>
          <img className="green" src={homeInfo3} alt=""></img>
          <p>朱拉隆功大学灾害风险管理信息系统实验室</p>
        </div>
      </div>
      <div className="home__about-us">
        <div className="content">
          <motion.div className="upper" variants={variants} initial="hidden" animate={mainControl1} transition={transition} ref={ref1}>
            <div className="img-container">
              <img src={imgURLFromId(1)} alt=""></img>
              <img src={imgURLFromId(2)} alt=""></img>
              <img src={imgURLFromId(3)} alt=""></img>
            </div>
            <div className="right">
              <p className="title">About Us</p>
              <p>
                <span>DRMIS</span> is a Center of Excellence at Chulalongkorn University, established on 1 April 2025. 
                Originally founded in 2018 as a research group by Assoc. Prof. Natt Leelawat, D.Eng., 
                along with colleagues from the Department of Industrial Engineering, Department of Water Resources Engineering, 
                Department of Civil Engineering, and the International School of Engineering, 
                DRMIS was later upgraded to a research unit in 2021 before attaining its current status. 
                The center focuses on research in disaster management, management information systems, business continuity management, 
                and data analysis related to disasters.
.
              </p>
            </div>
          </motion.div>
          <motion.div className="lower" variants={variants} initial="hidden" animate={mainControl2} transition={transition} ref={ref2}>
            <div className="img-container">
              <img src={imgURLFromId(4)} alt=""></img>
              <img src={imgURLFromId(5)} alt=""></img>
            </div>
            <div className="right">
              <p className="title">Goals and objectives</p>
              <ul>
                <li>To create knowledge and research for the society</li>
                <li>
                  To provide information related to
                  <ul>
                    <li>Disaster Management</li>
                    <li>Business Continuity Management</li>
                    <li>Management Information Systems</li>
                  </ul>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="home__research-publication" ref={researchRef}>
        <Slider title="Research Publications - Journal Articles" dataArr={researchPublicationArr} type="dark-bg" sliderRef={researchRef}></Slider>
      </div>
      <div className="home__project" ref={projectRef}>
        <Slider title="Selected DRMIS projects" dataArr={projectArr} type="light-bg" sliderRef={projectRef}></Slider>
      </div>
      <div className="home__partner">
        <p>Our Partners</p>
        <div>
          <img src={homePartner1} alt=""></img>
          <img src={homePartner2} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
