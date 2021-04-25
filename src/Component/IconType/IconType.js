import React from 'react'
import iconFire from "./../../static/element-icon/icon-fire.svg"
import iconBug from "./../../static/element-icon/icon-bug.svg"
import iconElectric from "./../../static/element-icon/icon-electric.svg"
import iconDragon from "./../../static/element-icon/icon-dragon.svg"
import iconFighting from "./../../static/element-icon/icon-fighting.svg"
import iconFly from "./../../static/element-icon/icon-fly.svg"
import iconIce from "./../../static/element-icon/icon-ice.svg"
import iconGhost from "./../../static/element-icon/icon-ghost.svg"
import iconGrass from "./../../static/element-icon/icon-grass.svg"
import iconNormal from "./../../static/element-icon/icon-normal.svg"
import iconPoison from "./../../static/element-icon/icon-poison.svg"
import iconPhysics from "./../../static/element-icon/icon-physics.svg"
import iconRock from "./../../static/element-icon/icon-rock.svg"
import iconWater from "./../../static/element-icon/icon-water.svg"
import iconGround from "./../../static/element-icon/icon-ground.svg"
import iconFairy from "./../../static/element-icon/icon-fairy.svg"
import iconSteel from "./../../static/element-icon/icon-steel.svg"


export const validValues = [
    "Fire",
    "Bug",
    "Electric",
    "Dragon",
    "Fighting",
    "Flying" ,
    "Ice",
    "Ghost",
    "Grass",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Water",
    "Ground",
    "Fairy",
    "Steel"
]

const stateByName = {
    Fire: iconFire,
    Bug: iconBug,
    Electric: iconElectric,
    Dragon: iconDragon,
    Fighting: iconFighting,
    Flying: iconFly,
    Ice: iconIce,
    Ghost: iconGhost,
    Grass: iconGrass,
    Normal: iconNormal,
    Poison: iconPoison,
    Psychic: iconPhysics,
    Rock: iconRock,
    Water: iconWater,
    Ground: iconGround,
    Fairy: iconFairy,
    Steel: iconSteel
}

const IconState = ({state}) => {
    const includes = validValues.includes(state) ? state : "Normal"
    const StateByName = stateByName[includes]
    return <img src={StateByName} alt=""/> 
}

export default IconState