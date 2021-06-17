import { Link, withRouter } from "react-router-dom"
import logo from "../../images/Main/button_profile.svg"
import "./Navigation.css"

function Navigation(props) {

  const currentRoute = props.history.location.pathname;

  return (
    <section className={`navigation ${props.isOpen ? 'navigation_visible' : ''}`}>
      <div className="navigation__wrapper">
        <button className="navigation__button-close" type="button" onClick={props.onClose}></button>
        <ul className="navigation__list">
          <Link to="/"  onClick={props.onClose} className={`navigation__link ${
            currentRoute === '/'
          ? 'navigation__link_active' 
          : ''
          }`}>Главная</Link>
          <Link to="/movies" onClick={props.onClose} className={`navigation__link ${
            currentRoute === '/movies'
          ? 'navigation__link_active' 
          : ''
          }`}>Фильмы</Link>
          <Link to="/saved-movies" onClick={props.onClose} className={`navigation__link ${
            currentRoute === '/saved-movies'
          ? 'navigation__link_active' 
          : ''
          }`}>Сохраненные фильмы</Link>
        </ul>
        <div className="navigation__account-block">
            <Link className="navigation__account-link" to="/profile">Аккаунт</Link>
            <Link to="/profile">
              <img className="navigation__account-logo" src={logo} alt="Лого аккаунта"></img>
            </Link>
        </div>
      </div>
    </section>
  )
}

export default withRouter(Navigation);