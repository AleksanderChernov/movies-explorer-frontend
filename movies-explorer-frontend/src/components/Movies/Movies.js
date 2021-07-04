import './Movies.css';
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import MoviesCard from './MoviesCard/MoviesCard.js';
import More from './More/More.js';

export default function Movies(props) {
  const movieList = true;

  const [chosenAmount, setChosenAmount] = React.useState(undefined);
  const [windowWidth, setWindowSize] = useState(undefined);
  const [addAmount, setIncreasedAmount] = React.useState(undefined);

  function showMore() {
    return setChosenAmount(chosenAmount + addAmount);
  }

  const lastSearchWord = localStorage.getItem('setWord');

  useEffect(() => {
    /* props.searchForSaved(); */
    props.savedMoviesPath(false);
    props.setCheckbox(false);
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      function handleResize() {
        setWindowSize(window.innerWidth);
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      if (windowWidth >= 1280) {
        setChosenAmount(12)
        setIncreasedAmount(4)
      } else if (windowWidth >= 768 && windowWidth < 1280) {
        setChosenAmount(8)
        setIncreasedAmount(2)
      } else if (windowWidth > 320 && windowWidth < 480) {
        setChosenAmount(5)
        setIncreasedAmount(2)
      }

      return() => window.removeEventListener("resize", handleResize);
    }, 1000)
  }, [windowWidth]);

  return (
    <section className="movies">
      <SearchForm
        isSearchWordEntered={props.isSearchWordEntered}
        checkboxClicked={props.checkboxClicked} 
        isCheckboxOn={props.isCheckboxOn} 
        setSearchWord={props.setSearchWord}
        isSavedMoviesRequest={props.savedMoviesPath}
      />
      <MoviesCardList
        isCheckboxOn={props.isCheckboxOn} 
        error={props.error}
        searchWord={props.searchWord}
        searchWordState={props.isFiltering} 
        preloaderActive={props.preloaderActive}
        moviesAmount={props.movies.length}
      >
        {lastSearchWord.length ? props.movies.slice(0, chosenAmount).map((item) => (
          <MoviesCard 
            handleDeleteWithoutHex={props.handleDeleteWithoutHex}
            savedMoviesId={props.savedMoviesId}
            movieList={movieList} 
            key={item.nameRU} 
            movie={item} 
            handleSave={props.handleSave}
            handleDelete={props.handleDelete}
          />)
        ): ''/*  : props.movies.slice(0, chosenAmount).map((item) => (
          <MoviesCard 
            handleDeleteWithoutHex={props.handleDeleteWithoutHex}
            savedMoviesId={props.savedMoviesId}
            movieList={movieList} 
            key={item.nameRU} 
            movie={item} 
            handleSave={props.handleSave}
            handleDelete={props.handleDelete}
          />)
          ) */}
      </MoviesCardList>
      {props.movies.length > chosenAmount && lastSearchWord.length &&
        <More showMore={showMore}
      />}
    </section>
  )
}
