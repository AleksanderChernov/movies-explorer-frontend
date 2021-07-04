import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.js';
import React, { useEffect } from 'react';

export default function SavedMovies(props) {

  const isSavedList = true;

  const [moviesToShow, setMoviesToShow] = React.useState([]);

  console.log(props.savedMovies)
  console.log(props.filteredSavedMovies)
  console.log(moviesToShow)

  useEffect(()=>{
    setMoviesToShow(props.savedMovies);
    setMoviesToShow(props.filteredSavedMovies)
    console.log('я спамлю в сохраненных')
  }, [props.filteredSavedMovies])

  useEffect(() => {
    if(props.isCheckboxOn) {
      setMoviesToShow(moviesToShow.filter((movies) =>
      movies.duration <= 40))
      console.log('ну и в сохраненных')
    } else {
      setMoviesToShow(props.filteredSavedMovies)
      console.log('ответ отрицательный в сохраненных')
    }
  }, [props.isCheckboxOn])

  useEffect(() => {
    props.searchForSaved();
    props.savedMoviesPath(true)
    props.setCheckbox(false);
    props.setIsReturning(true)
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
        moviesAmount={moviesToShow.length || 0}
        filteredSavedMoviesAmount={moviesToShow.length || 0}
      >
        {moviesToShow.map((item) => (
            <MoviesCard
              isSavedList={isSavedList}
              key={item.nameRU}
              movie={item}
              handleDelete={props.handleDelete}
              savedMoviesId={props.savedMoviesId}
            />
        ))}    
      </MoviesCardList>
    </section>
  )
}
