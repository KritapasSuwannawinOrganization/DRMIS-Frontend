import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useDispatch, useSelector } from 'react-redux';

// import { userActions } from '../../store/userSlice';

import './Nav.scss';

import yellowLocation from '../../icons/yellow-location.svg';
import yellowClock from '../../icons/yellow-clock.svg';
// import yellowUser from '../../icons/yellow-user.svg';
import blueLogo from '../../icons/blue-logo.png';
import blueSearch from '../../icons/blue-search.svg';
import whiteSearch from '../../icons/white-search.svg';
import redSearch from '../../icons/red-search.svg';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_apiKey,
//   authDomain: process.env.REACT_APP_FIREBASE_authDomain,
//   projectId: process.env.REACT_APP_FIREBASE_projectId,
//   storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
//   appId: process.env.REACT_APP_FIREBASE_appId,
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

function Nav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const adminIsLoggedIn = useSelector((store) => store.user.adminIsLoggedIn);

  const [memberIsActive, setMemberIsActive] = useState(false);
  const [accomplishmentIsActive, setAccomplishmentIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [searchIsInvalid, setSearchIsInvalid] = useState(false);

  useEffect(() => {
    setMemberIsActive(false);
    setAccomplishmentIsActive(false);
    setSearchIsActive(false);
    setMenuIsActive(false);
  }, [pathname]);

  /* eslint-disable */
  // useEffect(() => {
  //   if (adminIsLoggedIn) {
  //     // navigate('/admin/home')
  //   }
  // }, [adminIsLoggedIn]);
  /* eslint-enable */

  function navClickHandler() {
    this !== 'member' && setMemberIsActive(false);
    this !== 'accomplishment' && setAccomplishmentIsActive(false);
    this !== 'search' && setSearchIsActive(false);

    switch (this) {
      case 'member':
        setMemberIsActive((prev) => !prev);
        break;
      case 'accomplishment':
        setAccomplishmentIsActive((prev) => !prev);
        break;
      case 'search':
        setSearchIsActive((prev) => !prev);
        break;
      default:
        break;
    }
  }

  function searchSubmitHandler(e) {
    e.preventDefault();
    setSearchIsInvalid(false);

    const search = e.target[0].value.toLowerCase();
    e.target[0].value = '';

    const keywordMapArr = [
      { '/': ['home', 'main'] },
      { '/member-current': ['current', 'member', 'professor'] },
      { '/member-current#visiting-member': ['visit'] },
      { '/member-current#undergraduate-student': ['undergraduate', 'bachelor'] },
      { '/member-current#graduate-student': ['graduate', 'master', 'doctor', 'student'] },
      { '/member-alumni': ['alumni'] },
      { '/publication': ['research', 'publication', 'paper', 'publish'] },
      { '/activity': ['activity'] },
      { '/project': ['project'] },
      { '/recruitment': ['recruit', 'job', 'career'] },
      { '/contact-us': ['contact'] },
    ];

    let found = false;

    keywordMapArr.forEach((keywordMap) => {
      const path = Object.keys(keywordMap)[0];
      const keywordArr = Object.values(keywordMap)[0];

      if (found) {
        return;
      }

      keywordArr.forEach((keyword) => {
        if (found) {
          return;
        }

        if (search.includes(keyword)) {
          found = true;
          navigate(path);
        }
      });
    });

    if (!found) {
      setSearchIsInvalid(true);
    }
  }

  function menuClickHandler() {
    setMenuIsActive((prev) => !prev);
  }

  // function loginLogoutHandler() {
  //   if (adminIsLoggedIn) {
  //     dispatch(userActions.logoutUser());
  //     navigate('/');
  //     return;
  //   }

  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       dispatch(userActions.loginUser({ email: result.user.email }));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  return (
    <div className="nav">
      <div className="nav__upper">
        <div className="content">
          {/* <div className="blank"></div> */}
          <div className="addr-working-container">
            <div className="addr">
              <img src={yellowLocation} alt=""></img>
              <p>Address : Room 511, 5F, Engineering Building 4, Faculty of Engineering, CU</p>
            </div>
            <div className="working">
              <img src={yellowClock} alt=""></img>
              <p>Working : Monday - Friday, 9:00am - 4:00pm</p>
            </div>
          </div>
          {/* <div className="login" onClick={loginLogoutHandler}>
            <img src={yellowUser} alt=""></img>
            <p>{adminIsLoggedIn ? 'Logout' : 'Login'}</p>
          </div> */}
        </div>
      </div>
      <div className="nav__lower">
        <div className="content">
          <Link className="logo" to="/">
            <img src={blueLogo} alt=""></img>
          </Link>
          {pathname.startsWith('/admin') ? (
            <p>Admin Site</p>
          ) : (
            <div className="btn-container">
              <div>
                <button onClick={navClickHandler.bind('member')}>Members</button>
                {memberIsActive && (
                  <div className="link-container">
                    <Link to="/member-current">Current</Link>
                    <Link to="/member-alumni">Alumni</Link>
                  </div>
                )}
              </div>
              <div>
                <button onClick={navClickHandler.bind('accomplishment')}>Accomplishments</button>
                {accomplishmentIsActive && (
                  <div className="link-container">
                    <Link to="/publication">Publications</Link>
                    <Link to="/activity">Activities</Link>
                    <Link to="/project">Projects</Link>
                  </div>
                )}
              </div>
              <div>
                <Link to="/recruitment">Recruitment</Link>
              </div>
              <div>
                <Link to="/contact-us">Contact Us</Link>
              </div>
            </div>
          )}
          <div className={`search-container ${pathname.startsWith('/admin') ? 'hidden' : ''}`}>
            <button onClick={navClickHandler.bind('search')}>
              <img src={blueSearch} alt=""></img>
              <p>Search</p>
            </button>
            {searchIsActive && (
              <form className="input-container" onSubmit={searchSubmitHandler}>
                <div className="input">
                  <input
                    placeholder="Search"
                    className={searchIsInvalid ? 'invalid' : ''}
                    onChange={() => setSearchIsInvalid(false)}
                  ></input>
                  <button type="submit">
                    <img src={searchIsInvalid ? redSearch : whiteSearch} alt=""></img>
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className={`nav-menu ${menuIsActive ? 'active' : ''}`} onClick={menuClickHandler}>
            <div className="nav-menu__line top"></div>
            <div className="nav-menu__line middle"></div>
            <div className="nav-menu__line bottom"></div>
            {menuIsActive && (
              <div className="nav-menu__link-container">
                <Link to="/member-current">Current Member</Link>
                <Link to="/member-alumni">Alumni</Link>
                <Link to="/publication">Publications</Link>
                <Link to="/activity">Activities</Link>
                <Link to="/project">Projects</Link>
                <Link to="/recruitment">Recruitment</Link>
                <Link to="/contact-us">Contact Us</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
