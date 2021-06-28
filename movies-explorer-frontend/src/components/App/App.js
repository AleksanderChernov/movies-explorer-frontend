import './App.css';
import React, { useEffect, useCallback } from "react";
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
  const [isCheckboxOn, setCheckbox] = React.useState(false);
  const [preloaderActive, setPreloader] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [searchWord, setSearchWord] = React.useState('');
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [searchWordState, setSearchWordState] = React.useState(false);
  const [isSavedMoviesRequest, setSavedAdress] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  const [savedMoviesId, setSavedMoviesId] = React.useState([]);

  const fetchMovies = async () => {
    const res = await MoviesApi.getMovies();
    localStorage.setItem('ReceivedMovies', JSON.stringify(res));
  }

  function togglePreloader(state) {
    setPreloader(state)
  }

  function savedMoviesPath(state) {
    setSavedAdress(state)
  }

  useEffect(() => {
    togglePreloader(false);
  }, [filteredResults])

  function handleSearchWord(word) {
    setSearchWord(word);
  }

  function searchForSaved() {
    setPreloader(true)
    const token = localStorage.getItem('token');
      MainApi.getSavedMovies(token)
        .then((res)=> {
          if (res.ok) {
            return res.json()
          } else if (res.status === 404) {
            return []
          }
        }).then((res) => {
        setPreloader(false)
        setSavedMovies(res) 
        setFilteredSavedMovies(res)
      })
  }

  useEffect(()=>{
    setSavedMoviesId(savedMovies.map(a => a.movieId))
  }, [savedMovies])

  const getMoviesFiltered = useCallback(async(word) => {
    if (isSavedMoviesRequest === false) {
      const parsedMovies = JSON.parse(localStorage.getItem('ReceivedMovies'));
      if (isCheckboxOn) {
      const filtered = parsedMovies.filter((films) =>
        films.nameRU.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      const filtered = parsedMovies.filter((films) => 
        films.nameRU.toLowerCase().includes(word.toLowerCase()) && films.duration >= 40 
      );
      setFilteredResults(filtered);
      }
    } else {
      if (isCheckboxOn) {
        const filtered = savedMovies.filter((films) =>
        films.nameRU.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredSavedMovies(filtered);
      setSavedAdress(false)
      } else {
        const filtered = savedMovies.filter((films) => 
        films.nameRU.toLowerCase().includes(word.toLowerCase()) && films.duration >= 40 
      );
      setFilteredSavedMovies(filtered);
      setSavedAdress(false)
      }
    }
  }, [isSavedMoviesRequest, isCheckboxOn, searchWord])

  const activateSearch = useCallback(() => {
    getMoviesFiltered(searchWord);
  }, [getMoviesFiltered, searchWord, isSavedMoviesRequest])

  useEffect(() => {
    activateSearch();
    togglePreloader(true);
  }, [activateSearch, searchWord, isSavedMoviesRequest])

  function handleDeleteWithoutHex(movie) {
    setPreloader(true)
    const token = localStorage.getItem('token');
    const id = movie.id
    const _id = savedMovies.find(element => element.movieId === id)._id
    MainApi.deleteFilm(_id, token)
    .then(()=>{
      searchForSaved();
      setSavedMoviesId(savedMoviesId.filter(element => element === _id))
      setPreloader(false)
    })
  }

  function handleDelete(movie) {
    setPreloader(true)
    const token = localStorage.getItem('token');
    MainApi.deleteFilm(movie._id, token)
    .then((res) => {
      searchForSaved();
      setPreloader(false)
      if (res.code === 429) {
        setError(true)
      }
    })
    .catch((err)=>{console.log(err)},/*  setError(true) */)
    .finally(()=>{setPreloader(false)})
  }

  function handleSave(movie) {
    setPreloader(true)
    const token = localStorage.getItem('token');
    MainApi.saveCard(movie, token)
    .then((res) => {
      searchForSaved()
      if (res.code === 429) {
        setError(true)
      }
    })
    .catch((err)=> {console.log(err)},/*   */)
    .finally(()=>{setPreloader(false)})
  }

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
          history.push('/movies')
        } else {
          localStorage.removeItem('token');
        };
      });
    };   
  }, [history, loggedIn])

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

  },[history, loggedIn]);

  function handleUpdateUser(info) {
    setPreloader(true)
    const token = localStorage.getItem('token');
    MainApi.updateUserInfo(info, token)
    .then((res)=>{
      setCurrentUser(res) 
      setPreloader(false)
    })
    .catch((err) => {
      console.log(err);
      setPreloader(false)
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
    <CurrentUserContext.Provider value={currentUser} data={userData}>
    <React.StrictMode>
    <div className="page">
      <div className="root">
        <Header loggedIn={loggedIn} onBurgerClick={onBurgerClick}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login 
              handleLogin={handleLogin} 
              preloaderActive={preloaderActive}
              togglePreloader={togglePreloader}
            />
          </Route>
          <Route path="/signup">
            <Register 
              handleLogin={handleLogin} 
              togglePreloader={togglePreloader} 
              preloaderActive={preloaderActive}
            />
          </Route>
          <Route path="/movies">
            <ProtectedRoute
              error={error}
              handleDeleteWithoutHex={handleDeleteWithoutHex}
              handleSave={handleSave}
              savedMoviesId={savedMoviesId}
              savedMoviesPath={savedMoviesPath}
              preloaderActive={preloaderActive}
              searchForSaved={searchForSaved}
              checkboxClicked={checkboxToggle} 
              isCheckboxOn={isCheckboxOn} 
              component={Movies}
              isLoggedIn={loggedIn}
              movies={filteredResults}
              searchWord={searchWord}
              searchWordState={searchWordState}
              isSearchWordEntered={isSearchWordEntered}
              setSearchWord={handleSearchWord}
              handleDelete={handleDelete}
            />
          </Route>
          <Route path="/saved-movies">
            <ProtectedRoute
              error={error}
              savedMoviesId={savedMoviesId}
              savedMoviesPath={savedMoviesPath}
              searchForSaved={searchForSaved}
              handleDelete={handleDelete} 
              preloaderActive={preloaderActive}
              checkboxClicked={checkboxToggle} 
              isCheckboxOn={isCheckboxOn} 
              component={SavedMovies}
              isLoggedIn={loggedIn}
              filteredSavedMovies={filteredSavedMovies}
              savedMovies={savedMovies}
              searchWord={searchWord}
              searchWordState={searchWordState}
              isSearchWordEntered={isSearchWordEntered}
              setSearchWord={handleSearchWord}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute
              preloaderActive={preloaderActive}
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