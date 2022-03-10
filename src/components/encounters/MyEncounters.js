//This module is responsible for displaying just a users created encounters

import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min"


//export a function that displays only user encounters as HTML 
export const MyEncounters = () => {
    const [encounters, updateEncounter] = useState([])
    const history = useHistory()

   const getEncounter =  () => { fetch("http://localhost:8088/encounters")
        .then(res => res.json())
        .then(
            (data) => {
                updateEncounter(data)
            }
        )
   }

    useEffect(
        () => {
            getEncounter()
        },
        []
    )
    
    //function to delete encounter
    const deleteEncounter = (id) => {
        fetch(`http://localhost:8088/encounter/${id}`, {
            method: "DELETE"
        }).then(
            () => {
                getEncounter()
            }
        )
    }
    return (
        <>
            <h1> My Encounters</h1>
        {
            encounters.map(
                (encounter) => { 
                     if(user.id === encounter.userId){
                         return encounter
                     }
                       return <p key={`encounter--${encounter.id}`}>
                        {encounter.description} <button onClick={() => {
                                    deleteEncounter(encounter.id)
                                }}>Delete</button>
                        
                        </p>
                
                }
            )
        }
        </>
    )
}
