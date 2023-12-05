import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MainPage.module.scss';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { userActions } from '../../store/user.slice';

interface IPayload {
	aud: string;
	exp: number;
	iss: string;
	register_state: string;
	session_id: string;
	sub: string;
	typed_id: number;
	user_type: string
}

export function MainPage () {
	const {jwt, refreshJwt} = useSelector((s: RootState)=>s.user);
	const [payload, setPayload] = useState<IPayload | undefined>();
	const dispatch = useDispatch<AppDispatch>();

	const splitJwt = (jwt: string | null):RegExpMatchArray | null => {
		if(jwt){
			return jwt.match(/.{1,40}/g);
		}
		return null;
	};

	const getData = (token: string | null): IPayload | undefined =>{
		if(token){
			const [, encodedPayload] = token.split('.');
			const payload: IPayload = JSON.parse(atob(encodedPayload));
			return payload;
		}
	};

	useEffect(()=>{
		if(jwt){
			setPayload(() => {
				return getData(jwt);
			});
		}
	},[jwt]);
	
	return (
		<div className={cn(styles['body'])}>
			<div className={cn(styles['wrapper'])}>
				<div className={cn(styles['jwt'])}>
					(JWT Token)
					{jwt && splitJwt(jwt)?.map((el, id)=><div key={id}>{el}</div>)}
				</div>
				<div className={cn(styles['refresh-jwt'])}>
					(Refresh JWT Token)
					{refreshJwt && splitJwt(refreshJwt)?.map((el, id)=><div key={id}>{el}</div>)}
				</div>
				<div className={cn(styles['jwt-date'])}>
					<span>Время окончания действия JWT Token: </span>
					{payload ? new Date(payload?.exp * 1000 ?? 0).toString() : 'Ошибка'}
				</div>
				<Button appearance='secondary' onClick={()=>{dispatch(userActions.logout());}}>Выход</Button>
			</div>
		</div>
	);
}