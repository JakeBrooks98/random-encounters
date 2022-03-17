//This module will contain the code for an encounter randomizer
import { useState } from "react"
import { useEffect } from "react"

export const EncounterRandomizer = () => {
    const [encounters, setEncounters] = useState([])
    const [encounter, setRandomEncounter] = useState({})
    const [bossEncounter, setBossEncounter] = useState(false)



    useEffect(
        () => {
            fetch("http://localhost:8088/encounters")
                .then(res => res.json())
                .then(
                    (encounterArray) => {
                        setEncounters(encounterArray)
                    }
                )
        },
        []
    )
    const createRandomEncounter = () => {
        if (bossEncounter === false) {
            const normalEncounters = encounters.filter(encounter => encounter.boss === false)
            const randomEncounter = normalEncounters[Math.floor(Math.random() * normalEncounters.length)];
            setRandomEncounter(randomEncounter)

        } else{
            const bossEncounters = encounters.filter(encounter => encounter.boss === true)
            const randomEncounter = bossEncounters[Math.floor(Math.random() * bossEncounters.length)];
            setRandomEncounter(randomEncounter)

        }
    }
    

    return (
        <>
            <div>
                <h1>Randomize Your Adventure</h1>

                <div class="randomizer">
                    <label>Boss:</label><input type="checkbox" value={bossEncounter} onChange={
                        ()=> {
                            setBossEncounter(!bossEncounter)
                        }
                    }></input>
                    
                <button class="randomButton" onClick={() => { createRandomEncounter() }}>Roll Random Encounter</button>
                {encounter.id !== undefined ? <><p><i>{encounter.description}</i></p></> : ""}

                

                </div>


            </div>
        </>)
}


/*
if(biome !== {}){
    
}

if(challengeRating )
*/

