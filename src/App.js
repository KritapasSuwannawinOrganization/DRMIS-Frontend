import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { resourceActions } from './store/resourceSlice';

import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import MemberCurrent from './pages/memberCurrent/MemberCurrent';
import MemberAlumni from './pages/memberAlumni/MemberAlumni';
import Project from './pages/project/Project';
import Publication from './pages/publication/Publication';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(resourceActions.setResearchPublicationArr());
    dispatch(resourceActions.setProjectArr());
    dispatch(resourceActions.setAllMember());
    dispatch(resourceActions.setMemberPublicationArr());
  }, [dispatch]);

  function navNoBackground() {
    return ['/member-current'].includes(pathname);
  }

  return (
    <>
      <Nav noBackground={navNoBackground()}></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/member-current" element={<MemberCurrent></MemberCurrent>}></Route>
        <Route path="/member-alumni" element={<MemberAlumni></MemberAlumni>}></Route>
        <Route path="/accomplishment-publication" element={<Publication></Publication>}></Route>
        <Route path="/accomplishment-project" element={<Project></Project>}></Route>
        <Route path="/contact-us" element={<></>}></Route>
        <Route path="/*" element={<Navigate replace to="/"></Navigate>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
