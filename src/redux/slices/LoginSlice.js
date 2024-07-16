import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userData',
    initialState: false,
    reducers: {
        setValue: (state, action) => {
            return action.payload;
        }
    }

})

export const { setValue } = userSlice.actions;

export default userSlice.reducer;