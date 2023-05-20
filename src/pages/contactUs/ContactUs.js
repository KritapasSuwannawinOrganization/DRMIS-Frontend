import './ContactUs.scss';

import drmisContactUs from '../../icons/drmis-contact-us.svg';

function ContactUs() {
  return (
    <div className="contact-us">
      <img className="contact-us__title" src={drmisContactUs} alt=""></img>
    </div>
  );
}

export default ContactUs;
