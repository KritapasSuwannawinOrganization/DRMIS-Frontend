import { useSelector } from 'react-redux';

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
            หน่วยปฏิบัติการวิจัยระบบสารสนเทศ <br></br>
            การจัดการภัยพิบัติและความเสี่ยง <br></br>
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
              <img src={imgURLFromId(1)} alt=""></img>
              <img src={imgURLFromId(2)} alt=""></img>
              <img src={imgURLFromId(3)} alt=""></img>
            </div>
            <div className="right">
              <p className="title">About Us</p>
              <p>
                <span>DRMIS</span> is a research unit at Chulalongkorn University. DRMIS laboratory has been established as the research group since
                2018 by Asst. Prof. Natt Leelawat, D.Eng., and his kind colleagues from the Department of Industrial Engineering, Department of Water
                Resources Engineering, Department of Civil Engineering, and the International School of Engineering, Chulalongkorn University. DRMIS
                has been upgraded to a research unit since 2021. Currently, we are doing research on disaster management, management information
                systems, business continuity management, and data analysis related to disasters.
              </p>
            </div>
          </div>
          <div className="lower">
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
          </div>
        </div>
      </div>
      <div className="home__research-publication">
        <Slider title="Research Publications - Journal Articles" dataArr={researchPublicationArr} type="dark-bg"></Slider>
      </div>
      <div className="home__project">
        <Slider title="Selected DRMIS projects" dataArr={projectArr} type="light-bg"></Slider>
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
