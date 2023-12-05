import { FormHTMLAttributes, ReactNode} from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
	children: ReactNode;
}