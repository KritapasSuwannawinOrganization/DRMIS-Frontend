import { useSelector } from 'react-redux';

import Slider from '../../components/slider/Slider';
import './Home.scss';

import landingHome from '../../backgrounds/home-landing.png';

import homeAboutUs1 from '../../images/home-about-us-1.png';
import homeAboutUs2 from '../../images/home-about-us-2.png';
import homeAboutUs3 from '../../images/home-about-us-3.png';
import homeGoalObj1 from '../../images/home-goal-obj-1.png';
import homeGoalObj2 from '../../images/home-goal-obj-2.png';

import homeInfo1 from '../../icons/home-info-1.svg';
import homeInfo2 from '../../icons/home-info-2.svg';
import homeInfo3 from '../../icons/home-info-3.svg';

function Home() {
  const researchPublicationArr = useSelector((store) => store.resource.researchPublicationArr);
  const projectArr = useSelector((store) => store.resource.projectArr);

  return (
    <div className="home">
      <img className="home__landing" src={landingHome} alt=""></img>
      <div className="home__info">
        <div>
          <img className="green" src={homeInfo1} alt=""></img>
          <p>チュラーロンコーン大学災害リスク管理情報システム研究室</p>
        </div>
        <div>
          <img className="purple" src={homeInfo2} alt=""></img>
          <p>
            หน่วยปฏิบัติการวิจัยระบบสารสนเทศ<br></br>
            การจัดการภัยพิบัติและความเสี่ยง<br></br>
            จุฬาลงกรณ์มหาวิทยาลัย
          </p>
        </div>
        <div>
          <img className="green" src={homeInfo3} alt=""></img>
          <p>朱拉隆功大学灾害风险管理信息系统实验室</p>
        </div>
      </div>
      <div className="home__about-us">
        <div className="content">
          <div className="upper">
            <div className="img-container">
              <img src={homeAboutUs1} alt=""></img>
              <img src={homeAboutUs2} alt=""></img>
              <img src={homeAboutUs3} alt=""></img>
            </div>
            <div className="right">
              <p className="title">About Us</p>
              <p>
                <span>DRMIS</span> is a research unit at Chulalongkorn University. DRMIS laboratory has been established as the research
                group since 2018 by Asst. Prof. Natt Leelawat, D.Eng., and his kind colleagues from the Department of Industrial
                Engineering, Department of Water Resources Engineering, Department of Civil Engineering, and the International School of
                Engineering, Chulalongkorn University. DRMIS has been upgraded to a research unit since 2021. Currently, we are doing
                research on disaster management, management information systems, business continuity management, and data analysis related
                to disasters.
              </p>
            </div>
          </div>
          <div className="lower">
            <div className="img-container">
              <img src={homeGoalObj1} alt=""></img>
              <img src={homeGoalObj2} alt=""></img>
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
          </div>
        </div>
      </div>
      <div className="home__research-publication">
        <Slider title="Research Publications - Journal Articles" dataArr={researchPublicationArr} type="dark-bg"></Slider>
      </div>
      <div className="home__project">
        <Slider title="Selected DRMIS projects" dataArr={projectArr} type="light-bg"></Slider>
      </div>
    </div>
  );
}

export default Home;
