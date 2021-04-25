import React,{FC, useState, useEffect, useRef} from 'react'
import skeletonImg from './../../static/no-img.svg'
import bgPokeballImg from './../../static/bg-pokeball-05.svg'

export type Props = {
    img: any
}

const MainImagePokemon:FC<Props> = ({img}) => {

    const [fallback, setFallback] = useState(false)
    const [imgSrc, setImgSrc] = useState("")
    const active = useRef<any>(null);

    useEffect( () => {
        if ((imgSrc !== img) && (img !== null)) {

                setImgSrc(img)

                active.current.classList.add("active")
    
        } else {
            if((img === null)) active.current.classList.remove("active")
        }
    },[img])
    
    const reloadSrc = (e:any) => { 
        if(fallback){
            e.target.src = skeletonImg
        }else{
            e.target.src = imgSrc
            setFallback(true)
        }
    }

    return (
        <>
        
            <img src={imgSrc} alt={imgSrc} className="image-pokemon" ref={active}  onError={(e:any) => reloadSrc(e)} /> 
            <img src={bgPokeballImg} alt="bg-pokeball" className="image-pokeball"/>
        </>
    )
}

export default MainImagePokemon
