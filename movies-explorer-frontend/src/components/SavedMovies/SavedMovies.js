import SearchForm from '../Movies/SearchForm/SearchForm.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList.js';
import MoviesCard from '../Movies/MoviesCard/MoviesCard.js';
import More from '../Movies/More/More.js';

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

export default function SavedMovies(props) {

  const isSavedList = true;

  return (
    <section className="movies">
      <SearchForm checkboxClicked={props.checkboxClicked} isCheckboxOn={props.isCheckboxOn}/>
      <MoviesCardList>
        <MoviesCard isSavedList={isSavedList} image={pic1}/>
        <MoviesCard isSavedList={isSavedList} image={pic2}/>
        <MoviesCard isSavedList={isSavedList} image={pic3}/>
        <MoviesCard isSavedList={isSavedList} image={pic4}/>
        <MoviesCard isSavedList={isSavedList} image={pic5}/>
        <MoviesCard isSavedList={isSavedList} image={pic6}/>
        <MoviesCard isSavedList={isSavedList} image={pic7}/>
        <MoviesCard isSavedList={isSavedList} image={pic8}/>
        <MoviesCard isSavedList={isSavedList} image={pic9}/>
        <MoviesCard isSavedList={isSavedList} image={pic10}/>
        <MoviesCard isSavedList={isSavedList} image={pic11}/>
        <MoviesCard isSavedList={isSavedList} image={pic12}/>
        <MoviesCard isSavedList={isSavedList} image={pic13}/>
        <MoviesCard isSavedList={isSavedList} image={pic14}/>
        <MoviesCard isSavedList={isSavedList} image={pic15}/>
        <MoviesCard isSavedList={isSavedList} image={pic16}/>
      </MoviesCardList>
      <More/>
    </section>
  )
}