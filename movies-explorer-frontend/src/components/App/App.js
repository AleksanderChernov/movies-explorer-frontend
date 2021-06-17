import './App.css';
import React from "react";
import { Route, Switch, withRouter} from 'react-router-dom';
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

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isNavBarOpen, setNavBar] = React.useState(false);
  const [isCheckboxOn, setCheckbox] = React.useState(true);

  /* function handleLogin() {
    setLoggedIn(true)
  } */

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
    <React.StrictMode>
    <div className="page">
      <div className="root">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} onBurgerClick={onBurgerClick}/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/movies">
            <Movies checkboxClicked={checkboxToggle} isCheckboxOn={isCheckboxOn}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies checkboxClicked={checkboxToggle} isCheckboxOn={isCheckboxOn}/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route component={NotFound}/>
        </Switch>
        <Navigation isOpen={isNavBarOpen} onClose={onClose}/>
        <Footer/>
      </div>
    </div>
    </React.StrictMode>
  );
}

export default withRouter(App);