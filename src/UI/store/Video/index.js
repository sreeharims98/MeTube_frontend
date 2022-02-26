import { createStore, createHook, defaults } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

// This is required in one file to make the chrome devtools for visible.
defaults.devtools = true;

const store = createStore({
  name: `useVideoStore`,
  initialState,
  actions,
});

export const useVideoStore = createHook(store, {
  selector: (state) => state,
});
