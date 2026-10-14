import { createSlice } from '@reduxjs/toolkit';

const USERS_KEY = 'ems_users';
const SESSION_KEY = 'ems_session';

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: JSON.parse(localStorage.getItem(SESSION_KEY)),
        error: null,
    },

    reducers: {
        register(state, action) {
            const { name, email, password } = action.payload;
            const normalizedEmail = email.trim().toLowerCase();

            const list = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

            const exists = list.some(
                user => user.email === normalizedEmail
            );

            if (exists) {
                state.error = 'An account with this email already exists.';
                return;
            }

            const newAccount = {
                id: Date.now(),
                name: name.trim(),
                email: normalizedEmail,
                password: password,
            };

            const updated = [...list, newAccount];

            localStorage.setItem(USERS_KEY, JSON.stringify(updated));

            const sessionUser = {
                id: newAccount.id,
                name: newAccount.name,
                email: newAccount.email,
            };

            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

            state.user = sessionUser;
            state.error = null;
        },

        login(state, action) {
            const { email, password } = action.payload;
            const normalizedEmail = email.trim().toLowerCase();

            const list = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

            const account = list.find(
                user =>
                    user.email === normalizedEmail &&
                    user.password === password
            );

            if (!account) {
                state.error = 'Invalid email or password.';
                return;
            }

            const sessionUser = {
                id: account.id,
                name: account.name,
                email: account.email,
            };

            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

            state.user = sessionUser;
            state.error = null;
        },

        logout(state) {
            localStorage.removeItem(SESSION_KEY);

            state.user = null;
            state.error = null;
        },
    },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;