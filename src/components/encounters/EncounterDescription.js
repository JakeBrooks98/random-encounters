//This module will display the details of individual encounters
import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { getExpandedEncounter, getLocations } from "../dataAccess"
import { MonsterStats } from "../monsterStats"



export const EncounterDescription = () => {
    const [encounter, assignEncounter] = useState({})  // State variable for current encounter object
    const { encounterId } = useParams()  // Variable storing the route parameter
    const history = useHistory()
    const [editable, setEditableState] = useState(false)
    const [locations, setLocations] = useState([])
    const [encounterMonsters, setEncounterMonsters] = useState([])
    const user = localStorage.getItem("user")
    const [showMonsterStats, updateShowMonsterStats]= useState(0)

    // Fetch the individual encounter when the parameter value changes
    useEffect(
        () => {
            if (editable === false) {
                getExpandedEncounter(encounterId)
                    .then((data) => {
                        assignEncounter(data)
                    })
            }

        },
        [encounterId, editable]  // Above function runs when the value of encounterId change
    )

    useEffect(
        () => {
            getLocations()
                .then((data) => {
                    setLocations(data)
                })
        },
        []
    )

    useEffect(
        () => {
            return fetch(`http://localhost:8088/encounterMonsters?_expand=encounter&_expand=monster&encounterId=${encounterId}`)
                .then(response => response.json())
                .then((data) => {
                    setEncounterMonsters(data)
                })
        },
        []
    )

    //Function to display the monsters on encounter
    const MonsterDescription = () => {
        if(encounterMonsters.length !== 0){
            const monsterLinks = encounterMonsters.map((encounterMonster) => {
                        return <>
                        <p className="monsterLink" onClick={
                            () => {
                                updateShowMonsterStats(encounterMonster.monster.id)
                            }
                        }>{encounterMonster.monster.name}</p>
                    </>
                    
                })
            return <>
            <p>Monsters:</p>
            {monsterLinks}
            </>

        } else{
            return []
        }


    }


    const backButton = () => {
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



    if (editable === true) {
        return (
            <>

                <section className="encounter">
                    <textarea className="encounter__description" onChange={
                        (evt) => {
                            const copy = { ...encounter }
                            copy.description = evt.target.value
                            assignEncounter(copy)
                        }} value={encounter.description} />
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
                    <input className="encounter__challengeRating" onChange={
                        (evt) => {

                            const copy = { ...encounter }
                            copy.challengeRating = evt.target.value
                            assignEncounter(copy)
                        }} value={encounter.challengeRating} />
                </section>

                <button onClick={editEncounter}>Submit Changes</button>
            </>)
    } else {
        return (
            <>
                <button class="backButton" onClick={backButton}>Back</button>
                <section className="card-section">
                    <section className="encounter-card">
                        <div className="encounter__description">{encounter.description}</div>
                        <div className="encounter__user">Submitted by {encounter.user?.name}</div>
                        <div className="encounter__location">Located in {encounter.location?.biome}</div>
                        <div className="encounter__challengeRating">Challenge Rating: {encounter.challengeRating}</div>
                        <div className="encounter__monsters">{MonsterDescription()}</div>
                        {encounter.user?.id === parseInt(user) ? <button onClick={
                            () =>
                                history.push(`/Monsters/${encounterId}`)
                        }>Add Monster</button> : null}
                        {encounter.user?.id === parseInt(user) ? <button onClick={
                            () =>
                                setEditableState(true)
                        }>Edit</button> : null}
                    </section>
                    <div class="statblock-section">
                        {encounterMonsters.map(encounterMonster => {
                            return encounterMonster.monster.id === showMonsterStats ? <MonsterStats url={encounterMonster.monster.url}/> : null
                        })}
                    </div>
                </section>
            </>
        )
    }

}