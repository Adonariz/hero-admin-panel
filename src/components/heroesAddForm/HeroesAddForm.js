import { useState } from "react";
import { useDispatch } from "react-redux";
import { heroAdd } from "../../actions";
import { v4 as uuid } from "uuid";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const initialState = {
    name: "",
    description: "",
    element: "",
  };

  const [newHero, setNewHero] = useState(initialState);
  const dispatch = useDispatch();

  const onInputChange = (evt) => {
    setNewHero({ ...newHero, [evt.target.name]: evt.target.value });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (JSON.stringify(initialState) === JSON.stringify(newHero)) return;

    const newHeroToAdd = {
      id: uuid(),
      ...newHero,
    };

    dispatch(heroAdd(newHeroToAdd));
    setNewHero(initialState);
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
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
