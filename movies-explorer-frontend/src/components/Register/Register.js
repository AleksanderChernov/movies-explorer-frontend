import React from 'react';
import {  useHistory, withRouter } from "react-router-dom";
import AuthForm from '../AuthForm/AuthForm.js';
import MainApi from '../../utils/MainApi.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
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
    e.preventDefault()
    MainApi.register(registerInfo)
    .then((res)=>{
      if(res) {
        setMessage('Успех!');
        setSuccess(true)
        makePopupVisible(true)
        setTimeout(()=> {
          history.push('/signin');
          makePopupVisible(false)
        }, 2000)
      } else {
        setMessage('Что-то пошло не так');
        setSuccess(false)
        makePopupVisible(true)
        setTimeout(()=> {
          makePopupVisible(false)
        }, 2000)
      }
    });
  }

  return(
    <AuthForm 
      title={'Добро пожаловать!'} 
      button={'Зарегистрироваться'} 
      onSubmit={handleSubmit} 
      onChange={handleChange}>
      <InfoTooltip message={message} isOpen={isInfoTooltipOpen} isSuccessful={success}/>
    </AuthForm>
  )
}

export default withRouter(Register);