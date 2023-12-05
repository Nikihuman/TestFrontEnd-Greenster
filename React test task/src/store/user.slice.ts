import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRequest as IResponse } from './Interfaces';
import axios, { AxiosError } from 'axios';
import { URL } from '../helpers/API';
import { ILoginForm, IRegisterForm } from '../helpers/Interfaces';


export interface IUserState {
	jwt: string | null;
	refreshJwt: string | null;
	loginErrorMessage?: string, 
	registerErrorMessage?: string,
}

const initialState: IUserState = {
	jwt: null,
	refreshJwt: null
};

export const login = createAsyncThunk('user/login', 
	async (params: ILoginForm) => {
		try{
			const { data } = await axios.post<IResponse>(`${URL}/auth/signin`,{
				email: params.email,
				password: params.password,
				device:'postman'
			});
			return data;
		}catch(e){
			if(e instanceof AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const registration = createAsyncThunk('user/register', 
	async (params: IRegisterForm) => {
		try{
			const { data } = await axios.post<IResponse>(`${URL}/auth/signup/base`,{
				first_name: params.name,
				last_name: params.surname,
				email: params.email,
				password: params.password,
				device:'postman',
				user_type:Number(params.person),
				country:Number(params.countree),
				date_of_birthday:params.birthday.toString()
			});
			return data;
		}catch(e){
			if(e instanceof AxiosError){
				throw new Error(e.response?.data.message);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
			state.refreshJwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action)=>{
			if(!action.payload){
				return;
			}
			state.jwt = action.payload.access_token;
			state.refreshJwt = action.payload.refresh_token;
		});
		builder.addCase(login.rejected, (state, action)=>{
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(registration.fulfilled, (state, action)=>{
			if(!action.payload){
				return;
			}
			state.jwt = action.payload.access_token;
			state.refreshJwt = action.payload.refresh_token;
		});
		builder.addCase(registration.rejected, (state, action)=>{
			state.registerErrorMessage = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;