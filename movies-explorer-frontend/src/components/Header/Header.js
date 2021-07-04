import './Header.css'
import logo from '../../images/Header/header-logo.svg'
import logoProfile from '../../images/Main/button_profile.svg'
import {withRouter, Link} from 'react-router-dom';

import React from 'react';

function Header(props) {

  const currentRoute = props.history.location.pathname;

  if (currentRoute === '/' 
    || currentRoute === '/movies' 
    || currentRoute === '/saved-movies'
    || currentRoute === '/profile'
    ) {
    return(
      <header className={`header ${currentRoute === '/' ? 'header_beige' : ''}`}>
        <Link to="/">
          <img className="header__logo" alt="Иконка сайта" src={logo}></img>
        </Link>
        {props.loggedIn 
          ? (<div className="header__nav-container">
              <button className="header__burger" onClick={props.onBurgerClick}/>
              <div className="header__nav-links-container">
                <Link className="header__nav-link header__nav-link_bold" to="/movies">Фильмы</Link>
                <Link className="header__nav-link" to="/saved-movies">Сохраненные фильмы</Link>
                <div className="header__profile-container">
                  <Link className="header__auth-link" to="/profile">Аккаунт</Link>
                  <Link to="/profile">
                    <img className="header__profile-logo" src={logoProfile} alt="Лого аккаунта"/>
                  </Link>
                </div>
              </div>
            </div>)
          : (<div className="header__auth-container">
            <a className="header__registration" href="/signup">Регистрация</a>
            <a className="header__authorization" href="/signin">Войти</a>
          </div>)}
      </header>
    )
  } else {
    return null;
  }
}


export default withRouter(Header);