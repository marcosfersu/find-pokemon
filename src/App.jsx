import React, { useReducer } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import MainPage from "./Page/MainPage";
import PokemonPage from "./Page/PokemonPage";
import useWindowSize from "./hooks/useWindowSize";

import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const initialValue = {
    pokemons: [],
    url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
    allPokemons: {},
    allEvolutionPokemon: {},
    bounding: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case `SET_ALL_POKEMONS`:
        const pokemonData = action.payload;
        const newPokemonData = { ...state.allPokemons, ...pokemonData };
        return { ...state, allPokemons: newPokemonData };

      case `SET_POKEMONS`:
        const pokemonSprite = action.payload;
        const newPokemons = { ...state.pokemons, ...pokemonSprite };
        return { ...state, pokemons: newPokemons };

      case `SET_EVOLUTION_POKEMON`:
        const evolutionData = action.payload;
        const newEvolutionData = {
          ...state.allEvolutionPokemon,
          ...evolutionData,
        };
        return { ...state, allEvolutionPokemon: newEvolutionData };

      case `SET_URL`:
        const newUrl = action.payload;
        return { ...state, url: newUrl };

      case `SET_BOUNDING`:
        const newBounding = action.payload;
        console.log(newBounding);
        return { ...state, bounding: newBounding };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValue);
  const size = useWindowSize();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <MainPage action={dispatch} data={state} />
        </Route>
        <Route exact path="/pokemon/:id">
          <PokemonPage action={dispatch} data={state} size={size} />
        </Route>
        <Route>Not Found</Route>
      </Switch>
    </AnimatePresence>
  );
}

export default App;
