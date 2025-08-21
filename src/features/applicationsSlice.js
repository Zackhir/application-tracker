import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  list: [],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: {
      prepare(payload) {
        return {
          payload: {
            id: nanoid(),
            company: "",
            title: "",
            status: "Applied",
            appliedDate: new Date().toISOString().slice(0, 10),
            notes: "",
            ...payload,
          },
        };
      },
      reducer(state, action) {
        state.list.unshift(action.payload);
      },
    },
    updateApplication(state, action) {
      const idx = state.list.findIndex((a) => a.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteApplication(state, action) {
      state.list = state.list.filter((a) => a.id !== action.payload);
    },
    importMany(state, action) {
      // expects array of normalized jobs
      const withIds = action.payload.map((j) => ({ id: nanoid(), ...j }));
      state.list = [...withIds, ...state.list];
    },
  },
});

export const {
  addApplication,
  updateApplication,
  deleteApplication,
  importMany,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
