import './MoviesCardList.css';
import React from 'react';
import Preloader from '../Preloader/Preloader.js';
import PopupFail from '../PopupFail/PopupFail.js';
import { withRouter } from 'react-router-dom';

function MoviesCardList(props) {

  const currentRoute = props.history.location.pathname;
  let errorText 
  /* if (props.searchWordState && props.searchWordLength <= 0) {
    errorText = <PopupFail text={'Нужно ввести ключевое слово'}/>
  } */

  console.log('число фильмов  ' + props.moviesAmount,
   'ищем? ' +  props.searchWordState,
    'есть ли слово ' +  props.searchWord.length
  )

  if (currentRoute === '/movies' 
    && props.moviesAmount <= 0 
    && props.searchWordState 
    && props.searchWord.length <= 0) {
    errorText = <PopupFail text={'Ничего не найдено'}/>
  }

  if (currentRoute === '/movies' 
    && props.moviesAmount <= 0 
    && props.isCheckboxOn === false
    && props.searchWord.length <= 0) {
    errorText = <PopupFail text={'Ничего не найдено'}/>
  }

  if (currentRoute === '/movies' 
    && props.moviesAmount <= 0 
    && props.isCheckboxOn === true
    && props.searchWord.length <= 0) {
    errorText = <PopupFail text={'Ничего не найдено'}/>
  }

  if (props.error) {
    errorText = <PopupFail text={'Произошла ошибка, попробуйте еще раз позднее'}/>
  }

  if (currentRoute === '/saved-movies' && props.searchWordState === false && props.moviesAmount <= 0) {
    errorText = <PopupFail text={'У вас нет сохраненных фильмов'}/>
  }

  if (currentRoute === '/saved-movies' && props.filteredSavedMoviesAmount <= 0 && props.searchWordState) {
    errorText = <PopupFail text={'Таких сохраненных фильмов не найдено'}/>
  }

  return (
    <section className="movies-card-list">
    {props.children}
    {props.searchWordState/*  && props.searchWord.length */ && <Preloader 
      preloaderActive={props.preloaderActive}
    />}
    {errorText}
    </section>
  )
}


export default withRouter(MoviesCardList);