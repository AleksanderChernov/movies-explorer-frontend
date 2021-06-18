import './Movies.css';
import React from 'react';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';
import MoviesCard from './MoviesCard/MoviesCard.js';
import More from './More/More.js';

import pic1 from '../../images/Card-Placeholders/pic1.png';
import pic2 from '../../images/Card-Placeholders/pic2.png';
import pic3 from '../../images/Card-Placeholders/pic3.png';
import pic4 from '../../images/Card-Placeholders/pic4.png';
import pic5 from '../../images/Card-Placeholders/pic5.png';
import pic6 from '../../images/Card-Placeholders/pic6.png';
import pic7 from '../../images/Card-Placeholders/pic7.png';
import pic8 from '../../images/Card-Placeholders/pic8.png';
import pic9 from '../../images/Card-Placeholders/pic9.png';
import pic10 from '../../images/Card-Placeholders/pic10.png';
import pic11 from '../../images/Card-Placeholders/pic11.png';
import pic12 from '../../images/Card-Placeholders/pic12.png';
import pic13 from '../../images/Card-Placeholders/pic13.png';
import pic14 from '../../images/Card-Placeholders/pic14.png';
import pic15 from '../../images/Card-Placeholders/pic15.png';
import pic16 from '../../images/Card-Placeholders/pic16.png';


export default function Movies(props) {

  const movieList = true;

  return (
    <section className="movies">
      <SearchForm checkboxClicked={props.checkboxClicked} isCheckboxOn={props.isCheckboxOn}/>
      <MoviesCardList>
        <MoviesCard movieList={movieList} image={pic1}/>
        <MoviesCard movieList={movieList} image={pic2}/>
        <MoviesCard movieList={movieList} image={pic3}/>
        <MoviesCard movieList={movieList} image={pic4}/>
        <MoviesCard movieList={movieList} image={pic5}/>
        <MoviesCard movieList={movieList} image={pic6}/>
        <MoviesCard movieList={movieList} image={pic7}/>
        <MoviesCard movieList={movieList} image={pic8}/>
        <MoviesCard movieList={movieList} image={pic9}/>
        <MoviesCard movieList={movieList} image={pic10}/>
        <MoviesCard movieList={movieList} image={pic11}/>
        <MoviesCard movieList={movieList} image={pic12}/>
        <MoviesCard movieList={movieList} image={pic13}/>
        <MoviesCard movieList={movieList} image={pic14}/>
        <MoviesCard movieList={movieList} image={pic15}/>
        <MoviesCard movieList={movieList} image={pic16}/>
      </MoviesCardList>
      <More/>
    </section>
  )
}