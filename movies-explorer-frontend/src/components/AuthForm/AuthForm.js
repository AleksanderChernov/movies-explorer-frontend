import './AuthForm.css';
import logo from "../../images/Header/header-logo.svg"
import { Link } from "react-router-dom";
import { Route, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { nameRegex, emailRegex } from '../../utils/FormValidation';

function AuthForm(props) {

  const currentRoute = props.history.location.pathname;

  const [hasErrorName, setHasErrorName] = useState(false)
  const [hasErrorMail, setHasErrorMail] = useState(false)
  const [hasErrorPass, setHasErrorPass] = useState(false)
  const [errorNameMessage, setErrorNameMessage] = useState('')
  const [errorMailMessage, setErrorMailMessage] = useState('')
  const [errorPassMessage, setErrorPassMessage] = useState('')
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  function validateEmail(event) {
    const newMail = event.target.value;
    setMail(newMail)
    const isValid = emailRegex.test(newMail)
    if (isValid) {
      setHasErrorMail(false)
      setErrorMailMessage('')
    } else {
      setHasErrorMail(true)
      setErrorMailMessage('e-mail должен быть валиден')
    }
  }

  function validatePassword(event) {
    const newPass = event.target.value;
    setPassword(newPass)
    const isValid = newPass.length > 0
    if (isValid) {
      setHasErrorPass(false)
      setErrorPassMessage('')
    } else {
      setHasErrorPass(true)
      setErrorPassMessage('Пароль необходим')
    }
  }

  function validateName(event) {
    const newName = event.target.value;
    setName(newName)
    const isValid = nameRegex.test(newName)
    if (isValid) {
      setHasErrorName(false)
      setErrorNameMessage('')
    } else {
      setHasErrorName(true)
      setErrorNameMessage('Имя должно быть заполнено и не иметь особых знаков/цифр')
    }
  }

  return(
    <form className="auth-form" onSubmit={props.onSubmit}>
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
          onChange={e => { validateName(e); props.handleChange(e) }}
          required
          value={name}
        />
       { hasErrorName && <p className="auth-form__error auth-form__error_visible">{errorNameMessage}</p>}
        </>) : ''}
        <p className="auth-form__input-title">E-mail</p>
        <input className="auth-form__input auth-form__input_email"
          id="email" 
          name="email"  
          placeholder=""
          type="email"
          onChange={e => { validateEmail(e); props.handleChange(e)}}
          required
          value={mail}
        />
        { hasErrorMail && <p className="auth-form__error auth-form__error_visible">{errorMailMessage}</p>}
        <p className="auth-form__input-title">Пароль</p>
        <input className="auth-form__input auth-form__input_password"
          id="password" 
          name="password" 
          placeholder=""
          type="password"
          onChange={e => { validatePassword(e); props.handleChange(e)}}
          required
          value={password}
        />
       { hasErrorPass && <p className="auth-form__error auth-form__error_visible">{errorPassMessage}</p>}
      </div>
      {hasErrorName === false && hasErrorMail === false && hasErrorPass === false ? 
        <button className={`${currentRoute ==="/signin" ? "auth-form__button auth-form__button_signup"
        : "auth-form__button"}`} 
        type={ hasErrorName === false && hasErrorMail === false && hasErrorPass === false && "submit"}
        >{props.button}</button> 
        : <button className={"auth-form__button auth-form__button_signup_locked"}>
          Проверьте правильность условий
        </button>}
      {props.children}
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