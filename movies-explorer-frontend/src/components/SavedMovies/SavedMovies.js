import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.js';
import React, { useEffect } from 'react';

export default function SavedMovies(props) {

  const isSavedList = true;

  useEffect(() => {
    props.searchForSaved()
  }, [])

  return (
    <section className="movies">
      <SearchForm 
        isSearchWordEntered={props.isSearchWordEntered}
        checkboxClicked={props.checkboxClicked} 
        isCheckboxOn={props.isCheckboxOn} 
        setSearchWord={props.setSearchWord}
        savedMoviesPath={props.savedMoviesPath}
      />
      <MoviesCardList
        error={props.error}
        searchWord={props.searchWord}
        searchWordState={props.searchWordState} 
        preloaderActive={props.preloaderActive}
        moviesAmount={props.savedMovies.length}
        filteredSavedMoviesAmount={props.filteredSavedMovies.length}
      >
        {props.savedMovies.length > 0 && props.searchWordState === false && props.savedMovies.map((item) => (
          <MoviesCard 
          isSavedList={isSavedList} 
          key={item.nameRU} 
          movie={item} 
          handleDelete={props.handleDelete}
          savedMoviesId={props.savedMoviesId}
          />)
        )}

        {props.savedMovies.length > 0 && props.searchWordState && props.filteredSavedMovies.map((item) => (
          <MoviesCard 
          isSavedList={isSavedList} 
          key={item.nameRU} 
          movie={item} 
          handleDelete={props.handleDelete}
          savedMoviesId={props.savedMoviesId}
          />)
        )}

      </MoviesCardList>
    </section>
  )
}