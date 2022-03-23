//this module creates a function for displaying monster stat blocks

import { useState, useEffect } from "react"

export const MonsterStats =({url}) => {
    const [encounterMonster, setEncounterMonster]=useState({})
    
    
    useEffect(
        () => {
            return fetch(`https://www.dnd5eapi.co${url}`)
            .then(response => response.json())
            .then((data) => {
                    let monsterDetails = {
                        name:data.name,
                        size: data.size,
                        armor_class:data.armor_class,
                        hit_points: data.hit_points,
                        speed:data.speed.walk,
                        strength:data.strength,
                        dexterity:data.dexterity,
                        constitution: data.constitution,
                        intelligence: data.intelligence,
                        wisdom: data.wisdom,
                        charisma: data.charisma,
                        languages: data.languages,
                        challenge_rating:data.challenge_rating,
                        xp:data.xp
                    }
                    setEncounterMonster(monsterDetails)
                })
        },
        []
    )

    return (
        <>
    <section className="monster-card">
    <div className="encounterMonster_name"><b>{encounterMonster.name}</b></div>
    <div className="encounterMonster__size">Size: {encounterMonster.size}</div>
    <div className="encounterMonster__armorClass"> Armor Class:{encounterMonster.armor_class}</div>
    <div className="encounterMonster__hitPoints">Hit Points: {encounterMonster.hit_points}</div>
    <div className="encounterMonster__hitPoints">Speed: {encounterMonster.speed}</div>
    <br></br>
    <div className="encounterMonster__strength">Strength: {encounterMonster.strength}</div>
    <div className="encounterMonster__dexterity">Dexterity: {encounterMonster.dexterity}</div>
    <div className="encounterMonster__constitution">Constitution: {encounterMonster.constitution}</div>
    <div className="encounterMonster__intelligence">Intelligence: {encounterMonster.intelligence}</div>
    <div className="encounterMonster__wisdom">Wisdom: {encounterMonster.wisdom}</div>
    <div className="encounterMonster__charisma">Charisma: {encounterMonster.charisma}</div>
    <br></br>
    <div className="encounterMonster__languages">Languages: {encounterMonster.languages}</div>
    <div className="encounterMonster__challengeRating">Challenge Rating: {encounterMonster.challenge_rating}</div>
    <div className="encounterMonster__xp">XP: {encounterMonster.xp}</div>

    </section>

   
        </>
    )
}