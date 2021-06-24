import AuthForm from '../AuthForm/AuthForm.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
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
    e.preventDefault()
    MainApi.login(registerInfo)
    .then((res)=>{
      if(res) {
        setMessage('Успех!');
        setSuccess(true)
        makePopupVisible(true)
        props.handleLogin();
        setTimeout(()=> {
          history.push('/movies');
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
    <AuthForm title={'Рады видеть!'} button={'Войти'}
    onSubmit={handleSubmit} 
    onChange={handleChange}>
      <InfoTooltip message={message} isOpen={isInfoTooltipOpen} isSuccessful={success}/>
    </AuthForm>
  )
}


export default withRouter(Login);