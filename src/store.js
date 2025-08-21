import { configureStore } from "@reduxjs/toolkit";
import applicationsReducer from "./features/applicationsSlice.js";

// Persist to localStorage
const LS_KEY = "job-tracker-state";

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store.getState()));
  } catch {}
});

export default store;
