import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

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

const store = createStore(
  combineReducers({
    heroes,
    filters,
  }),
  compose(
    applyMiddleware(stringMiddlware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
