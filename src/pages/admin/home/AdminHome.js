import { useSelector } from 'react-redux';

import HomeSection from '../components/homeSection/HomeSection';
import './AdminHome.scss';

function AdminHome() {
  const homeImageArr = useSelector((store) => store.resource.homeImageArr);

  const aboutUsImageArr = homeImageArr.slice(0, 3);
  const goalImageArr = homeImageArr.slice(3);

  return (
    <div className="admin-home">
      <HomeSection title="About Us Images" imageArr={aboutUsImageArr}></HomeSection>
      <HomeSection title="Goal and Objective Images" imageArr={goalImageArr}></HomeSection>
    </div>
  );
}

export default AdminHome;
