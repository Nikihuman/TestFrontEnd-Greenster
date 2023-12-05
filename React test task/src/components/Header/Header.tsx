import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../Button/Button';

export function Header ({className, ...props}: HeaderProps){
	return (
		<header className={cn(className, styles['header'])} {...props}>
			<img className={cn(styles['logo'])} src='../../LogoPrimary.svg' alt="Logo"/>
			<div className={cn(styles['links-wrapper'])}>
				<Link to = '#'>Найти преподавателя</Link>
				<Link to = '#'>Стать преподавателем</Link>
			</div>
			<div className={cn(styles['auth-wrapper'])}>
				<select name="Language">
					<option>RU</option>
				</select>
				<NavLink to='/auth/login'><Button appearance='secondary'>Вход</Button></NavLink>
				<NavLink to='/auth/register'><Button appearance='primary'>Зарегистрироваться</Button></NavLink>
			</div>
		</header>
	);
}