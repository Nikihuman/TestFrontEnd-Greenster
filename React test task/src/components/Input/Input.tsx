import { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.scss';
import { forwardRef } from 'react';

export const Input =forwardRef<HTMLInputElement ,InputProps>(function Input({isValid, id, label, className, ...props}, ref):JSX.Element{
	return (
		<div className={cn(styles['input-wrapper'], className)}>
			{label && <label className={cn(styles['input-label'])} htmlFor={id}>{label}</label>}
			<input ref={ref} className={cn(styles['input'], {[styles['inValid']]: !isValid})} id={id} {...props}/>
		</div>
	);
});