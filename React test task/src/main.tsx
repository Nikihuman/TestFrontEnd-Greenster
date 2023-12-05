import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout/AuthLayout';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { RequireAuth } from './helpers/Require.auth';
import { Provider } from 'react-redux';
import { store } from './store/store';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><MainPage/></RequireAuth>
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage/>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</React.StrictMode>
);
