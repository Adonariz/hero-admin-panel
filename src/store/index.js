// import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import heroes from "../reducers/heroes";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";
// import ReduxThunk from "redux-thunk";

// позволяет передавать в dispatch строку с нужным type вместо функции action
const stringMiddlware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }

  return next(action);
};

// const enhancer =
//   (createStore) =>
//   (...args) => {
//     const store = createStore(...args);

//     // создаем ссылку на оригинальный dispatch
//     const oldDispatch = store.dispatch;

//     // подменяем функцию dispatch
//     store.dispatch = (action) => {
//       // если в dispatch приходит строка, то объект создаем и возвращаем вручную
//       if (typeof action === "string") {
//         return oldDispatch({
//           type: action,
//         });
//       }

//       return oldDispatch(action);
//     };

//     return store;
//   };

// const store = createStore(
//   combineReducers({
//     heroes,
//     filters,
//   }),
//   compose(
//     applyMiddleware(ReduxThunk, stringMiddlware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = configureStore({
  reducer: {
    heroes,
    filters,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddlware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
