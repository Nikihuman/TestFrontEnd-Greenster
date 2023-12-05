import styles from './Login.module.scss';
import { LoginProps } from './Login.props';
import { Input } from '../../components/Input/Input';
import cn from 'classnames';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginForm } from '../../helpers/Interfaces';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';


export function Login ({className, ...props}: LoginProps) {
	const navigate = useNavigate();
	const {register, handleSubmit, clearErrors, reset ,formState: {errors}} = useForm<ILoginForm>();
	const [errorsMessage, setErrorsMessage] = useState({email: '', password: ''});
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const loginErrorMessage = useSelector((s:RootState) => s.user.loginErrorMessage);

	useEffect(()=>{
		if(jwt){
			navigate('/');
		}
	},[jwt,navigate]);

	useEffect(()=>{
		reset();
	},[loginErrorMessage, reset]);


	const submit: SubmitHandler<ILoginForm> = (data) =>{
		dispatch(userActions.clearLoginError());
		setErrorsMessage({email: '', password: ''});
		dispatch(login({email:data.email, password:data.password}));
	};

	const error: SubmitErrorHandler<ILoginForm> = (data) =>{
		setErrorsMessage((state)=>{
			state.email = data.email?.message ?? '';
			state.password = data.password?.message ?? '';
			return state;
		});
		setTimeout(()=>{
			clearErrors();
		},2000);
	};

	return (
		<div className={cn(className, styles['login-form'])} {...props}>
			<h3 className={cn(styles['headling'])}>Вход</h3>
			<div className={cn(styles['error-message'])}>
				{(errorsMessage.email || errorsMessage.password || loginErrorMessage) ? <div>Неверно введены данные:</div> : <></>}
				{errorsMessage.email && <div>{errorsMessage.email}</div>}
				{errorsMessage.password && <div>{errorsMessage.password}</div>}
				{loginErrorMessage}
			</div>
			<Form className={cn(styles['form'])} onSubmit={handleSubmit(submit, error)}>
				<Input className={cn(styles['input'], styles['email-input'])}
					placeholder='Электронная почта'
					label='Электронная почта' 
					type='email'
					isValid={!errors.email}
					{...register('email',{
						required: 
						{
							value: true,
							message: '(Введите email)'
						}
					})}/>				
				<Input className={cn(styles['input'], styles['password-input'])}
					placeholder='Пароль'
					label='Пароль'
					type='password'
					isValid={!errors.password}
					{...register('password',{
						required: 
						{
							value: true,
							message: '(Вы не ввели пароль)'
						},
						minLength: {
							value: 8,
							message: '(Парольдолжен быть не менее 8 симфолов)'
						}
					})}/>
				<div className={cn(styles['forgot-your-password'])}>
					<Link to='#'>Забыли пароль?</Link>
				</div>
				<Button className={cn(styles['button'])} appearance='primary' >Войти</Button>
			</Form>
			<div >У вас ещё нет аккаунта?<Link to='/auth/register' className={cn(styles['register-link'])}>Зарегистрироваться</Link></div>
			<div className={cn(styles['social-media-wrapper'])}>
				<span>или</span>
				<span>Войдите с помощью</span>
				<div className={cn(styles['social-media'])}>
					<Link to='#'><img src="../../social-facebook.svg" alt="Facebook Icon"/></Link>
					<Link to='#'><img src="../../social-twitter.svg" alt="Twitter Icon"/></Link>
					<Link to='#'><img src="../../social-google.svg" alt="Google Icon"/></Link>
				</div>
			</div >
		</div>
	);
}