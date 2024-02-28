import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

// Create a Redux slice for managing user-related state
const userSlice = createSlice({
  name: "user",                   // Specify the slice name
  initialState: userInitialState, // Set the initial state
  reducers: {                     
                                  // Action to set user information in the state
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {    // Action to reset user information in the state
      state.userInfo = null;
    },
  },
});

// Extract the actions and reducer from the user slice
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };