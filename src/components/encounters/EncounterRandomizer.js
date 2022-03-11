//This module will contain the code for an encounter randomizer
import { useState } from "react"

const EncounterRandomizer = () => {
    const [encounters, setEncounters] = useState([])

   

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
    
    const randomEncounter = encounters[Math.floor(Math.random()*encounters.length)];

    return <p>{randomEncounter}</p>
}

