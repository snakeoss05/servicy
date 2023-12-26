/* eslint-disable @typescript-eslint/no-explicit-any */

export const login = (userData: any) => {
  return {
    type: "LOGIN",
    payload: userData,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export const updateUser = (userData: any) => {
  return {
    type: "UPDATE_USER" as const,
    payload: userData,
  };
};
