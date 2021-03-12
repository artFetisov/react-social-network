import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { createField } from '../FormsControls/FormsControls';
import { requiredField } from '../../utils/validators';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/authReducer'
import { Redirect } from 'react-router-dom';
import style from '../FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/reduxStore';

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()
    const onSubmitData = (dataForm: LoginFormValuesType) => {
        dispatch(login(dataForm.email, dataForm.password, dataForm.rememberMe, dataForm.captcha))
    }
    if (isAuth) {
        return <Redirect to='/Profile' />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmitData} captchaUrl={captchaUrl} />
        </div>
    )

}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({ handleSubmit, error, captchaUrl }) => {
        return (
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>('text', 'email', 'Login', [requiredField], 'input', null)}
                {createField<LoginFormValuesTypeKeys>('password', 'password', 'Password', [requiredField], 'input', null)}
                {createField<LoginFormValuesTypeKeys>('checkbox', 'rememberMe', '', null, 'input', 'remember Me')}
                {captchaUrl && <img src={captchaUrl} alt='captcha'></img>}
                {captchaUrl && createField<LoginFormValuesTypeKeys>('text', 'captcha', '', [requiredField], 'input', null)}
                {error && <div className={style.errorSummaryForm}>
                    {error}
                </div>}
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm);

type LoginFormOwnProps = {
    captchaUrl: string | null
}
type LoginFormValuesType = {
    rememberMe: boolean
    email: string
    password: string
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>
