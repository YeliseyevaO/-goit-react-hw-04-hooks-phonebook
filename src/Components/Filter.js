import s from "./Filter.module.css";

export default function Filter({ filter, takeFilterName }) {
  return (
    <>
      <h3>Find contacts by name</h3>
      <input
        className={s.input}
        name="filter"
        value={filter}
        type="input"
        onChange={takeFilterName}
      ></input>
    </>
  );
}
