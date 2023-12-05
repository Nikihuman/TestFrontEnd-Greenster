import cn from 'classnames';
import styles from './ErrorPage.module.scss';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

export function ErrorPage () {
	const navigate = useNavigate();

	const home = () => {
		navigate('/');
	};

	return (
		<div className={cn(styles['error-page'])}>
			<div className={cn(styles['error'])}>Error</div>
			<div><Button appearance='primary' onClick={home}>HOME</Button></div>
		</div>
	);
}