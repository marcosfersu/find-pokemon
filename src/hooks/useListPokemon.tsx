import {useState, useEffect, useCallback} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import getSpritePokemons from '../utils/trasforms/getSpritePokemons';




const useListPokemon = ( url:string, action:any) => {

    const [loading, setLoading] = useState(true)
    const [noMore, setNoMre] = useState(false)


    const [urlNext, setUrlNext] = useState("")



    const [error, setError] = useState<string>("")


    const histories = useHistory()
    
    const onClickHandler = useCallback((id, e) => {
        const bounding = e.currentTarget.getBoundingClientRect()
        action({ type:`SET_BOUNDING`, payload: bounding })
        histories.push(`/pokemon/${id}`)
    },[histories])


    useEffect(() => {

            if (noMore) return
            
            setLoading(true)
            const getPokemons = async (url:string) => {
                try {
                    const res = await axios.get(url)
                    const { data } = res
                    const pokemones = data.results
                      
                    setUrlNext(data.next)

                    pokemones.forEach(async (el:{url:string}) => {

                        try{         
                            const res = await axios.get(el.url)
                            const { data } = res
                            const id = data.id
                            const pokemon = getSpritePokemons(res)
                            if (id <= 152) {
                                action({ type:`SET_POKEMONS`, payload: {[id]:pokemon} })
                            } else {
                                setNoMre(true)
                            } 
                            setLoading(false)
                        } catch (error) {
                            if (error.responde) {
                                setError("Error in change daa pokemon")
                            }  else if (error.request) {
                                setError("Check internet conection")
                            }  else {
                                setError("Error in charge data")
                            }
                        }
                    })
                    
                }  catch (error) {
                    if (error.responde) {
                        setError("Error in change daa pokemon")
                    }  else if (error.request) {
                        setError("Check internet conection")
                    }  else {
                        setError("Error in charge data")
                    }
                }
            }
    
          getPokemons(url)

        }, [url])

        return { loading, onClickHandler, urlNext, error}
}

export default useListPokemon