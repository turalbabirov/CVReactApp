import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   data: [],
   activeData: {
      id: null
   },
   cvdata: null
};

const cvSlice = createSlice({
   name: "cv",
   initialState,
   reducers: {
      addCV: (state, { payload }) => {
         state.data.push(payload);
         state.activeData.id = payload.id;
      },
      changeCVStatus: (state, { payload }) => {
         state.activeData.id = payload;
      },
      updateCvData: (state) => {
         if (state.activeData.id) {
            state.cvdata = state.data.find((cv) => cv.id === state.activeData.id) || null;
         } else {
            state.cvdata = null;
         }
      },
      deleteCv: (state, { payload }) => {
         state.data = state.data.filter((cv) => cv.id !== payload);
         if (state.activeData.id === payload) {
            state.activeData.id = null;
            state.cvdata = null;
         }
      }
   }
});

export const reducersSync = { ...cvSlice.actions };
export default cvSlice.reducer;
