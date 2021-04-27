import React, {FC} from 'react'
import CardPokemon from './../CardPokemon/CardPokemon'
import {allPokemonsProps} from './../../hooks/usePokemonPage'
import { motion } from 'framer-motion'

type onClickHandlerFunc = (id:number, e:any) => void

export type Props = {
    pokemons: allPokemonsProps,
    onClickHandler: onClickHandlerFunc,
    observerElement: any,
    loading: boolean,
}


const transition = { duration: 0.6, ease:[ 0.43, 0.13, 0.23, 0.96 ] }

const ListPokemon:FC<Props> = ({ pokemons, onClickHandler, observerElement, loading }) => {
    return (
        <motion.article  exit={{backgroundColor:"#FFFFFF"}} transition={transition} className="list-pokemon">

            <motion.div exit={{opacity: 0}} transition={transition} className="list-pokemon-container" >
                {
                    pokemons && Object.entries(pokemons).map((value, key) =>  pokemons[key] && <CardPokemon key={key} data={pokemons[key]} onClickHandler={onClickHandler} />)
                }
            </motion.div>
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
        </motion.article>
    )
}

export default ListPokemon
