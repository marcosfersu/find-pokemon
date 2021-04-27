import React,{FC} from 'react'
import fixNumber from '../../utils/fixNumber'
import { motion } from "framer-motion"
import "./card-pokemon.css"

export type Props = {
    data: any
    onClickHandler: any
}

const transition = {  ease:[ 0.43, 0.13, 0.23, 0.96 ] }

const CardPokemon:FC<Props> = React.memo(({data, onClickHandler}) => {

    return (
        <motion.div initial={{y:100, opacity: 0}} animate={{y:0, opacity: 1, transition: {delay: .2,duration: .2, ...transition} }} className="card-pokemon" onClick={(e:any) => onClickHandler(data.idSpirte, e)} >
            <div className="number-card">{`#${data ? fixNumber(data.idSpirte)  : "---"}`} </div>
            <div className="img-pokemon-card">
                <motion.img 
                    whileHover={{scale: 1.08}} 
                    transition={ {duration: 0.6, ...transition}}
                    src={`${data ? data.frontDefault : ""}`} 
                    alt={data ? data.name : ""} />
            </div>
            <div className="name-card">
                <p>{data ? data.name : ""}</p>
            </div>
        </motion.div>
    )
})

export default CardPokemon
