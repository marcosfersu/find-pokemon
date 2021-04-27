import {FC, useState, useEffect, useCallback} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import getDataPokemon from '../utils/trasforms/getDataPokemon'
import getSpritePokemons from '../utils/trasforms/getSpritePokemons'

export type allPokemonsProps = { [id: string]: {
    type: {},
    dataPokemon: {},
    spritesPokemon: {}
} }



const usePokemonPage = ( allPokemons:allPokemonsProps, pokemons:allPokemonsProps, allEvolutionPokemon:allPokemonsProps, action:any) => {

    const {id} = useParams<{id:string}>()
    const [idPokemon, setIdPokemon] = useState<number>(parseInt(id))

    const [dataPokemon, setDataPokemon] = useState<any>({})

    const [spritesPokemon, setSpritesPokemon] = useState<any>({})

    const [groupEvolution, setGroupEvolution] = useState<[]>([])

    const [evolutionPokemon, setEvolutionPokemon] = useState<{}>({})

    const [error, setError] = useState<string>("")

    const histories = useHistory()

    const onClickHandler = useCallback((id) => {
        action({ type:`SET_BOUNDING`, payload: ""})
        histories.push(`/pokemon/${id}`)
    },[histories])

    const onCloseHandler = useCallback(() => {
        action({ type:`SET_BOUNDING`, payload: ""})
        histories.push(`/`)
    },[histories])

    const bgType = (type:any) =>  (type) ? type[0] : ""

    useEffect(() => {

        setIdPokemon(parseInt(id))

        // chanchada ?
        let evolutionPosition = ""
        let evolutionMid = idPokemon

        
        if(allPokemons[`${idPokemon}`]) return

        const setPokemonData = async (idData:number) => {
            const url = `https://app.pokemon-api.xyz/pokemon/${idData}` 
            try {
                const res = await axios.get(url)
                const { data } = res
                const id = data.id
                const getDataPokemonAux = getDataPokemon(res)

                if(id <= 151) setDataPokemon(getDataPokemonAux)

                if (pokemons[`${id}`]) {
                    setSpritesPokemon( pokemons[`${id}`])
                } else {
                    const spritesAllAwait = await setPokemonView(idData)
                    if (id <= 151) setSpritesPokemon(spritesAllAwait)
                }
                


                // Check Evolution
                if(data.evolution) {
                    if(evolutionPosition === "") {
                        if((!data.evolution.prev || data.evolution.prev[0] > 151) && data.evolution.next) evolutionPosition = "first"
                        else if ((data.evolution.prev && data.evolution.prev[0] < 151)  && !data.evolution.next) evolutionPosition = "last"
                        else if((data.evolution.prev && data.evolution.prev[0] < 151) && data.evolution.next) evolutionPosition = "mid"
                    }

                                        
                    if(evolutionPosition === "first") {
                        const evolve = (data.evolution.next) ? data.evolution.next[0] : null
                        const evolImage = data.sprite
                        
                        setGroupEvolution((groupEvolution:any) => ({...groupEvolution, [data.id]:{evolve, evolImage}}))
                        if(evolve && evolve[0] <= 151 && evolutionMid < idPokemon + 2) {
                            evolutionMid++
                            setPokemonData(evolutionMid)
                        } 
                    }


                    if(evolutionPosition === "mid") {
                        const evolveNext = (data.evolution.next) ? data.evolution.next[0] : null
                        const evolvePrev = (data.evolution.prev) ? data.evolution.prev[0] : null
                        const evolImage = data.sprite
                        if(evolutionMid === idPokemon) {
                            const evolve = evolveNext
                            setGroupEvolution((groupEvolution:any) => ({...groupEvolution, [data.id]:{evolve, evolImage}}))
                            evolutionMid = idPokemon + 1
                            setPokemonData(evolutionMid)
                        } else if(evolutionMid > idPokemon) {
                            const evolve = evolvePrev
                            setGroupEvolution((groupEvolution:any) => ({...groupEvolution, [data.id]:{evolve, evolImage}}))
                            evolutionMid = idPokemon - 1
                            setPokemonData(evolutionMid)
                        } else if(evolutionMid < idPokemon){
                            const evolve = evolveNext
                            setGroupEvolution((groupEvolution:any) => ({...groupEvolution, [data.id]:{evolve, evolImage}}))
                        }
                    }

                    if(evolutionPosition === "last") {
                        const evolveNext = (data.evolution.next) ? data.evolution.next[0] : null
                        const evolvePrev = (data.evolution.prev) ? data.evolution.prev : null
                        const evolve = evolveNext
                        const evolImage = data.sprite
                        setGroupEvolution((groupEvolution:any) => ({...groupEvolution, [data.id]:{evolve, evolImage}}))
                        if(evolvePrev && evolvePrev[0] <= 151  && evolutionMid > idPokemon - 2) {
                            evolutionMid --
                            setPokemonData(evolutionMid)
                        } 
                    }
                }
            } catch (error) {
                if (error.responde) {
                    setError("Error in change daa pokemon")
                }  else if (error.request) {
                    setError("Check internet conection")
                }  else {
                    setError("Error in charge data")
                }
            }

        }

        const setPokemonView = async (id:number) => {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}` 
            try {
                const res = await axios.get(url)
                const getSpritePokemonAux = getSpritePokemons(res)
                return getSpritePokemonAux
            } catch (error) {
                if (error.responde) {
                    setError("Error in change daa pokemon")
                }  else if (error.request) {
                    setError("Check internet conection")
                }  else {
                    setError("Error in charge data")
                }
            }
        }

        setGroupEvolution([])
        setPokemonData(idPokemon)

    }, [idPokemon, id])


    useEffect(() => {
        action({ type:`SET_ALL_POKEMONS`, payload: {[dataPokemon.id]:{dataPokemon, spritesPokemon}} })
    }, [spritesPokemon])


    useEffect(() => {
        if(groupEvolution.length !== 0) action({ type:`SET_EVOLUTION_POKEMON`, payload: {[idPokemon]:groupEvolution} })
    }, [groupEvolution])
    


    useEffect(() => {
        const findYourEvolution = () => {
            const checkEvolution = [1, 2, -1, -2]
    
            if(allEvolutionPokemon[idPokemon]) {
                setEvolutionPokemon(allEvolutionPokemon[idPokemon])
            }else {
                checkEvolution.forEach(el => {
                    if(allEvolutionPokemon[idPokemon + el ]) 
                        for (const property in allEvolutionPokemon[idPokemon + el]) 
                            if(idPokemon === parseInt(property)) {
                                setEvolutionPokemon(allEvolutionPokemon[idPokemon + el])
                            } 
                })
            }
        }

        findYourEvolution()
    }, [evolutionPokemon, allEvolutionPokemon, idPokemon, id])
    
    return {  idPokemon, evolutionPokemon, onClickHandler, onCloseHandler, bgType, error}
}

export default usePokemonPage