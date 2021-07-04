import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.js';
import React, { useEffect } from 'react';

export default function SavedMovies(props) {

  const isSavedList = true;

  console.log(props.savedMovies)
  console.log(props.filteredSavedMovies)

  useEffect(() => {
    props.searchForSaved();
    console.log('savedMoviesPath')
    props.savedMoviesPath(true)
    props.setCheckbox(false);
  }, [])

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
        error={props.error}
        searchWord={props.searchWord}
        searchWordState={props.isFiltering}
        preloaderActive={props.preloaderActive}
        moviesAmount={props.savedMovies.length}
        filteredSavedMoviesAmount={props.filteredSavedMovies.length}
      >
        {props.isReturning ? (
          props.SavedMovies.map((item) => (
            <MoviesCard
              isSavedList={isSavedList}
              key={item.nameRU}
              movie={item}
              handleDelete={props.handleDelete}
              savedMoviesId={props.savedMoviesId}
            />
        ))):(
          props.filteredSavedMovies.map((item) => (
            <MoviesCard
              isSavedList={isSavedList}
              key={item.nameRU}
              movie={item}
              handleDelete={props.handleDelete}
              savedMoviesId={props.savedMoviesId}
            />
        )))}    
      </MoviesCardList>
    </section>
  )
}
