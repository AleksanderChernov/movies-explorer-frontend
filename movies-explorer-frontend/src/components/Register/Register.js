import React from 'react';
import {  useHistory, withRouter } from "react-router-dom";
import AuthForm from '../AuthForm/AuthForm.js';
import MainApi from '../../utils/MainApi.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import Preloader from '../Movies/Preloader/Preloader'
import './Register.css';

function Register(props) {

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
    MainApi.register(registerInfo)
    .then((res)=>{
      if(res) {
        props.togglePreloader(false)
        setMessage('Успех!');
        setSuccess(true)
        makePopupVisible(true)
        MainApi.login(registerInfo)
        .then((res)=>{
          props.handleLogin();
          localStorage.setItem('token', res.token);
          setTimeout(()=> {
          history.push('/movies');
          makePopupVisible(false)
        }, 6000)
        })
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
    <AuthForm 
      title={'Добро пожаловать!'} 
      button={'Зарегистрироваться'}
      onSubmit={handleSubmit} 
      handleChange={handleChange}>
      <InfoTooltip message={message} isOpen={isInfoTooltipOpen} isSuccessful={success}/>
      <Preloader preloaderActive={props.preloaderActive}/>
    </AuthForm>
  )
}

export default withRouter(Register);