import { createStore, createHook, defaults } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

// This is required in one file to make the chrome devtools for visible.
defaults.devtools = true;

const store = createStore({
  name: `useAuthStore`,
  initialState,
  actions,
});

export const useAuthStore = createHook(store, {
  selector: (state) => state,
});
