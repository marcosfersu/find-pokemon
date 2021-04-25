import React, {useReducer} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './Page/MainPage';
import PokemonPage from './Page/PokemonPage';

function App() {

  const initialValue = {
    pokemons: [],
    url: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20",
    allPokemons: {},
    allEvolutionPokemon: {}
  }

  const reducer = (state, action) => {
      switch (action.type) {
        case `SET_ALL_POKEMONS`:
          const pokemonData = action.payload
          const newPokemonData = { ...state.allPokemons, ...pokemonData }
          return { ...state, allPokemons:newPokemonData }

          case `SET_POKEMONS`:
          const pokemonSprite = action.payload
          const newPokemons = { ...state.pokemons, ...pokemonSprite }
          return { ...state, pokemons:newPokemons }

          case `SET_EVOLUTION_POKEMON`:
          const evolutionData = action.payload
          const newEvolutionData = { ...state.allEvolutionPokemon, ...evolutionData }
          return { ...state, allEvolutionPokemon:newEvolutionData }

          case `SET_URL`:
            const newUrl = action.payload
            return { ...state, url:newUrl }
  
        default: 
          return state
      }
  }

  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage 
            action={dispatch} 
            data={state}  /> 
        </Route>
        <Route exact path="/pokemon/:id">
          <PokemonPage 
            action={dispatch}
            data={state} />
        </Route>
        <Route>
          Not Found
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
