
const getDataPokemon = (res:{data:{id:number, hires:string, species:string, name:{english:string, japanese:string}, description:string, type:{}, profile:{ability:[]}, base:[]  }}) => {
    const { data } = res
    const id = data.id
    const mainImage = data.hires
    const species = data.species
    const nameEn = data.name.english
    const nameJp = data.name.japanese
    const description = data.description
    const type = data.type
    const ability = data.profile.ability
    const stats = data.base

    const propsValue = { species, nameEn, mainImage, nameJp, description, type, ability, stats, id } 
    return (propsValue)
}

export default getDataPokemon