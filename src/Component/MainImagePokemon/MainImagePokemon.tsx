import React,{FC, useState, useEffect, useRef} from 'react'
import skeletonImg from './../../static/no-img.svg'
import bgPokeballTopImg from './../../static/pokeball-bg-top.svg'
import bgPokeballBottomImg from './../../static/pokeball-bg-bottom.svg'
import { motion } from 'framer-motion'

export type Props = {
    img: any
}

const transition = {  ease:[ 0.43, 0.13, 0.23, 0.96 ]}

const MainImagePokemon:FC<Props> = ({img}) => {

    const [fallback, setFallback] = useState(false)
    const [imgSrc, setImgSrc] = useState("")
    const active = useRef<any>(null);

    useEffect( () => {
        setImgSrc(img)
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
            <motion.img initial={{opacity:0, scale: .8}} animate={{opacity: 1, scale: 1, transition:{delay: 1.4,duration: 1, ...transition} }} src={imgSrc} alt={imgSrc} className="image-pokemon" ref={active}  onError={(e:any) => reloadSrc(e)} /> 
            <div className="image-pokeball">
                <motion.img initial={{y:0}} animate={{y:-20, transition:{delay: 1,duration: .7, ...transition} }} src={bgPokeballTopImg} alt="bg-pokeball" />
                <motion.img initial={{y:0}} animate={{y: 20, transition:{delay: 1,duration: .7, ...transition} }} src={bgPokeballBottomImg} alt="bg-pokeball" />
            </div>
        </>
    )
}

export default MainImagePokemon
