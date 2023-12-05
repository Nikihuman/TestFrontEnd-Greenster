import { AuthLeftSideProps } from './AuthLeftSide.props';
import cn from 'classnames';
import styles from './AuthLeftSide.module.scss';

export function AuthLeftSide ({className, ...props}: AuthLeftSideProps){
	return (
		<div className={cn(className, styles['left-side-wrapper'])} {...props}>
			<div className={cn(styles['heading'])}>
				<h1><span>TUTOR</span> - платформа для онлайн-обучения иностранным языкам</h1>
			</div>
			<div className={cn(styles['description'], styles['description-one'])}>Занимайтесь онлайн в удобное время суток из любого места</div>
			<div className={cn(styles['description'], styles['description-two'])}>Выбирайте опытных преподавателей со всего мира</div>
			<img src="../../Picture.svg" alt="Picture with learning person" />
		</div>
	);
}