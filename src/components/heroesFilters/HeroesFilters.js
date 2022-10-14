import { useRef } from "react";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const itemRefs = useRef([]);

  const onFilterClick = (evt) => {
    const target = evt.target;

    const items = itemRefs.current;
    const targetIndex = items.indexOf(target);

    items.forEach((item) => item.classList.remove("active"));

    items[targetIndex].classList.add("active");
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          <button
            ref={(elem) => itemRefs.current.push(elem)}
            onClick={onFilterClick}
            className="btn btn-outline-dark active"
          >
            Все
          </button>
          <button
            ref={(elem) => itemRefs.current.push(elem)}
            className="btn btn-danger"
            onClick={onFilterClick}
          >
            Огонь
          </button>
          <button
            ref={(elem) => itemRefs.current.push(elem)}
            className="btn btn-primary"
            onClick={onFilterClick}
          >
            Вода
          </button>
          <button
            ref={(elem) => itemRefs.current.push(elem)}
            className="btn btn-success"
            onClick={onFilterClick}
          >
            Ветер
          </button>
          <button
            ref={(elem) => itemRefs.current.push(elem)}
            className="btn btn-secondary"
            onClick={onFilterClick}
          >
            Земля
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
