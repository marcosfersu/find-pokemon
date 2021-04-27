import React, {FC, useRef} from 'react'
import { motion } from 'framer-motion'

import'./data-pokemon.css'

export type Props = {
    data: any
    evolution: any
}

const renderTypePokemon = (el:string) => <motion.li variants={animationItem} transition={{delay: 1.5, duration: .8, ...transition}} key={el} className={`type-list ${el}`} >{el ? el : ""}</motion.li> 
const renderMovePokemon = (el:any) => <motion.li variants={animationItem} transition={{delay: 1.6, duration: .8, ...transition}} key={el[0]}>{el[0]}</motion.li> 
const renderEvolutionPokemon = (value:any, key:any) => {
    return (
        <motion.li variants={animationItem} transition={{delay: 1.7, duration: .8, ...transition}} key={value[0]}>
            <img src={value[1].evolImage } alt=""/> 
            <p>
            {
                (value[1].evolve) ? value[1].evolve[1] : ""
            }
            </p>
        </motion.li>
    )
}
const renderStatssPokemon = (key:any) => {
    return(
        <div key={key[0]}>
            <p>{key[0]}</p>
            <p>{key[1]}</p>
        </div>
    )
}

const transition = {  ease:[ 0.43, 0.13, 0.23, 0.96 ]}

const pokemonName = {
    initial: {
        y: 400
    },
    animate: {
        y: 0,
        transition:{
            delay: .6, duration: 1, ...transition
        }
    }
}

const pokemonNameJs = {
    initial: {
        y: -400
    },
    animate: {
        y: -5,
        transition:{
            delay: .6, duration: 1, ...transition
        }
    }
}


const specialPokemon = {
    initial: {
        opacity: 0,
        y: 40
    },
    animate: {
        y:0,
        opacity: 1,
        transition:{
            delay: 1.3, duration: 1, ...transition
        }
    }
}

const descriptionPokemon = {
    initial: {
        opacity: 0,
        y: -40
    },
    animate: {
        y:0,
        opacity: 1,
        transition:{
            delay: 1.8, duration: 1, ...transition
        }
    }
}


const animationCategory = {
    initial: {
        opacity: 0,
        x: -80
    },
    animate: {
        x:0,
        opacity: 1,
    }  
}

const animationItem = {
    initial: {
        opacity: 0,
        x: 40
    },
    animate: {
        x:0,
        opacity: 1,
    }
}


const PokemonData:FC<Props> = ({ data, evolution }) => {

    const infoRef = useRef<any>(null);

    return (
            <motion.div 
                className="information-pokemon"
                ref={infoRef}
                initial="initial"
                animate="animate">
                <div className="title-pokemon">
                    <motion.p variants={specialPokemon} className="species-pokemon">{data ? data.species : ""} </motion.p>
                    <div className="name-pokemon">
                        <span className="letter-wrap">
                            <motion.h2 
                                className="name-english"
                                variants={pokemonName}>
                                    {data ? data.nameEn : ""}
                            </motion.h2>
                        </span>
                        <span className="letter-wrap" style={{width:"100%"}}>
                        <motion.h3 className="name-japanese" variants={pokemonNameJs}>{data ? data.nameJp : ""}</motion.h3>
                        </span>
                    </div>
                    <motion.p variants={descriptionPokemon}>{data ? data.description : ""}</motion.p>
                </div>
                <div className="data-pokemon scroll-bar">
                    <div className="type-pokemon">
                        <motion.p variants={animationCategory} transition={{delay: 1.6, duration: .8, ...transition}} className="title-item">type</motion.p>
                        <motion.ul>
                            {
                                data && data.type.map((el:string) => renderTypePokemon(el))
                            }
                        </motion.ul>
 
                    </div>
                    <hr></hr>
                    <div className="evolution-pokemon">
                        <motion.p variants={animationCategory} transition={{delay: 1.8, duration: .8, ...transition}}  className="title-item">evolution</motion.p>
                        <ul>
                            {
                                evolution && Object.entries(evolution).map((key, value) => renderEvolutionPokemon(key, value))   
                            }
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="move-list-pokemon">
                        <motion.p variants={animationCategory} transition={{delay: 2, duration: .8, ...transition}} className="title-item">move list</motion.p>
                        <ul>
                            {
                                data && data.ability.map((el:any) => renderMovePokemon(el))
                            }
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="stats-pokemon">
                        <motion.p variants={animationCategory} transition={{delay: 2.1, duration: .8, ...transition}} className="title-item">stats</motion.p>
                        <motion.div  variants={animationItem} transition={{delay: 2.2, duration: .8, ...transition}}>
                         {
                            data && Object.entries(data.stats).map((key) => renderStatssPokemon(key))
                         }
                        </motion.div>
                    </div>
                </div>
            </motion.div>
    )
}

export default PokemonData
