import './AuthForm.css';
import logo from "../../images/Header/header-logo.svg"
import { Link } from "react-router-dom";
import {Route, withRouter} from 'react-router-dom';

function AuthForm(props) {

  const currentRoute = props.history.location.pathname;

  return(
    <form className="auth-form">
      <div className="auth-form__header">
        <Link to="/">
          <img className="auth-form__logo" src={logo} alt="Лого проекта"></img>
        </Link>
          <h2 className="auth-form__title">{props.title}</h2>
      </div>
      <div className="auth-form__input-block">
        { currentRoute === "/signup" ? (<>
        <p className="auth-form__input-title">Имя</p>
        <input className="auth-form__input auth-form__input_name"
          id="name" 
          name="name"  
          placeholder=""
          type="name"
          required
        />
        </>) : ''}
        <p className="auth-form__input-title">E-mail</p>
        <input className="auth-form__input auth-form__input_email"
          id="email" 
          name="email"  
          placeholder=""
          type="email"
          required
        />
        <p className="auth-form__input-title">Пароль</p>
        <input className="auth-form__input auth-form__input_password"
          id="password" 
          name="password" 
          placeholder=""
          type="password"
          required
        />
      </div>
      <button className={`${
      currentRoute ==="/signin" 
      ? "auth-form__button auth-form__button_signup" 
      : "auth-form__button"}
      `} 
      type='submit'>{props.button}</button>
      <Route exact path='/signin'>
        <div className="auth-form__footer">
          <p className="auth-form__dynamic">Ещё не зарегистрированы?</p>
          <a className="auth-form__dynamic auth-form__dynamic_link" href="/signup">Регистрация</a>
        </div>
      </Route>
      <Route exact path='/signup'>
        <div className="auth-form__footer">
          <p className="auth-form__dynamic">Уже зарегистрированы?</p>
          <a className="auth-form__dynamic auth-form__dynamic_link" href="/signin">Войти</a>
        </div>
      </Route>
    </form>
  )
}

export default withRouter(AuthForm);