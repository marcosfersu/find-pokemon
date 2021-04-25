import React,{FC} from 'react'
import fixNumber from '../../utils/fixNumber'
import "./card-pokemon.css"

export type Props = {
    data: any
    onClickHandler: any
}

const CardPokemon:FC<Props> = React.memo(({data, onClickHandler}) => {

    return (
        <div className="card-pokemon" onClick={() => onClickHandler(data.idSpirte)} >
            <div className="number-card">{`#${data ? fixNumber(data.idSpirte)  : "---"}`} </div>
            <div className="img-pokemon-card">
                <img src={`${data ? data.frontDefault : ""}`} alt=""/>
            </div>
            <div className="name-card">
                <p>{data ? data.name : ""}</p>
            </div>
        </div>
    )
})

export default CardPokemon
