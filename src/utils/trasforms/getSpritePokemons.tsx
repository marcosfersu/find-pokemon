const getSpritePokemons =  (res: {data:{id:number, name: string, sprites:{back_default:string,back_shiny:string, front_default:string, front_shiny:string  }}}) => {
        const { data } = res
        const idSpirte = data.id
        const name = data.name
        const sprites = data.sprites
        const backDefult = sprites.back_default
        const backShiny = sprites.back_shiny
        const frontDefault = sprites.front_default
        const frontShiny = sprites.front_shiny
        const spritesAll = {  frontDefault, frontShiny, backDefult, backShiny, idSpirte, name }

        return spritesAll

}


export default getSpritePokemons