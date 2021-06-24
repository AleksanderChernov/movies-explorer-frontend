import './MoviesCardList.css';
import React from 'react';
import Preloader from '../Preloader/Preloader.js';
import PopupFail from '../PopupFail/PopupFail.js';

export default function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
    {props.children}
    {props.searchWordState && props.searchWord.length > 0 && <Preloader 
      preloaderActive={props.preloaderActive}
    />}
    {props.searchWordState && props.searchWord.length <= 0 && <PopupFail text={'Нужно ввести ключевое слово'}/>}
    {props.searchWordState && props.moviesAmount <= 0 && <PopupFail text={'Ничего не найдено'}/>}
    </section>
  )
}