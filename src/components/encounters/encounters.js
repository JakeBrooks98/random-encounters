//This module is responsible for displaying the list of all encounters
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";

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
            <h1>Encounters</h1>
        {
            encounters.map(
                (encounter) => { 
                    return <p key={`encounter--${encounter.id}`}>
                        {encounter.description} 
                        
                        </p>
                }
            )
        }
        </>
    )
}