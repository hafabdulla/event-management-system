import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registrationsReducer from './registrationsSlice'
export const store = configureStore(
	{
		reducer: {
			auth: authReducer,
			registrations: registrationsReducer,
		},
	}
);