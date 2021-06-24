import './Movies.css';
import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import MoviesCard from './MoviesCard/MoviesCard.js';
import More from './More/More.js';

export default function Movies(props) {
  const movieList = true;
  const increaseAmount = 4;

  const [chosenAmount, setChosenAmount] = React.useState(12);

  function showMore() {
    return setChosenAmount(chosenAmount + increaseAmount);
  }

  return (
    <section className="movies">
      <SearchForm
        isSearchWordEntered={props.isSearchWordEntered}
        checkboxClicked={props.checkboxClicked} 
        isCheckboxOn={props.isCheckboxOn} 
        setSearchWord={props.setSearchWord}
      />        
      <MoviesCardList searchWord={props.searchWord}
        searchWordState={props.searchWordState} 
        preloaderActive={props.preloaderActive}
        moviesAmount={props.movies.length}
      >
        {props.searchWord.length > 0 && props.movies.slice(0, chosenAmount).map((item) => (
          <MoviesCard movieList={movieList} key={item.nameRU} movie={item}/>)
        )}
      </MoviesCardList>
      {props.movies.length > chosenAmount && props.searchWordState && props.searchWord.length > 0 && 
        <More showMore={showMore}
      />}
    </section>
  )
}