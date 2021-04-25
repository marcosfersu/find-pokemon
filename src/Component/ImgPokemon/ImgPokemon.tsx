import React, {FC} from 'react'
import IconState from '../IconType/IconType'
import CloseIcon from '../../static/close.svg'
import MainImagePokemon from '../MainImagePokemon/MainImagePokemon'
import fixNumber from './../../utils/fixNumber'
import './img-pokemon.css'



export type Props = {
    data: any
    onClickHandler: any
    onCloseHandler: any
}

const ImgPokemon:FC<Props> = ({ data, onClickHandler, onCloseHandler }) => {

    const hanglerBackPokemon = (id:number) => {
        let backPokemon = id - 1 
        onClickHandler(backPokemon)
    }

    const hanglerNextPokemon = (id:number) => {
        let nextPokemon = id + 1
        onClickHandler(nextPokemon)
    }


    return (
        <div className="img-pokemon">
            <div className="pokemon-element-icon">
                <div>
                    {
                        data && data.type.map((el:string) => <IconState key={el} state={el} /> )
                    }
                </div>
                <img src={CloseIcon} alt="" className="close-pokemon" onClick={onCloseHandler} />
            </div>
            <div className="image-main">
                <MainImagePokemon img={data && data.mainImage}/>
            </div>
            <div className="numb-arrow">
                <p className="arrow" onClick={()=> hanglerBackPokemon(data.id)}>{"< back"}</p>
                <p className="number">{`#${data ? fixNumber(data.id) : "---"}`}</p>
                <p className="arrow" onClick={()=> hanglerNextPokemon(data.id)}>{"next >"}</p>
            </div>
        </div>
    )
}

export default ImgPokemon
