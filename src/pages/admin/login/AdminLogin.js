import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { auth } from '../../../utils/firebase';
import { userActions } from '../../../store/userSlice';

import './AdminLogin.scss';

const provider = new GoogleAuthProvider();

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminIsLoggedIn = useSelector((store) => store.user.adminIsLoggedIn);

  /* eslint-disable */
  useEffect(() => {
    if (adminIsLoggedIn) {
      navigate('/admin/main');
    }
  }, [adminIsLoggedIn]);
  /* eslint-enable */

  function loginHandler() {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(userActions.loginUser({ email: result.user.email }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="admin-login">
      <p className="admin-login__title">Login</p>
      <button onClick={loginHandler}>Login with Google</button>
    </div>
  );
}

export default AdminLogin;
