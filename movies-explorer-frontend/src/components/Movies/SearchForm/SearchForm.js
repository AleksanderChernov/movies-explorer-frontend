import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm(props) {

  return (
    <section className="search-form__section">
      <form className="search-form__form">
        <div className="search-form__search-wrapper">
          <input className="search-form__input" placeholder="Фильм"/>
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