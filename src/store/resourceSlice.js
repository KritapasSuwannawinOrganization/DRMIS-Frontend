import { createSlice } from '@reduxjs/toolkit';

const resourceSlice = createSlice({
  name: 'resource',
  initialState: { resourceArr: [] },
  reducers: {
    setResourceArr(state, action) {
      state.resourceArr = action.payload;
    },
  },
});

export const resourceActions = resourceSlice.actions;
export default resourceSlice.reducer;
