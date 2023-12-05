import { FormProps } from './Form.props';
import cn from 'classnames';
import styles from './Form.module.scss';


export function Form ({children ,className, ...props}: FormProps){
	return (
		<form className={cn(className, styles['form'])} {...props}>
			{children}
		</form>
	);
}