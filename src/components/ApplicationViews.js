import React from "react"
import { Route } from "react-router-dom"
import { CreateEncounter } from "./encounters/customEncounterForm"
import { Encounters } from "./encounters/Encounters"
import { WelcomePage } from "./WelcomePage"
import { MyEncounters } from "./encounters/MyEncounters"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <WelcomePage />
            </Route>
            <Route exact path="/Encounters">
                <Encounters/>
            </Route>
            <Route exact path="/encounters/customEncounterForm">
                <CreateEncounter/>
            </Route>
            <Route exact path="/encounters/myEncounters">
                
            </Route>
            
        </>
    )
}