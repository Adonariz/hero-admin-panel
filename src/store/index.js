import { createStore, combineReducers, compose } from "redux";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const enhancer =
  (createStore) =>
  (...args) => {
    const store = createStore(...args);

    // создаем ссылку на оригинальный dispatch
    const oldDispatch = store.dispatch;

    // подменяем функцию dispatch
    store.dispatch = (action) => {
      // если в dispatch приходит строка, то объект создаем и возвращаем вручную
      if (typeof action === "string") {
        return oldDispatch({
          type: action,
        });
      }

      return oldDispatch(action);
    };

    return store;
  };

const store = createStore(
  combineReducers({
    heroes,
    filters,
  }),
  compose(
    enhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
