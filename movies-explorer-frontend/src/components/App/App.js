import './App.css';
import React, { useEffect } from "react";
import { Route, Switch, withRouter, useHistory} from 'react-router-dom';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import NotFound from '../NotFound/NotFound.js';
import Navigation from '../Navigation/Navigation.js';
import ProtectedRoute from '../ProtectedRoute/ProtecteRoute.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import MainApi from '../../utils/MainApi.js';
import MoviesApi from '../../utils/MoviesApi.js';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isNavBarOpen, setNavBar] = React.useState(false);
  const [isCheckboxOn, setCheckbox] = React.useState(true);
  const [preloaderActive, setPreloader] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [searchWord, setSearchWord] = React.useState('');
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [searchWordState, setSearchWordState] = React.useState(false);

  const fetchMovies = async () => {
    const res = await MoviesApi.getMovies();
    localStorage.setItem('ReceivedMovies', JSON.stringify(res));
  }

  function togglePreloader(state) {
    setPreloader(state)
  }

  /* useEffect(() => {
    setFilteredResults(filteredResults.filter((films) => films.length >= 40))
  }, [isCheckboxOn])
 */
  useEffect(() => {
    togglePreloader(false);
  }, [filteredResults])

  useEffect(() => {
    activateSearch();
    togglePreloader(true);
  }, [searchWord])

  function handleSearchWord(word) {
    setSearchWord(word);
  }

  const activateSearch = async () => {
    getMoviesFiltered(searchWord);
  }

  function getMoviesFiltered(word) {
    const parsedMovies = JSON.parse(localStorage.getItem('ReceivedMovies'));
    if (isCheckboxOn) {
      const filtered = parsedMovies.filter((films) =>
        films.nameRU.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredResults(filtered);
      togglePreloader(false)
    } else {
      const filtered = parsedMovies.filter((films) => 
        films.nameRU.toLowerCase().includes(word.toLowerCase()) && films.duration >= 40 
      );
      setFilteredResults(filtered);
      togglePreloader(false)
    }
    /* togglePreloader(false) */
  }

  /* function getMovies() {
    MoviesApi.getMovies().then((res) => {
      localStorage.setItem('ReceivedMovies', JSON.stringify(res));
    });
  } */

  function isSearchWordEntered() {
    setSearchWordState(true);
  }

  useEffect(() => {
      const token = localStorage.getItem('token');
      if(token) {
      MainApi.validity(token).then((res) => {
        if (res) {
          fetchMovies();
          setUserData(res)
          setLoggedIn(true);
          history.goBack();
        } else {
          localStorage.removeItem('token');
        };
      });
    };   
  }, [loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
    MainApi.getMyProfileInfo(token)
    .then(info => {
      setCurrentUser(info)
    })
    .catch((err) => {
    console.log(err);
  })}

  },[loggedIn]);

  function handleUpdateUser(info) {
    const token = localStorage.getItem('token');
    MainApi.updateUserInfo(info, token)
    .then((res)=>{setCurrentUser(res)},
    )
    .catch((err) => {
    console.log(err);
  })
  }

  function handleLogin() {
    setLoggedIn(true)
  }

  function onBurgerClick() {
    setNavBar(true)
  }

  function onClose() {
    setNavBar(false)
  }

  function checkboxToggle() {
    setCheckbox(prevState => !prevState);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <React.StrictMode>
    <div className="page">
      <div className="root">
        <Header loggedIn={loggedIn} onBurgerClick={onBurgerClick}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/movies">
            <ProtectedRoute
              preloaderActive={preloaderActive}
              checkboxClicked={checkboxToggle} 
              isCheckboxOn={isCheckboxOn} 
              component={Movies}
              isLoggedIn={loggedIn}
              movies={filteredResults}
              searchWord={searchWord}
              searchWordState={searchWordState}
              isSearchWordEntered={isSearchWordEntered}
              setSearchWord={handleSearchWord}
            />
          </Route>
          <Route path="/saved-movies">
            <ProtectedRoute 
              checkboxClicked={checkboxToggle} 
              isCheckboxOn={isCheckboxOn} 
              component={SavedMovies}
              isLoggedIn={loggedIn}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              onUpdateUser={handleUpdateUser} 
              setLoggedIn={setLoggedIn}
              component={Profile}
              isLoggedIn={loggedIn}
            />
          </Route>
          <Route component={NotFound}/>
        </Switch>
        <Navigation isOpen={isNavBarOpen} onClose={onClose}/>
        <Footer/>
      </div>
    </div>
    </React.StrictMode>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);