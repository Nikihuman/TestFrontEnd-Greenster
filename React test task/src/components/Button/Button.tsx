import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.scss';

export function Button ({children, appearance = 'primary', className, ...props}: ButtonProps){
	return (
		<button className={cn(className, styles['button'],
			{
				[styles['primary']]: appearance === 'primary',
				[styles['secondary']]: appearance === 'secondary'
			}
		)} {...props}>{children}</button>
	);
}