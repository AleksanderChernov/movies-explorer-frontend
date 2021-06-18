import AuthForm from '../AuthForm/AuthForm.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';

export default function Login() {
  return(
    <AuthForm title={'Рады видеть!'} button={'Войти'}>
      <InfoTooltip message={"Добро пожаловать снова"} isOpen={false} isSuccessful={true}/>
    </AuthForm>
  )
}