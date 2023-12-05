import { SelectHTMLAttributes } from 'react';


export interface CountrySelectorProps extends SelectHTMLAttributes<HTMLSelectElement>{
	isValid: boolean
}