import React, {FC, useRef} from 'react'
import'./data-pokemon.css'

export type Props = {
    data: any
    evolution: any
}

const renderTypePokemon = (el:string) => <li key={el} className={`type-list ${el}`} >{el ? el : ""}</li> 
const renderMovePokemon = (el:any) => <li key={el[0]}>{el[0]}</li> 
const renderEvolutionPokemon = (value:any, key:any) => {
    return (
        <li key={value[0]}>
            <img src={value[1].evolImage } alt=""/> 
            <p>
            {
                (value[1].evolve) ? value[1].evolve[1] : ""
            }
            </p>
        </li>
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


const PokemonData:FC<Props> = ({ data, evolution }) => {

    const infoRef = useRef<any>(null);

    return (
            <div className="information-pokemon" ref={infoRef}>
                <div className="title-pokemon">
                    <p className="species-pokemon">{data ? data.species : ""} </p>
                    <div className="name-pokemon">
                        <h2 className="name-english">{data ? data.nameEn : ""} </h2>
                        <h3 className="name-japanese">{data ? data.nameJp : ""}</h3>
                    </div>
                    <p className="description-pokemon">{data ? data.description : ""}</p>
                </div>
                <div className="data-pokemon scroll-bar">
                    <div className="type-pokemon">
                        <p className="title-item">type</p>
                        <ul>
                            {
                                data &&  data.type.map((el:string) => renderTypePokemon(el))
                            }
                        </ul>
 
                    </div>
                    <hr></hr>
                    <div className="evolution-pokemon">
                        <p className="title-item">evolution</p>
                        <ul>
                            {
                                evolution && Object.entries(evolution).map((key, value) => renderEvolutionPokemon(key, value))   
                            }
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="move-list-pokemon">
                        <p className="title-item">move list</p>
                        <ul>
                            {
                                data && data.ability.map((el:any) => renderMovePokemon(el))
                            }
                        </ul>
                    </div>
                    <hr></hr>
                    <div className="stats-pokemon">
                        <p className="title-item">stats</p>
                        <div>
                         {
                            data && Object.entries(data.stats).map((key) => renderStatssPokemon(key))
                         }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default PokemonData
