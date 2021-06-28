import AuthForm from '../AuthForm/AuthForm.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import Preloader from '../Movies/Preloader/Preloader'
import React from 'react';
import {  useHistory, withRouter } from "react-router-dom";
import MainApi from '../../utils/MainApi.js';

function Login(props) {

  const history = useHistory();
  const [registerInfo, setRegisterInfo] = React.useState({});
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltip] = React.useState(false);

  function makePopupVisible(state) {
    setInfoTooltip(state)
  }

  function handleChange(e) {
    setRegisterInfo({...registerInfo, [e.target.name]: e.target.value});
  }

  function handleSubmit(e){
    props.togglePreloader(true)
    e.preventDefault()
    MainApi.login(registerInfo)
    .then((res)=>{
      if(res) {
        props.togglePreloader(false)
        setMessage('Успех!');
        setSuccess(true)
        makePopupVisible(true)
        props.handleLogin();
        localStorage.setItem('token', res.token);
        setTimeout(()=> {
          history.push('/movies');
          makePopupVisible(false)
        }, 6000)
      } else {
        props.togglePreloader(false)
        setMessage('Что-то пошло не так');
        setSuccess(false)
        makePopupVisible(true)
        setTimeout(()=> {
          makePopupVisible(false)
        }, 4000)
      }
    });
  }


  return(
    <AuthForm title={'Рады видеть!'} button={'Войти'} onSubmit={handleSubmit} handleChange={handleChange}>
      <InfoTooltip message={message} isOpen={isInfoTooltipOpen} isSuccessful={success}/>
      <Preloader preloaderActive={props.preloaderActive}/>
    </AuthForm>
  )
}


export default withRouter(Login);