import React, {FC} from 'react'
import ViewPokemon from '../Component/ViewPokemon/ViewPokemon'
import DataPokemon from '../Component/DataPokemon/DataPokemon'
import ImgPokemon from '../Component/ImgPokemon/ImgPokemon'
import Header from '../Component/Header/Header'
import usePokemonPage from '../hooks/usePokemonPage'
import './style.css'


import {allPokemonsProps} from '../hooks/usePokemonPage'

export type Props = {
    data: {
        pokemons: {},
        allPokemons: allPokemonsProps,
        allEvolutionPokemon: {},
        bounding: {
            top: number;
            right: number;
            width: number;
            height: number;
        }
    }
    action: {}
    size: {
        width: number
    }
}


const PokemonPage:FC<Props>  = ({ data, action, size }) => {

    const {pokemons, allPokemons, allEvolutionPokemon, bounding} = data

    const {idPokemon, evolutionPokemon, onClickHandler, onCloseHandler, bgType, error} = usePokemonPage( allPokemons, pokemons, allEvolutionPokemon, action)


    return (
        <div className={`container-pokemon-page`}>
            {
                error && console.error(error)
            }
            <div className={`bg-type ${allPokemons[`${idPokemon}`] ? bgType(allPokemons[`${idPokemon}`].type) : "" }`} ></div>
            <div className="pokemon-container">
                <div>
                    <Header />
                    <div className="pokemon-left"> 
                    {
                        <ViewPokemon view={allPokemons[`${idPokemon}`] && allPokemons[`${idPokemon}`].spritesPokemon } />
                    }
                        <DataPokemon data={allPokemons[`${idPokemon}`] && allPokemons[`${idPokemon}`].dataPokemon} evolution={evolutionPokemon}  />
                    </div>
                </div>
                <ImgPokemon data={(allPokemons[`${idPokemon}`]) && allPokemons[`${idPokemon}`].dataPokemon} onClickHandler={onClickHandler} onCloseHandler={onCloseHandler} bounding={bounding} size={size} />
            </div>
        </div>
    )
}

export default PokemonPage
