import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroCreated } from "../heroesList/heroesSlice";
import { v4 as uuid } from "uuid";

// Задача этого компонента:
// Создание нового героя с введенными данными. Он попадает
// в общее состояние и отображается в списке
// Уникальный идентификатор персонажа сгенерирован через uiid
// Персонаж создается и в файле json при помощи метода POST
// Элементы <option></option> сформированы на базе
// данных из фильтров

const HeroesAddForm = () => {
  const initialState = {
    name: "",
    description: "",
    element: "",
  };

  const [newHero, setNewHero] = useState(initialState);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { filters, filtersLoadingStatus } = useSelector(
    (state) => state.filters
  );

  const onInputChange = (evt) => {
    setNewHero({ ...newHero, [evt.target.name]: evt.target.value });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    // Проверяем, что форма не пустая
    if (JSON.stringify(initialState) === JSON.stringify(newHero)) return;

    const newHeroToAdd = {
      id: uuid(),
      ...newHero,
    };

    // Отправляем данные на сервер в формате JSON
    // ТОЛЬКО если запрос успешен - отправляем персонажа в store
    request(
      "http://localhost:3001/heroes",
      "POST",
      JSON.stringify(newHeroToAdd)
    )
      .then((res) => console.log(res, "added successfully"))
      .then(dispatch(heroCreated(newHeroToAdd)))
      .catch((err) => console.log(err));

    // Очищаем форму после отправки
    setNewHero(initialState);
  };

  const renderFilters = (filters, status) => {
    if (status === "loading") {
      return <option>Загрузка элементов</option>;
    } else if (status === "error") {
      return <option>Ошибка загрузки</option>;
    }

    if (filters && filters.length > 0) {
      return filters.map(({ name, label }) => {
        // Один из фильтров нам тут не нужен
        // eslint-disable-next-line
        if (name === "all") return;

        return (
          <option key={name} value={name}>
            {label}
          </option>
        );
      });
    }
  };

  return (
    <form onSubmit={onFormSubmit} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          value={newHero.name}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fs-4">
          Описание
        </label>
        <textarea
          required
          name="description"
          className="form-control"
          id="description"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          value={newHero.description}
          onChange={onInputChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
          value={newHero.element}
          onChange={onInputChange}
        >
          <option value="">Я владею элементом...</option>
          {renderFilters(filters, filtersLoadingStatus)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
