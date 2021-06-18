import './Profile.css';

export default function Profile() {
  return(
    <section className="profile">
      <form className="profile__info-form">
        <h2 className="profile__welcome">Привет, Aleksander!</h2>
        <div className="profile__info-section">
          <p className="profile__section-name">Имя</p>
          <input className="profile__input profile__input_username" 
            id="username" 
            name="username"  
            type="username" 
            placeholder="Aleksander"/>
        </div>
        <hr className="profile__section-separator"/>
        <div className="profile__info-section">
          <p className="profile__section-name">E-mail</p>
          <input className="profile__input profile__input_email" 
            id="email" 
            name="email"  
            type="email" 
            placeholder="pochta@yandex.ru"/>
        </div>
        <button className="profile__button profile__button_redact" type="submit">Редактировать</button>
        <button className="profile__button profile__button_logout">Выйти из аккаунта</button>
      </form>
    </section>
  )
}