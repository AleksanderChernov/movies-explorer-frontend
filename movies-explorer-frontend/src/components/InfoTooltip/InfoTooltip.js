import Success from '../../images/InfoTooltip/Success.svg';
import Error from '../../images/InfoTooltip/Error.svg';
import "./InfoTooltip.css";

export default function InfoTooltip(props) {
  return(
  <section className={`infoTooltip ${props.isOpen ? 'infoTooltip_visible' : ''}`}>
    <div className="infoTooltip__container">
      <img className="infoTooltip__reactive-image" alt="Значок успеха или ошибки" src={props.isSuccessful 
        ? Success 
        : Error}></img>
      <h2 className="infoTooltip__message">{props.message}</h2>
    </div>
  </section>
  )
}