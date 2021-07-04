import './Movies.css';
import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import MoviesCard from './MoviesCard/MoviesCard.js';
import More from './More/More.js';

export default function Movies(props) {
  const movieList = true;

  const [chosenAmount, setChosenAmount] = React.useState(undefined);
  const [moviesToShow, setMoviesToShow] = React.useState([]);
  const [windowWidth, setWindowSize] = useState(undefined);
  const [addAmount, setIncreasedAmount] = React.useState(undefined);
  const lastSearchWord = localStorage.getItem('setWord') || '';

  function showMore() {
    return setChosenAmount(chosenAmount + addAmount);
  }

  console.log(lastSearchWord.length);
  console.log(props.movies);
  console.log(props.searchWord)

  useEffect(() => {
    props.searchForSaved();
    props.savedMoviesPath(false);
    props.setCheckbox(false);
    props.setIsReturning(true)
  }, [])

  useEffect(()=>{
    setMoviesToShow(props.movies);
    console.log('я спамлю')
  }, [props.movies])

  useEffect(() => {
    if(props.isCheckboxOn) {
      setMoviesToShow(moviesToShow.filter((movies) =>
      movies.duration <= 40))
      console.log('ну и')
    } else {
      setMoviesToShow(props.movies)
      console.log('ответ отрицательный')
    }
  }, [props.isCheckboxOn])

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
        moviesAmount={moviesToShow.length}
      >
        {moviesToShow.length && moviesToShow.slice(0, chosenAmount).map((item) => (
          <MoviesCard 
            handleDeleteWithoutHex={props.handleDeleteWithoutHex}
            savedMoviesId={props.savedMoviesId}
            movieList={movieList} 
            key={item.nameRU} 
            movie={item} 
            handleSave={props.handleSave}
            handleDelete={props.handleDelete}
          />)
        )}
      </MoviesCardList>
      {moviesToShow.length > chosenAmount &&
        <More showMore={showMore}
      />}
    </section>
  )
}
