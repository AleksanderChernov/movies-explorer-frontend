import './Profile.css';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import Preloader from '../../components/Movies/Preloader/Preloader';
import '../AuthForm/AuthForm.css'
import React from 'react';
import { nameRegex, emailRegex } from '../../utils/FormValidation';


export default function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const [hasErrorName, setHasErrorName] = React.useState(false)
  const [hasErrorMail, setHasErrorMail] = React.useState(false)
  const [errorNameMessage, setErrorNameMessage] = React.useState('')
  const [errorMailMessage, setErrorMailMessage] = React.useState('')
  const [nameInput, setNameInput] = React.useState('')
  const [mailInput, setMailInput] = React.useState('')

  function validateEmail(event) {
    const newMail = event.target.value;
    setMailInput(newMail)
    const isValid = emailRegex.test(newMail)
    if (isValid) {
      setHasErrorMail(false)
      setErrorMailMessage('')
    } else {
      setHasErrorMail(true)
      setErrorMailMessage('E-mail должен быть валиден')
    }
  }

  function validateName(event) {
    const newName = event.target.value;
    setNameInput(newName)
    const isValid = nameRegex.test(newName)
    if (isValid) {
      setHasErrorName(false)
      setErrorNameMessage('')
    } else {
      setHasErrorName(true)
      setErrorNameMessage('Имя должно быть заполнено и не иметь особых знаков/цифр')
    }
  }

  function makePopupVisible(state) {
    setInfoTooltip(state)
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      email: email,
    })
    setMessage('Данные изменены');
    setSuccess(true)
    makePopupVisible(true)
    setTimeout(()=> {
      makePopupVisible(false)
    }, 2000)
  } 

  const history = useHistory();
  
  function onSignOut(){
    props.setLoggedIn(false)
    localStorage.removeItem('token');
    history.push('/');
  }

  return(
    <section className="profile">
      <form className="profile__info-form" onSubmit={handleSubmit}>
        <h2 className="profile__welcome">Привет, {currentUser.name}!</h2>
        <div className="profile__info-section">
          <p className="profile__section-name">Имя</p>
          <input className="profile__input profile__input_username" 
            id="username" 
            name="username"  
            type="username"
            value={nameInput}
            onChange={e =>{ validateName(e); handleNameChange(e)}}
            placeholder={currentUser.name}
          />
        </div>
        <hr className="profile__section-separator"/>
        <div className="profile__info-section">
          <p className="profile__section-name">E-mail</p>
          <input className="profile__input profile__input_email" 
            id="email" 
            name="email"  
            type="email"
            value={mailInput}
            onChange={e =>{ validateEmail(e); handleEmailChange(e)}}
            placeholder={currentUser.email}
          />
        </div>
        { hasErrorName && <p className="profile__error">{errorNameMessage}</p>}
        { hasErrorMail && <p className="profile__error">{errorMailMessage}</p>}
        { hasErrorName || hasErrorMail 
        ? 
        <p className='profile__button profile__button_redact profile__button_locked'
          type="submit">
            Проверьте правильность данных
          </p> 
        : <button className='profile__button profile__button_redact' type="submit">
            Редактировать
          </button>
        }
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>
      </form>
      <InfoTooltip message={message} isOpen={isInfoTooltipOpen} isSuccessful={success}/>
      <Preloader preloaderActive={props.preloaderActive}/>
    </section>
  )
}