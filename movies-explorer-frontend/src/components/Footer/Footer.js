import './Footer.css'
import {withRouter} from 'react-router-dom';

function Footer(props) {

  const currentRoute = props.history.location.pathname;

  if (currentRoute === '/' || currentRoute === '/movies' || currentRoute === '/saved-movies') {
    return(
      <footer className="footer">
        <h3 className="footer__announcer">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <hr className="footer__separator"/>
        <div className="footer__links-wrapper">
          <div className="footer__links-block footer__links-block_right">
            <a className="footer__link" 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://praktikum.yandex.ru/">Яндекс.Практикум
            </a>
            <a className="footer__link"
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://github.com/">Github
            </a>
            <a className="footer__link" 
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/">Facebook
            </a>
          </div>
          <div className="footer__links-block footer__links-block_left">
            <p className="footer__copyright"> &copy;2021</p>
          </div>
        </div>
      </footer>
    );
  } else {
    return null;
  }
}

export default withRouter(Footer);