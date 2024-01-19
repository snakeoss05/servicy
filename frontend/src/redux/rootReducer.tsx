import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import { darkMode } from "./reducers/darkmodeReducer";
import socketReducer from "./reducers/socketReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  darkMode: darkMode,
  socket: socketReducer,
});

export default rootReducer;
