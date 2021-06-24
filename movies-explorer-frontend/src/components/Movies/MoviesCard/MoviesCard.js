import './MoviesCard.css';
import React from "react";
export default function MoviesCard(props) {

  const [isSaved, setSaved] = React.useState(false);

    const toggle = React.useCallback(() => {
      setSaved(v => !v);
    }, []);

  return(
    <article className="movies-card">
      <img className="movies-card__image" src={`https://api.nomoreparties.co${props.movie.image.url}`} alt={props.movie.image.alt}/>
      <div className="movies-card__info-block">
        <div className="movies-card__title-length-column">
          <a className="movies-card__title" 
            target="_blank" 
            rel="noopener noreferrer"  
            href={props.movie.trailerLink}>{props.movie.nameRU}</a>
          <p className="movies-card__length">{props.movie.duration}</p>
        </div>
        {props.movieList 
        ? <button className={`${isSaved 
          ? 'movies-card__button movies-card__button_saved' 
          : 'movies-card__button' }`} type="checkbox" onClick={toggle} 
          />
        : <button className={`${ 'movies-card__delete' }`} type="checkbox"/>}
      </div>
    </article>
  )
}