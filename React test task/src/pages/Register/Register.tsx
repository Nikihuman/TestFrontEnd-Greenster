import styles from './Register.module.scss';
import { RegisterProps } from './Register.props';
import { Input } from '../../components/Input/Input';
import cn from 'classnames';
import { Form } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { IRegisterForm } from '../../helpers/Interfaces';
import { useEffect, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions, registration } from '../../store/user.slice';
import { RootState } from '../../store/store';
import { CountrySelector } from '../../components/CountrySelector/CountrySelector';
import { UserType } from '../../helpers/UserType.enum';


export function Register ({className, ...props}: RegisterProps) {
	const [countreeInput, setCountreeInput] = useState<boolean>(false);
	const navigate = useNavigate();
	const {register, handleSubmit, clearErrors, reset ,formState: {errors}} = useForm<IRegisterForm>();
	const [errorsMessage, setErrorsMessage] = useState<string[]>([]);
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const registerErrorMessage = useSelector((s:RootState) => s.user.registerErrorMessage);

	useEffect(()=>{
		if(jwt){
			navigate('/');
		}
	},[jwt,navigate]);

	useEffect(()=>{
		reset();
	},[registerErrorMessage, reset]);


	const submit: SubmitHandler<IRegisterForm> = (data) =>{
		dispatch(userActions.clearRegisterError());
		setErrorsMessage((state)=>{
			state = [];
			return state;
		});
		dispatch(registration({
			person: data.person,
			name: data.name,
			surname: data.surname,
			birthday: data.birthday,
			email: data.email,
			countree: data.countree,
			password:data.password,
			repeatPassword: data.repeatPassword,
			privacyPolicyAgree: data.privacyPolicyAgree
		}));
	};

	const error: SubmitErrorHandler<IRegisterForm> = (data) =>{
		dispatch(userActions.clearRegisterError());
		setErrorsMessage((state)=>{
			state = [];
			for(const [, value] of Object.entries(data)){
				if(value.message){
					state.push(value.message);
				}
			}
			return state;
		});
		setTimeout(()=>{
			clearErrors();
		},2000);
	};

	const changeRole = (e: FormEvent<HTMLInputElement>)=> {
		const target: number = Number(e.currentTarget.value);
		if(target == UserType.teacher){
			setCountreeInput(true);
			return;
		}
		setCountreeInput(false);
	};

	return (
		<div className={cn(className, styles['register-form'])} {...props}>
			<h3 className={cn(styles['headling'])}>Регистрация</h3>
			<div className={cn(styles['error-message'])}>
				{errorsMessage.length > 0 && errorsMessage.map((el, id)=><div key={id}>({el})</div>)}
				{registerErrorMessage}
			</div>
			<Form className={cn(styles['form'])} onSubmit={handleSubmit(submit, error)}>
				<div className={cn(styles['radio-wrapper'])}>
					<span>Зарегистрироваться как:</span>
					<div className={cn(styles['input-radio-wrapper'])}>
						<input type='radio' id='student' defaultChecked onClick={changeRole} {...register('person')} value={1}/>
						<label htmlFor="student">Ученик</label>
						<input type='radio' placeholder='Преподаватель' onClick={changeRole} {...register('person')} value={0} id='teacher'/>
						<label htmlFor="teacher">Преподаватель</label>
					</div>
				</div>
				<Input className={cn(styles['input'], styles['name-input'])}
					placeholder='Имя'
					label='Имя' 
					type='text' 
					isValid={!errors.name}
					{...register('name',{
						required: 
						{
							value: true,
							message: '(Введите имя)'
						}
					})}/>
				<Input className={cn(styles['input'], styles['surname-input'])}
					placeholder='Фамилия'
					label='Фамилия'
					type='text'
					isValid={!errors.surname}
					{...register('surname',{
						required: 
						{
							value: true,
							message: '(Введите Фамилию)'
						}
					})}/>
				<Input className={cn(styles['input'], styles['date-input'])}
					placeholder='Дата рождения'
					label='Дата рождения'
					type='date'
					isValid={!errors.birthday}
					{...register('birthday',{
						required: 
						{
							value: true,
							message: '(Введите дату рождения)'
						}
					})}/>
				{countreeInput ? 
					<CountrySelector
						isValid={!errors.countree}
						{...register('countree',{
							required: 
						{
							value: true,
							message: '(Выберете страну)'
						}
						})}/> : <></>}
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
				<Input className={cn(styles['input'], styles['email-input'])}
					placeholder='Пароль'
					label='Придумайте пароль'
					type='password'
					isValid={!errors.password}
					{...register('password',{
						required: 
						{
							value: true,
							message: '(Введите пароль)'
						},
						minLength: {
							value: 8,
							message: '(Пароль должен быть не менее 8 символов)'
						}
					})}/>
				<Input className={cn(styles['input'], styles['email-input'])}
					placeholder='Пароль'
					label='Повторите пароль'
					type='password'
					isValid={!errors.repeatPassword}
					{...register('repeatPassword',{
						required: 
						{
							value: true,
							message: '(Повторите пароль)'
						}
					})}/>
				<div className={cn(styles['rivacy-policy-checkbox-wrapper'])}>
					<input className={cn(styles['rivacy-policy-checkbox'])} type='checkbox' id='checkbox' 
						{...register('privacyPolicyAgree', {required: {value: true, message: '(Прочитайте политику конфиденциальности)'}})}/>
					<label htmlFor="checkbox">Я согласен с <Link to='#'>условиями использования</Link> и <Link to='#'>политикой конфиденциальности</Link></label>
				</div>
				<Button className={cn(styles['button'])} appearance='primary'>Зарегистрироваться</Button>
			</Form>
			<div className={cn(styles['login-link'])}>
				<span>У вас уже есть аккаунт?</span>
				<Link to='/auth/login' className={cn(styles['register-link'])}>Войти</Link>
			</div>	
		</div>
	);
}