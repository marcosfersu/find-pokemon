import React, {FC} from 'react'
import './view-pokemon.css'
import skeletonImg from './../../static/no-img.svg'


export type Props = {
    view: any
}

const listView = [{property:"frontDefault", text:"front"},{property:"frontShiny", text:"front shiny"} ,{property:"backDefult", text:"back"} , {property:"backShiny", text:"back shiny"}  ]

const renderViewImg = (el:any, view:any) => {

    return (
        <div className="view-card" key={el.text}>
            <img src={view ? view[el.property] : skeletonImg}  alt=""/>
            <figcaption>{el.text}</figcaption>
        </div>
    )
}

const ViewPokemon:FC<Props> = ( {view} ) => {    
    return (
        <div className="view-pokemon">
            {
                listView.map((el:object) => renderViewImg(el, view))
            }
        </div>
    )
}

export default ViewPokemon
