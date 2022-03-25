//This module will contain the code for an encounter randomizer
import { useState } from "react"
import { useEffect } from "react"
import { getLocations, getTypes } from "../dataAccess"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const EncounterRandomizer = () => {
    const [encounters, setEncounters] = useState([])
    const [encounter, setRandomEncounter] = useState({})
    const [searchCriteria, updateSearchCriteria] = useState({
        location: 0,
        challengeRating: 0,
        type: 0,
        bossEncounter: false,
    })

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

    //fetch for locations
    const [locations, assignLocations] = useState([])
    useEffect(
        () => {
            getLocations()
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
            getTypes()
                .then(
                    (typeArray) => {
                        assignType(typeArray)
                    }
                )
        },
        []
    )

    const locationMessage =(copy) => {
        const messageContainer=document.querySelector(".locationMessage")
        if(copy.location !== 0){
            locations.map(location => 
                {
                    if(location.id === copy.location){
                        return messageContainer.innerHTML=
                        `<p><i>As you enter the ${location.message}...</i></p>`
                    }
                }
            )

        }else{
            messageContainer.innerHTML=""
        }
    }

    const challengeRatingMessage =(copy) => {
        const messageContainer=document.querySelector(".challengeRatingMessage")
        if(copy.challengeRating >= 2){
               return messageContainer.innerHTML=
                `<p class="challengeRatingMessage" >(You are looking for a great challenge, you may need to check Boss to see results...)</p>`

        }else{
            messageContainer.innerHTML=""
        }
    }


    const createRandomEncounter = () => {
        let searchArray = []
        if (searchCriteria.bossEncounter === false) {
            const normalEncounters = encounters.filter(encounter => encounter.boss === false)
            searchArray = normalEncounters


        } else {
            const bossEncounters = encounters.filter(encounter => encounter.boss === true)
            searchArray = bossEncounters


        }
        if (searchCriteria.location != 0) {
            const locationEncounters = searchArray.filter(encounter => encounter.locationId === searchCriteria.location)
            searchArray = locationEncounters

        }
        if (searchCriteria.type != 0) {
            const typeEncounters = searchArray.filter(encounter => encounter.typeId === searchCriteria.type)
            searchArray = typeEncounters

        }
        if (searchCriteria.challengeRating != 0) {
            if(searchCriteria.challengeRating ===1){
                const challengeRatingEncounters = searchArray.filter(encounter => encounter.challengeRating <= 5)
                searchArray = challengeRatingEncounters

            }
            else if(searchCriteria.challengeRating ===2){
                const challengeRatingEncounters = searchArray.filter(encounter => encounter.challengeRating > 5 & encounter.challengeRating <= 10)
                searchArray = challengeRatingEncounters
            }
            else if(searchCriteria.challengeRating ===3){
                const challengeRatingEncounters = searchArray.filter(encounter => encounter.challengeRating > 10 & encounter.challengeRating <=15)
                searchArray = challengeRatingEncounters
            }
            else if(searchCriteria.challengeRating ===4){
                const challengeRatingEncounters = searchArray.filter(encounter => encounter.challengeRating > 15 & encounter.challengeRating <=20)
                searchArray = challengeRatingEncounters
            }
            else if(searchCriteria.challengeRating ===5){
                const challengeRatingEncounters = searchArray.filter(encounter => encounter.challengeRating > 20)
                searchArray = challengeRatingEncounters
            }

        }
        if (searchArray.length !== 0) {
            const randomEncounter = searchArray[Math.floor(Math.random() * searchArray.length)];
            setRandomEncounter(randomEncounter)
        }
        else {
            setRandomEncounter({
                searchFailed: true
            })
        }
    }


    return (
        <>
            <div>
                <h1>Randomize Your Adventure</h1>


                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <select defaultValue={"0"} id="location"
                            onChange={
                                (evt) => {
                                    const copy = { ...searchCriteria }
                                    copy.location = parseInt(evt.target.value)
                                    updateSearchCriteria(copy)
                                    {locationMessage(copy)}

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
                <div className="locationMessage">

                </div>


                <fieldset>
                    <div className="form-group">
                        <label htmlFor="type">Type of Encounter:</label>
                        <select defaultValue={"0"} id="type"
                            onChange={
                                (evt) => {
                                    const copy = { ...searchCriteria }
                                    copy.type = parseInt(evt.target.value)
                                    updateSearchCriteria(copy)

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
                        <label htmlFor="challengeRating">Challenge Rating:</label>
                        <select defaultValue={"0"} id="challengeRating"
                            onChange={
                                (evt) => {
                                    const copy = { ...searchCriteria }
                                    copy.challengeRating = parseInt(evt.target.value)
                                    updateSearchCriteria(copy)
                                    {challengeRatingMessage(copy)}
                                }

                            } >
                            <option value="0">Select your challenge level...</option>
                            <option value={"1"}>
                                challenge 0-5
                            </option>
                            <option value={"2"}>
                                challenge 6-10
                            </option>
                            <option value={"3"}>
                                challenge 11-15
                            </option>
                            <option value={"4"}>
                                challenge 16-20
                            </option>
                            <option value={"5"}>
                                challenge 21+
                            </option>

                        </select>


                    </div>
                </fieldset>
                <div className="challengeRatingMessage">

                </div>



                <div class="randomizer">
                    <label>💀Boss:</label><input type="checkbox" value={searchCriteria.bossEncounter} onChange={
                        () => {
                            let copy = { ...searchCriteria }
                            copy.bossEncounter = !searchCriteria.bossEncounter
                            updateSearchCriteria(copy)
                        }
                    }></input>

                    <button class="randomButton" onClick={() => { createRandomEncounter() }}>Roll Random Encounter</button>
                    {encounter?.id !== undefined & encounter.typeId === 1 ? <><p><i>Your Party Encounters <Link className="randomizerLink" to={`/encounters/${encounter.id}`}>
                                    {encounter.description}
                                </Link>...</i></p></> : encounter?.id !== undefined & encounter.typeId === 2? <><p><i><Link className="randomizerLink" to={`/encounters/${encounter.id}`}>
                                    {encounter.description}
                                </Link></i></p></> : encounter?.searchFailed ? "nothing matches that criteria" : ""}
                    



                </div>


            </div>
        </>)
}




