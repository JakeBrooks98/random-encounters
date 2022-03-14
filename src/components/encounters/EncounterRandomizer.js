//This module will contain the code for an encounter randomizer
import { useState } from "react"
import { useEffect } from "react"

export const EncounterRandomizer = () => {
    const [encounters, setEncounters] = useState([])
    const [encounter, setRandomEncounter] = useState({})



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
    const randomEncounter = encounters[Math.floor(Math.random() * encounters.length)];
    setRandomEncounter(randomEncounter)

}

    return (
        <>
            <div>
                <h1>Randomize Your Adventure</h1>

                <button onClick={ () =>
                    {createRandomEncounter()}}>Roll Random Encounter</button>
                    {encounter.id !== undefined ? <><p>{encounter.description}</p></>: ""}
                
            </div>
        </>)
}

