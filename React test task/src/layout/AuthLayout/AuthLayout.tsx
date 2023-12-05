import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './AuthLayout.module.scss';
import cn from 'classnames';
import { Footer } from '../../components/Footer/Footer';
import { AuthLeftSide } from '../../components/AuthLeftSide/AuthLeftSide';

export function AuthLayout () {
	return (
		<div className={cn(styles['authLayout-wrapper'])}>
			<Header className={cn(styles['header'])}/>
			<div className={cn(styles['center-wrapper'])}>
				<AuthLeftSide className={cn(styles['auth-left-side'])}/>
				<div className={cn(styles['outlet-wrapper'])}>
					<Outlet />
				</div>
			</div>
			<Footer className={cn(styles['footer'])}/>
		</div>
	);
}