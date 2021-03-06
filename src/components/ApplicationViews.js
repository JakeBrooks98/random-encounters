import React from "react"
import { Route } from "react-router-dom"
import { CreateEncounter } from "./encounters/customEncounterForm"
import { EncounterDescription } from "./encounters/EncounterDescription"
import { Encounters } from "./encounters/Encounters"
import { MyEncounters } from "./encounters/MyEncounters"
import {Monsters} from "./monsterProvider"
import {EncounterRandomizer} from "./encounters/EncounterRandomizer"
import { WelcomePage } from "./WelcomePage"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <WelcomePage />
            </Route>
            <Route exact path="/Encounters">
                <Encounters/>
            </Route>
            <Route exact path="/Monsters/:encounterId(\d+)">
                <Monsters/>
            </Route>
            <Route exact path="/encounters/customEncounterForm">
                <CreateEncounter/>
            </Route>
            <Route exact path="/encounters/myEncounters">
                <MyEncounters/>
            </Route>
            <Route exact path="/encounters/:encounterId(\d+)">
                <EncounterDescription />
            </Route>
            <Route exact path="/encounters/EncounterRandomizer">
                <EncounterRandomizer/>
            </Route>
        </>
    )
}