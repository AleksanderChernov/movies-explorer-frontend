import logo from '../../../images/Main/landing-logo.svg';
import './Promo.css';

export default function Promo() {
  return(
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src={logo} alt="Лого лэндинга"/>
    </section>
  )
}