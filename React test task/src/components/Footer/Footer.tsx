import { FooterProps } from './Footer.props';
import cn from 'classnames';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export function Footer ({className, ...props}: FooterProps){
	return (
		<footer className={cn(className ,styles['footer'])} {...props}>
			<div className={cn(styles['wrapper'])}>
				<img className={cn(styles['logo'])} src='../../LogoSecondary.svg' alt="Logo"/>
				<div className={cn(styles['company-Ul'])}>
					О компании
					<ul> 
						<li><Link to='#'>О нас</Link></li>
						<li><Link to='#'>Найти репетитора</Link></li>
						<li><Link to='#'>Стать преподавателем</Link></li>
						<li><Link to='#'>Задать вопрос</Link></li>
					</ul>
				</div>
				<div className={cn(styles['teachers-Ul'])}>
					Преподаватели
					<div className={cn(styles['teachers-Ul-wrapper'])}>
						<ul>
							<li><Link to='#'>Английского</Link></li>
							<li><Link to='#'>Испанского</Link></li>
							<li><Link to='#'>Немецкого</Link></li>
							<li><Link to='#'>Китайского</Link></li>
							<li><Link to='#'>Русского</Link></li>
						</ul>
						<ul>
							<li><Link to='#'>Португальского</Link></li>
							<li><Link to='#'>Иврита</Link></li>
							<li><Link to='#'>Японского</Link></li>
							<li><Link to='#'>Греческого</Link></li>
							<li><Link to='#'>Арабского</Link></li>
						</ul>
					</div>
				</div>
				<div className={cn(styles['contact-Ul'])}>
					Связаться с нами
					<ul>
						<li><Link to='#'>asktutor24@gmail.com</Link></li>
					</ul>
				</div>
			</div>
			<div className={cn(styles['privacy-policy'])}>
				<div className={cn(styles['no-image'])}></div>
				<Link to='#'>Условия использования</Link>
				<Link className={cn(styles['link-privacy-policy'])}to='#'>Политика конфиденциальности</Link>
				<Link to='#'>© 2021-2022 All rights reserved</Link>
			</div>
		</footer>
	);
}