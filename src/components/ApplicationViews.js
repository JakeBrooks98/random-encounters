import React from "react"
import { Route } from "react-router-dom"
import { CreateEncounter } from "./encounters/customEncounterForm"
import { Encounters } from "./encounters/encounters"
import { WelcomePage } from "./WelcomePage"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <WelcomePage />
            </Route>
            <Route exact path="/encounters">
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