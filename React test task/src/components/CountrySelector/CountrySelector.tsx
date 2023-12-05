import cn from 'classnames';
import styles from './CountrySelector.module.scss';
import { countries } from './countries';
import { CountrySelectorProps } from './CountrySelector.props';
import { forwardRef } from 'react';

export const CountrySelector = forwardRef<HTMLSelectElement,CountrySelectorProps>(function CountrySelector ({className, isValid , ...props}, ref){
	return (
		<div className={cn(styles['input-wrapper'], className)}> 
			<label className={cn(styles['input-label'])} htmlFor="countreeSelect">Откуда вы?</label>
			<select ref={ref} className={cn(styles['input'], {[styles['inValide']]: !isValid})} name="countreeSelect" id="countreeSelect" {...props}>
				{countries.map((countree, index)=>{
					return(
						<option value={index} key={index}>{countree}</option>
					);
				})}
			</select>
		</div>
	);
});