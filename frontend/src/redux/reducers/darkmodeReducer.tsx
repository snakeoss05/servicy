const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

export const darkMode = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));

      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};
