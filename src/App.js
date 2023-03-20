import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { resourceActions } from './store/resourceSlice';

import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resourceActions.setResearchPublicationArr());
    dispatch(resourceActions.setProjectArr());
  }, [dispatch]);

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/*" element={<Navigate replace to="/"></Navigate>}></Route>
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
