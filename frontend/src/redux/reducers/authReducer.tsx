/* eslint-disable @typescript-eslint/no-explicit-any */

interface UserData {
  user: object;
  token: string;
}
import Cookies from "js-cookie";
const initialState = {
  isAuthenticated: false,
  user: JSON.parse(localStorage.getItem("user") || "{}") as UserData,
};

const authReducer = (
  state = initialState,
  action: { type: any; payload: { token: string; user: any } }
) => {
  switch (action.type) {
    case "LOGIN":
      // eslint-disable-next-line no-case-declarations, react-hooks/rules-of-hooks

      Cookies.set("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      Cookies.remove("token");
      localStorage.removeItem("user");

      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case "UPDATE_USER":
      // Update the user data in the Redux store
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      const token = Cookies.get("token");

      return {
        ...state,
        isAuthenticated: Boolean(token),
      };
  }
};

export default authReducer;
