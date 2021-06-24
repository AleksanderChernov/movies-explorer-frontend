import './Profile.css';
import { useHistory } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import React from 'react';

export default function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext);;
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

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
    });
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
            onChange={handleNameChange}
            placeholder={currentUser.name}/>
        </div>
        <hr className="profile__section-separator"/>
        <div className="profile__info-section">
          <p className="profile__section-name">E-mail</p>
          <input className="profile__input profile__input_email" 
            id="email" 
            name="email"  
            type="email"
            onChange={handleEmailChange}
            placeholder={currentUser.email}/>
        </div>
        <button className="profile__button profile__button_redact" type="submit">Редактировать</button>
        <button className="profile__button profile__button_logout" onClick={onSignOut}>Выйти из аккаунта</button>
      </form>
    </section>
  )
}