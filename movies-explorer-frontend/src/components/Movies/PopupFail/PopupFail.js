import './PopupFail.css';

export default function PopupFail(props) {
  return(
    <h2 className="error__title">{props.text}</h2>
  )
}