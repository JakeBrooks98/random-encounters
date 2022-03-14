//This module is responsible for rendering a form users can fill out to create a custom encounter
import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

export const CreateEncounter = () => {
    
    const [encounter, updateEncounter] = useState({
        description: "",
        boss: false,
        challengeRating:""
        
    });
    const history = useHistory()
    //create a new encounter object
    const saveEncounter = (evt) => {
        evt.preventDefault()
        const newEncounter = {
            description: encounter.description,
            boss: encounter.boss,
            typeId:parseInt(encounter.typeId),
            locationId: parseInt(encounter.locationId),
            userId: parseInt(localStorage.getItem("user")),
            challengeRating:encounter.challengeRating
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEncounter)
        }
        return fetch("http://localhost:8088/encounters", fetchOption)
            .then(() => {
                history.push("/encounters")
            })
    }
    //fetch for locations
    const [locations, assignLocations] = useState([])
    

    useEffect(
        () => {
            fetch("http://localhost:8088/locations")
                .then(res => res.json())
                .then(
                    (locationArray) => { 
                        assignLocations(locationArray)
                    }
                )
        },
        []
    )
//fetch for types
    const [types, assignType] = useState([])
    

    useEffect(
        () => {
            fetch("http://localhost:8088/types")
                .then(res => res.json())
                .then(
                    (typeArray) => { 
                        assignType(typeArray)
                    }
                )
        },
        []
    )
//display the form as HTML
    return (
        <form className="encounterForm">
            <h2 className="encounterForm__title">Create your own Encounter</h2>
           
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of encounter"
                        onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.description = evt.target.value
                                updateEncounter(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Type of Encounter:</label>
                    <select defaultValue={"0"} id="type"
                        onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.typeId = evt.target.value
                                updateEncounter(copy)
                            }
                    
                        } >
                    <option value="0">Choose Encounter Type...</option>
                    {types.map(type => {
                            return <option value={type.id}>
                        {type.type}
                    </option>

                        })}</select>


                </div>
            </fieldset>

            <fieldset>
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
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Boss:</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.boss = evt.target.checked
                                updateEncounter(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="challengeRating">Challenge Rating:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Input challenge rating as #"
                        onChange={
                            (evt) => {
                                const copy = { ...encounter }
                                copy.challengeRating = evt.target.value
                                updateEncounter(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={saveEncounter}>
                Make Encounter
            </button>
        </form>
    )
}