import './MoviesCard.css';
import React from "react";
export default function MoviesCard(props) {

  const [isSaved, setSaved] = React.useState(false);

    const toggle = React.useCallback(() => {
      setSaved(v => !v);
    }, []);

  return(
    <article className="movies-card">
      <img className="movies-card__image" src={props.image} alt="Обложка фильма"/>
      <div className="movies-card__info-block">
        <div className="movies-card__title-length-column">
          <a className="movies-card__title" 
            target="_blank" 
            rel="noopener noreferrer"  
            href="https://beatfilmfestival.ru/">33 слова о дизайне</a>
          <p className="movies-card__length">1ч42м</p>
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