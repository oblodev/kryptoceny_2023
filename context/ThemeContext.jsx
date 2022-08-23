import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return { ...state, page: action.payload };
    case "CHANGE_SHOW":
      return { ...state, show: action.payload };
    case "SET_FETCH":
      return { ...state, isFetched: action.payload };
    default:
      return state;
  }
};

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    page: 1,
    show: false,
    isFetched: false,
  });

  const changePage = (page) => {
    dispatch({ type: "CHANGE_PAGE", payload: page });
  };

  const changeShow = (show) => {
    dispatch({ type: "CHANGE_SHOW", payload: show });
  };

  const changeFetch = (isFetched) => {
    dispatch({ type: "SET_FETCH", payload: isFetched });
  };

  return (
    <ThemeContext.Provider
      value={{ ...state, changePage, changeShow, changeFetch }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
