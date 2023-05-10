import './Footer.scss';

import blueFacebook from '../../icons/blue-facebook.svg';
import blueMouseUp from '../../icons/blue-mouse-up.svg';
// import whiteLinkedIn from '../../icons/white-linkedin.svg';
import yellowAddress from '../../icons/yellow-address.svg';
import yellowLocationBase from '../../icons/yellow-location-base.svg';
import yellowPhone from '../../icons/yellow-phone.svg';

function emailSubmitHandler(e) {
  e.preventDefault();

  const email = e.target[0].value;
  e.target[0].value = '';

  if (!email.includes('@') || email.length < 5) {
    return;
  }

  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/utils/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  }).catch((err) => console.log(err.message));
}

function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="upper">
          <div className="left">
            <p className="title">Contact us</p>
            <p>send inquiry for more information or collaboration</p>
            <form onSubmit={emailSubmitHandler}>
              <input id="email" type="email" placeholder="Email Address"></input>
              <button type="submit">
                <img src={blueMouseUp} alt=""></img>
              </button>
            </form>
          </div>
          <div className="right">
            <p className="title">Information</p>
            <div className="right__row">
              <img src={yellowPhone} alt=""></img>
              <p>
                <span>Tel:</span> (+66) 256 689 985
              </p>
            </div>
            <div className="right__row">
              <img src={yellowLocationBase} alt=""></img>
              <p>
                <span>Location:</span> Room 511, 5F, Engineering Building 4, Faculty of Engineering, Chulalongkorn University
              </p>
            </div>
            <div className="right__row">
              <img src={yellowAddress} alt=""></img>
              <p>
                <span>Postal Address:</span> Assoc. Prof. Natt Leelawat, D.Eng., Disaster and Risk Management Information Systems
                Laboratory, Department of Industrial Engineering, Faculty of Engineering, Chulalongkorn University, 254 Phayathai Road,
                Wangmai, Pathumwan, Bangkok 10330, Thailand
              </p>
            </div>
            <a href="https://www.facebook.com/DRMISChula" target="_blank" rel="noreferrer" className="right__row link">
              <img src={blueFacebook} alt="" className="bg-yellow"></img>
              <p>
                <span>Facebook:</span> Disaster and Risk Management Information Systems, Chulalongkorn University
              </p>
            </a>
            {/* <div className="right__row">
              <a className="yellow" href="https://www.facebook.com/DRMISChula" target="_blank" rel="noreferrer">
                <img src={blueFacebook} alt=""></img>
              </a>
              <a className="blue" href="https://google.com" target="_blank" rel="noreferrer">
                <img src={whiteLinkedIn} alt=""></img>
              </a>
            </div> */}
          </div>
        </div>
        <div className="lower">
          <p>Copyright &copy; 2023 DRMIS, Chulalongkorn University. All rights reserved.</p>
          {/* <div className="link-container">
            <a href="https://google.com" target="_blank" rel="noreferrer">
              Support
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              Privacy
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              Policy
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
