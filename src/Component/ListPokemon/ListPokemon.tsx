import React, {FC} from 'react'
import CardPokemon from './../CardPokemon/CardPokemon'
import {allPokemonsProps} from './../../hooks/usePokemonPage'

type onClickHandlerFunc = (id:number) => void

export type Props = {
    pokemons: allPokemonsProps,
    onClickHandler: onClickHandlerFunc,
    observerElement: any,
    loading: boolean
}

const ListPokemon:FC<Props> = ({ pokemons, onClickHandler, observerElement, loading }) => {
    return (
        <article className="list-pokemon">
        <div className="list-pokemon-container" >
            {
                pokemons && Object.entries(pokemons).map((value, key) =>  pokemons[key] && <CardPokemon key={key} data={pokemons[key]} onClickHandler={onClickHandler} />)
            }
        </div>
        <div>
            {
                loading && <div>Loading</div>
            }
        </div>
        <div>
            {
                //chanchada
                Object.keys(pokemons).length > 19 && <div ref={observerElement}></div>
            }
        </div>
    </article>
    )
}

export default ListPokemon
