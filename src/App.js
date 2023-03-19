import { Routes, Route, Navigate } from 'react-router-dom';

import Nav from './components/nav/Nav';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/*" element={<Navigate replace to="/"></Navigate>}></Route>
      </Routes>
    </>
  );
}

export default App;
