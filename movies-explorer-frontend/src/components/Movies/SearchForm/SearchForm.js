import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from 'react';
import './SearchForm.css';
import { withRouter } from 'react-router-dom';

function SearchForm(props) {

  const [word, setWord] = React.useState('');

  const currentRoute = props.history.location.pathname;
  const [errorMessage, setErrorMessage] = React.useState('');

  function setSearch(e) {
    setWord(e.target.value);
  }

  function handleSubmit(e) {
    if (word.length) {
      e.preventDefault();
      props.setSearchWord(word);
      props.isSearchWordEntered(true);
      setErrorMessage('')
      /* props.isSavedMoviesRequest(false) */
    } else if (word.length && currentRoute === '/saved-movies') {
      e.preventDefault();
      props.setSearchWord(word);
      props.isSearchWordEntered(true);
      setErrorMessage('')
      /* props.isSavedMoviesRequest(true) */
    } else {
      e.preventDefault();
      setErrorMessage('Нужно ввести ключевое слово')
    }
  }

  return (
    <section className="search-form__section">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__search-wrapper">
          <input 
            className="search-form__input" 
            placeholder="Фильм" 
            onChange={setSearch} 
            type='text'/>
          <button className="search-form__find-button">Найти</button>
        </div>
        <div className="search-form__checkbox-wrapper">
          <FilterCheckbox checkboxClicked={props.checkboxClicked} isCheckboxOn={props.isCheckboxOn}/>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
        <span className="search-form__search-error">{errorMessage}</span>
        <hr className="search-form__separator"></hr>
      </form>
    </section>
  )
}
export default withRouter(SearchForm)
