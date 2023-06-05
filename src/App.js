import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { resourceActions } from './store/resourceSlice';

import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import MemberCurrent from './pages/memberCurrent/MemberCurrent';
import MemberAlumni from './pages/memberAlumni/MemberAlumni';
import Project from './pages/project/Project';
import Publication from './pages/publication/Publication';
import Activity from './pages/activity/Activity';
import Recruitment from './pages/recruitment/Recruitment';
import ContactUs from './pages/contactUs/ContactUs';

import AdminLogin from './pages/admin/login/AdminLogin';
import AdminMain from './pages/admin/main/AdminMain';

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminIsLoggedIn = useSelector((store) => store.user.adminIsLoggedIn);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/resource`)
      .then((res) => res.json())
      .then((result) => {
        const { status, data, message } = result;

        if (status !== 'success') {
          throw new Error(message);
        }

        const { researchPublicationArr, projectArr, allMemberArr, memberProfileLinkArr, recruitmentArr, activityArr, homeImageArr, studentImageArr } =
          data;

        dispatch(resourceActions.setResearchPublicationArr(researchPublicationArr));
        dispatch(resourceActions.setProjectArr(projectArr));
        dispatch(resourceActions.setAllMemberArr(allMemberArr));
        dispatch(resourceActions.setMemberProfileLinkArr(memberProfileLinkArr));
        dispatch(resourceActions.setRecruitmentArr(recruitmentArr));
        dispatch(resourceActions.setActivityArr(activityArr));
        dispatch(resourceActions.setHomeImageArr(homeImageArr));
        dispatch(resourceActions.setStudentImageArr(studentImageArr));
      })
      .catch((err) => console.log(err.message));

    dispatch(resourceActions.setResearchPublicationArr());
    dispatch(resourceActions.setProjectArr());
    dispatch(resourceActions.setAllMemberArr());
    dispatch(resourceActions.setMemberProfileLinkArr());
    dispatch(resourceActions.setRecruitmentArr());
    dispatch(resourceActions.setActivityArr());
    dispatch(resourceActions.setHomeImageArr());
    dispatch(resourceActions.setStudentImageArr());
  }, [dispatch]);

  /* eslint-disable */
  useEffect(() => {
    if (pathname.startsWith('/admin') && !adminIsLoggedIn) {
      navigate('/admin/login');
    }
  }, [pathname, adminIsLoggedIn]);
  /* eslint-enable */

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/member-current" element={<MemberCurrent></MemberCurrent>}></Route>
        <Route path="/member-alumni" element={<MemberAlumni></MemberAlumni>}></Route>
        <Route path="/publication" element={<Publication></Publication>}></Route>
        <Route path="/activity" element={<Activity></Activity>}></Route>
        <Route path="/project" element={<Project></Project>}></Route>
        <Route path="/recruitment" element={<Recruitment></Recruitment>}></Route>
        <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>
        <Route path="/admin/login" element={<AdminLogin></AdminLogin>}></Route>
        <Route path="/admin/main/*" element={<AdminMain></AdminMain>}></Route>
        <Route path="/*" element={<Navigate replace to="/"></Navigate>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
