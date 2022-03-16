//This module will display the page users see after logging in
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const WelcomePage = () => {
    // useEffect(()=>{
    //     return fetch("https://www.dnd5eapi.co/api/monsters")
    //     .then(data=> data.json())
    //     .then((data)=> {
    //         data.results.forEach(monster => {
    //             fetch("http://localhost:8088/monsters",{
    //                 method: "POST",
    //                 headers: {"Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(monster)
    //             })
    //         })
    //     })
    // },[]
    return <div class="welcomeMessage">
        <h2>Welcome to</h2><br/>
        <h1>Random Encounters</h1><br/>
        <br/>
        <p class="welcome-message">It can be hard to find time to get your friends to play your favorite roleplaying game. Don't lose the time you do have due to a lack of time to plan, use Random Encounters! Start your adventure now by <Link to={`/Encounters`}>choosing from a list of our users encounters</Link> or test your party's strength against the <Link to={`/encounters/EncounterRandomizer`}>Random Encounters!</Link> 
            Or you could begin your journey by <Link to={`/encounters/customEncounterForm`}>creating your own encounters!</Link>  Whatever your experience level, Random Encounters can be the perfect tool for DMs everywhere.</p>
    </div>
}