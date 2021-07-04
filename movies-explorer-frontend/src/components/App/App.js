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
  const [isFiltering, setIsFiltering] = React.useState(false);
  const [isSavedMoviesRequest, setSavedAdress] = React.useState(false);
  const [isReturning, setIsReturning] = React.useState(false);
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

  const getMoviesFiltered = useCallback(async (word) => {
    /* setIsFiltering(true) */
    setIsReturning(false)
    if (isSavedMoviesRequest === false) {
      if (word.length) {
        localStorage.setItem('setWord', word)
      } else {
        word = localStorage.getItem('setWord');
      }
      const parsedMovies = JSON.parse(localStorage.getItem('ReceivedMovies')) || [];
      if (isCheckboxOn === false) {
        const filtered = parsedMovies.filter((films, i, arr) => {
          const filmRUname = films.nameRU.toLowerCase()
          const searchWord = word.toLowerCase()
          return filmRUname.includes(searchWord)
        });
        setFilteredResults(filtered);
        localStorage.setItem('lastSearched', JSON.stringify(filtered));
        togglePreloader(false)
        setSearchWord('')
    } else {
      const filtered = parsedMovies.filter((films) => 
        films.nameRU.toLowerCase().includes(word.toLowerCase()) && films.duration <= 40 
      );
        localStorage.setItem('setWord', word)
      setFilteredResults(filtered);
      localStorage.setItem('lastSearched', JSON.stringify(filtered));
      togglePreloader(false)
      setSearchWord('')
      }
    } else {
      if (isCheckboxOn === false) {
        const filtered = savedMovies.filter((films) =>
          films.nameRU.toLowerCase().includes(word.toLowerCase())
        );
        localStorage.setItem('setWord', word)
        setFilteredSavedMovies(filtered);
        localStorage.setItem('lastSearchedSaved', JSON.stringify(filtered));
        togglePreloader(false);
        /* setSearchWord('') */
      } else if (isCheckboxOn) {
        const filtered = savedMovies.filter((films) => 
          films.nameRU.toLowerCase().includes(word.toLowerCase()) && films.duration <= 40
        );
        localStorage.setItem('setWord', word)
        setFilteredSavedMovies(filtered);
        /* setSearchWord('') */
        localStorage.setItem('lastSearchedSaved', JSON.stringify(filtered));
        togglePreloader(false);
      }
    }
  }, [isSavedMoviesRequest, isCheckboxOn, searchWord])

  const activateSearch = useCallback(() => {
    getMoviesFiltered(searchWord);
  }, [getMoviesFiltered, searchWord, isSavedMoviesRequest])

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
    .catch((err)=> {console.log(err)})
    .finally(()=>{setPreloader(false)})
  }

  function isSearchWordEntered() {
    setIsFiltering(true);
  }

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

  useEffect(() => {
    try {
      setPreloader(true);
      const lastSearchedSaved = JSON.parse(localStorage.getItem('lastSearchedSaved')) || [];
      const lastSearched = JSON.parse(localStorage.getItem('lastSearched')) || [];
      const lastSearchWord = localStorage.getItem('setWord');
      console.log(lastSearched)
      console.log(lastSearchWord)
      if (lastSearchedSaved.length && lastSearchWord.length && lastSearchWord !== '') {
        /* setIsFiltering(true); */
        console.log('выполняю')
        setIsReturning(true)
        setFilteredSavedMovies(lastSearchedSaved);
        setPreloader(false)
      } else {
        setIsReturning(true)
        setFilteredSavedMovies([])
        console.log('выполняю 2')
        setPreloader(false)
      }
      if (lastSearched.length) {
        setIsReturning(true)
        console.log('выполняю 3')
        setFilteredResults(lastSearched);
        setPreloader(false)
      } else {
        setIsReturning(true)
        console.log('выполняю 4')
        setFilteredResults([])
        setPreloader(false)
      }
    } catch(e) {
      console.log(e)
      setPreloader(false)
    }
  }, [])

  useEffect(() => {
    togglePreloader(false);
  }, [filteredResults])

  useEffect(() => {
    setSavedMoviesId(savedMovies.map(a => a.movieId))
  }, [savedMovies])

  useEffect(() => {
    activateSearch();
    /* togglePreloader(true); */
  }, [activateSearch, searchWord, isSavedMoviesRequest])
  useEffect(() => {
    setIsFiltering(isCheckboxOn)
  }, [isCheckboxOn])

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
          localStorage.clear()
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
              isReturning={isReturning}
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
              movies={filteredResults || []}
              searchWord={searchWord}
              isFiltering={isFiltering}
              isSearchWordEntered={isSearchWordEntered}
              setSearchWord={handleSearchWord}
              handleDelete={handleDelete}
              setCheckbox={setCheckbox}
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
              isFiltering={isFiltering}
              isSearchWordEntered={isSearchWordEntered}
              setSearchWord={handleSearchWord}
              setCheckbox={setCheckbox}
              isReturning={isReturning}
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
