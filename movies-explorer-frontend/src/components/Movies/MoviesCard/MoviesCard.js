import './MoviesCard.css';
import React from "react";
import { withRouter } from 'react-router-dom';


function MoviesCard(props) {

  const isSaved = props.savedMoviesId.indexOf(props.movie.id) !== -1;

  const handleSave = () => {
    props.handleSave(props.movie)
  }

  const handleDelete = () => {
    props.handleDelete(props.movie)
  }

  const handleDeleteWithoutHex = () => {
    props.handleDeleteWithoutHex(props.movie)
  }

  const currentRoute = props.history.location.pathname;

  const convertedTime = timeConverter(props.movie.duration)

  console.log(convertedTime)

  function timeConverter(num)
  { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return hours + " ч " + minutes + " мин";         
  }

  return(
    <article className="movies-card">
      <img className="movies-card__image" src={`https://api.nomoreparties.co${
        props.movie.image.url || props.movie.image}
      `} alt={props.movie.image.alt}/>
      <div className="movies-card__info-block">
        <div className="movies-card__title-length-column">
          <a className="movies-card__title" 
            target="_blank" 
            rel="noopener noreferrer"  
            href={props.movie.trailerLink || props.movie.trailer}>{props.movie.nameRU}</a>
          <p className="movies-card__length">{convertedTime}</p>
        </div>
        {props.movieList && isSaved && 
          <button className={`${'movies-card__button movies-card__button_saved'}`} 
          type="checkbox" 
          onClick={handleDeleteWithoutHex}
        />}
        {props.movieList && isSaved === false &&
          <button className={`${'movies-card__button' }`} 
          type="checkbox" 
          onClick={handleSave} 
        />}
        {props.isSavedList && currentRoute === '/saved-movies' && 
          <button className={`${ 'movies-card__delete' }`} 
          type="checkbox" 
          onClick={handleDelete}
        />}
      </div>
    </article>
  )
}

export default withRouter(MoviesCard)