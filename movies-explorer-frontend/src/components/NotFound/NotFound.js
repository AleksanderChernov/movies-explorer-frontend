import './NotFound.css';

export default function NotFound(props) {

  function goBack() {
    props.history.goBack();
  }

  return(
    <section className="not-found">
      <h2 className="not-found__title-error">404</h2>
      <p className="not-found__error-message">Страница не найдена</p>
      <button className="not-found__button-back" onClick={goBack}>Назад</button>
    </section>
  )
}