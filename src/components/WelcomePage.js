//This module will display the page users see after logging in
import { Link } from "react-router-dom"

export const WelcomePage = () => {
    return <div class="welcomeMessage">
        <h2>Welcome to</h2><br/>
        <h1>Random Encounters</h1><br/>
        <br/>
        <p>Start your adventure now by <Link to={`/Encounters`}>choosing from a list of our users encounters</Link> or test your party's strength against the <Link to={`/encounters/EncounterRandomizer`}>Random Encounters!</Link> 
            Or you could begin your journey by <Link to={`/encounters/customEncounterForm`}>creating your own encounters!</Link></p>
    </div>
}