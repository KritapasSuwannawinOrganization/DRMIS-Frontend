import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';

import AdminHome from '../home/AdminHome';
import AdminMemberCurrent from '../memberCurrent/AdminMemberCurrent';
import AdminMemberAlumni from '../memberAlumni/AdminMemberAlumni';
import AdminPublication from '../publication/AdminPublication';
import './AdminMain.scss';

function AdminMain() {
  const navigate = useNavigate();

  function pageChangeHandler(e) {
    navigate(e.target.value);
  }

  return (
    <div className="admin-main">
      <p className="admin-main__title">Please Select Page</p>
      <select defaultValue="home" onChange={pageChangeHandler} className="admin-main__select">
        <option value="home">Home</option>
        <option value="member-current">Current Member</option>
        <option value="member-alumni">Alumni</option>
        <option value="publication">Publications</option>
        <option value="activity">Activities</option>
        <option value="project">Projects</option>
        <option value="recruitment">Recruitment</option>
      </select>
      <Routes>
        <Route path="home" element={<AdminHome></AdminHome>}></Route>
        <Route path="member-current" element={<AdminMemberCurrent></AdminMemberCurrent>}></Route>
        <Route path="member-alumni" element={<AdminMemberAlumni></AdminMemberAlumni>}></Route>
        <Route path="publication" element={<AdminPublication></AdminPublication>}></Route>
        <Route path="*" element={<Navigate replace to="home"></Navigate>}></Route>
      </Routes>
    </div>
  );
}

export default AdminMain;
