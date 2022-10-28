import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { fetchFilters } from "../../actions";
import { activeFilterChanged } from "./filtersSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

// Задача этого компонента:
// Фильтры формируются на основании загруженных данных
// Фильтры должны отображают только нужных героев при выборе
// Активный фильтр имеет класс active

const HeroesFilters = () => {
  // const itemRefs = useRef([]);
  const { activeFilter, filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );

  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters(request));

    // eslint-disable-next-line
  }, []);

  // const onFilterClick = (evt) => {
  //   const target = evt.target;

  //   const items = itemRefs.current;
  //   const targetIndex = items.indexOf(target);

  //   items.forEach((item) => item.classList.remove("active"));

  //   items[targetIndex].classList.add("active");
  // };

  const renderFilters = (arr) => {
    return arr.map(({ name, label, className }) => {
      let btnClass = classNames("btn", className, {
        active: name === activeFilter,
      });

      return (
        <button
          key={name}
          id={name}
          // ref={(elem) => (itemRefs.current[i] = elem)}
          onClick={() => dispatch(activeFilterChanged(name))}
          className={btnClass}
        >
          {label}
        </button>
      );
    });
  };

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const buttons = renderFilters(filters);

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{buttons}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
