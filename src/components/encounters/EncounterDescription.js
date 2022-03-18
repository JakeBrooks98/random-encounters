//This module will display the details of individual encounters
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const EncounterDescription = () => {
    const [encounter, assignEncounter] = useState({})  // State variable for current encounter object
    const { encounterId } = useParams()  // Variable storing the route parameter
    const history = useHistory()
    const [editable, setEditableState]= useState(false)
    const [locations, setLocations] =useState([])
    const user = localStorage.getItem("user")

    // Fetch the individual encounter when the parameter value changes
    useEffect(
        () => {
            if(editable===false) {
                return fetch(`http://localhost:8088/encounters/${encounterId}?_expand=user&_expand=location&_expand=type`)
                    .then(response => response.json())
                    .then((data) => {
                        assignEncounter(data)
                    })
            }

        },
        [ encounterId, editable ]  // Above function runs when the value of encounterId change
    )

    useEffect(
        ()=> {
            return fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((data) => {
                setLocations(data)
            })
        },
        []
    )
    const backButton =()=> {
        history.push(`/Encounters`)
    }
    
    const editEncounter = (evt) => {

    // Construct a new object to replace the existing one in the API
    const updatedEncounter = {
            description: encounter.description,
            boss: encounter.boss,
            typeId: parseInt(encounter.typeId),
            locationId: parseInt(encounter.locationId),
            userId: parseInt(localStorage.getItem("user")),
            challengeRating: parseFloat(encounter.challengeRating)
    }

    // Perform the PUT HTTP request to replace the resource
    fetch(`http://localhost:8088/encounters/${encounterId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEncounter)
    })
        .then(() => {
            setEditableState(false)
        })
}



        if(editable===true){
            return(
            <>
            
                    <section className="encounter">
                        <textarea className="encounter__description"  onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.description = evt.target.value
                                assignEncounter(copy)
                            }} value={encounter.description}/>
                        <div className="encounter__user">Submitted by {encounter.user?.name}</div>
                        <select className="encounter__location" value={encounter.locationId} onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.locationId = evt.target.value
                                assignEncounter(copy)
                            }} >
                                <option value="0">Select a location...</option>
                    {locations.map(location => {
                            return <option value={location.id}>
                        {location.biome}
                    </option>

                        })}
                            </select>
                        <input className="encounter__challengeRating"  onChange={
                            (evt) => {
                                
                                const copy = { ...encounter }
                                copy.challengeRating = evt.target.value
                                assignEncounter(copy)
                            }} value= {encounter.challengeRating}/>
                    </section>

                    <button onClick={editEncounter}>Submit Changes</button>
                </>)
        }else{
            return (
                <>
                <button class="backButton" onClick={backButton}>Back</button>
                    <section className="encounter">
                        <div className="encounter__description">{encounter.description}</div>
                        <div className="encounter__user">Submitted by {encounter.user?.name}</div>
                        <div className="encounter__location">Located in {encounter.location?.biome}</div>
                        <div className="encounter__challengeRating">Challenge Rating: {encounter.challengeRating}</div>
                        {encounter.user?.id ===parseInt(user) ? <button onClick={
                            () => 
                            setEditableState(true)
                        }>Edit</button> : null}
                    </section>
                </>
            )
        }
    
}