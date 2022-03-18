//this module contains the fetch call for dnd 5e monsters
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { SearchBar } from "./search";


export const Monsters =() => {
    const [monsters, setMonsters] =useState([])
    const [selectedMonsters, setSelectedMonsters]=useState([])
    const {encounterId}=useParams()
    const history= useHistory()
    //search bar variables
    const filterMonsters = (monsters, query) => {
        if (!query) {
            return monsters;
        }
    
        return monsters.filter((monster) => {
            const monsterName = monster.name.toLowerCase();
            return monsterName.includes(query);
        });
    };
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredMonsters = filterMonsters(monsters, searchQuery);

    

    const saveMonsters = (evt) => {
        evt.preventDefault()
        selectedMonsters.forEach((monster)=>{
            const newEncounterMonster ={
                monsterId:monster,
                encounterId:parseInt(encounterId)
            }
            
            
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newEncounterMonster)
            }
            return fetch("http://localhost:8088/encounterMonsters", fetchOption)
            .then( history.push(`/Encounters`))
        })
    }

    useEffect(
        () => {
            fetch("http://localhost:8088/monsters?_sort=name")
                .then(res => res.json())
                .then(
                    (monsters) => {
                        setMonsters(monsters)
                    }
                )
        },
        []
    )
    const backButton =()=> {
        history.push(`/encounters/customEncounterForm`)
    }
    
    return (
        <>
        <h3> Choose Your Monsters!</h3>
        <button class="backButton" onClick={backButton}>Back</button>
        <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        {
            filteredMonsters.map(
                (monster) => { 
                    return <>
                     <p key={`monster--${monster.id}`}>
                            {monster.name} <input type="checkbox" onChange={(e)=> {
                            
                                let copy = [...selectedMonsters]
                                copy.push(monster.id)
                                setSelectedMonsters(copy)
                            }}/>
                            
                        </p>
                    </>
                }
            )
        }
                         <button className="monster-button" onClick={
                           (e)=> saveMonsters(e)
                        }>
                        Create Encounter
                    </button> 
        </>
    )
}