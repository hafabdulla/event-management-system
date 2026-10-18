import { createSlice } from "@reduxjs/toolkit";

const REG_KEY = 'ems_registrations';

const registrationsSlice = createSlice({
    name: 'registrations',

    initialState:{
        items:JSON.parse(localStorage.getItem(REG_KEY)) || [],
    },

    reducers: {
        registerForEvent(state, action){
            const {userId, event, date} = action.payload;
            const exists = state.items.some(
                r => r.userId === userId && r.eventId === event.id
            )
            if (exists){
                return;
            }

            const entry = {
                userId, 
                eventId: event.id,
                registeredAt: new Date().toISOString(),
                date,
                event,
            }

            state.items.push(entry);

            localStorage.setItem(REG_KEY, JSON.stringify(state.items));
        },

        cancelRegistration(state, action){
                       const { userId, eventId } = action.payload;

            state.items = state.items.filter(
                r => !(r.userId === userId && r.eventId === eventId)
            );

            localStorage.setItem(REG_KEY, JSON.stringify(state.items));
        },
    },
});

export const {registerForEvent, cancelRegistration} = registrationsSlice.actions
export default registrationsSlice.reducer;