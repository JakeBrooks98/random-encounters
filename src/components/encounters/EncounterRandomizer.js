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
if(location !== {}){
    
}

<div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <select defaultValue={"0"} id="location"
                        onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.locationId = evt.target.value
                                updateEncounter(copy)
                            }

                        } >
                        <option value="0">Select a location...</option>
                        {locations.map(location => {
                            return <option value={location.id}>
                                {location.biome}
                            </option>

                        })}</select>


                </div>

if(challengeRating !== 0 ){

}

*/

