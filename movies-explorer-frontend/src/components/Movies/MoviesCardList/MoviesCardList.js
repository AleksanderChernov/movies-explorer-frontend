import './MoviesCardList.css';
import React from 'react';
import Preloader from '../Preloader/Preloader.js'

export default function MoviesCardList({children}) {

  const [isPreloaderActivated, setPreloader] = React.useState(false);

  function togglePreloader() {
    setPreloader(prevState => !prevState);
  }

  return (
    <section className="movies-card-list">
      {children}
    {isPreloaderActivated && <Preloader preloaderIsOn={isPreloaderActivated} togglePreloader={togglePreloader}/>}
    </section>
  )
}