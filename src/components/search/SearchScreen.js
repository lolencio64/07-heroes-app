import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
//import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [formValues, handleInputChange] = useForm({
    buscar: q,
  });

  const { buscar } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${buscar}`);

    console.log(formValues);
  };

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />

      <div className="row" onSubmit={handleSearch}>
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form>
            <input
              type="text"
              name="buscar"
              placeholder="Find your hero"
              className="form-control"
              autoComplete="off"
              value={buscar}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a Hero</div>}
          {q !== "" && (
            <div className="alert alert-danger">
              There is no a hero with {q}
            </div>
          )}
          {heroesFiltered.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
