//This module is responsible for displaying the list of all encounters
import React, { useEffect, useState } from "react"
import { useHistory,Link } from "react-router-dom/cjs/react-router-dom.min";

//export a function that displays all encounters as HTML
export const Encounters = () => {
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


    const history = useHistory()
    

    return (
        <>
        <h1> Choose Your Adventure!</h1>
            <h3>Encounters</h3>
        {
            encounters.map(
                (encounter) => { 
                    return <p key={`encounter--${encounter.id}`}>
                        <Link to={`/encounters/${encounter.id}`}>
                            {encounter.description} 
                            </Link>
                        
                        </p>
                }
            )
        }
        </>
    )
}

