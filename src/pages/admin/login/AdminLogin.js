import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { userActions } from '../../../store/userSlice';

import './AdminLogin.scss';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminIsLoggedIn = useSelector((store) => store.user.adminIsLoggedIn);

  /* eslint-disable */
  useEffect(() => {
    if (adminIsLoggedIn) {
      navigate('/admin/home');
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
