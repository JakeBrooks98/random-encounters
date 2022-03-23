//This module is responsible for displaying just a users created encounters

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Link } from "react-router-dom"
import { getUser } from "../dataAccess"



//export a function that displays only user encounters as HTML 
export const MyEncounters = () => {
    const [encounters, updateEncounter] = useState([])
    const history = useHistory()
    const user = localStorage.getItem("user")

    //gets the current user and updates the encounters array to be just encounters with their userId
    const getEncounter = () => {
        getUser()
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


    //function to delete encounter accepting its id as an argument
    const deleteEncounter = (id) => {
        fetch(`http://localhost:8088/encounters/${id}`, {
            method: "DELETE"
        })
        .then(
            () => {
                getEncounter()
            }
        )
    }
    //displays all encounters in the encounter array
    return (
        <>
            <h1> My Encounters</h1>
            {
                encounters.map(
                    (encounter) => {

                        return <p key={`encounter--${encounter.id}`}>
                            <Link to={`/encounters/${encounter.id}`}>
                            {encounter.description} 
                            </Link>
                            <button onClick={() => {
                                deleteEncounter(encounter.id.toString())
                            }}>Delete</button>

                        </p>


                    }
                )
            }
        </>
    )
}







