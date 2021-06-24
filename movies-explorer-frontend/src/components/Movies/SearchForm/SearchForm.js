import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import React from 'react';
import './SearchForm.css';

export default function SearchForm(props) {

  const [word, setWord] = React.useState('');

  function setSearch(e) {
    setWord(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.setSearchWord(word);
    props.isSearchWordEntered(true);
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
        <hr className="search-form__separator"></hr>
      </form>
    </section>
  )
}