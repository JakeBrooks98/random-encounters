//this module contains the fetch call for dnd 5e monsters
import { useState, useEffect } from "react"

export const Monsters =() => {
    const [monsters, setMonsters] =useState([])
    const [selectedMonsters, setSelectedMonsters]=useState([])

    // const saveMonsters = (evt) => {
    //     evt.preventDefault()
        
    //         const newEncounterMonster ={
    //             monsterId:monster.id,
    //             encounterId:""
    //         }

       
    //     const fetchOption = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(newEncounterMonster)
    //     }
    //     return fetch("http://localhost:8088/encounterMonsters", fetchOption)
    // }

    useEffect(
        () => {
            fetch("http://localhost:8088/monsters")
                .then(res => res.json())
                .then(
                    (monsters) => {
                        setMonsters(monsters)
                    }
                )
        },
        []
    )
    
    return (
        <>
        <h3> Choose Your Monsters!</h3>
        {
            monsters.map(
                (monster) => { 
                    return <>
                     <p key={`monster--${monster.id}`}>
                            {monster.name} <input type="checkbox" onChange={()=> {
                                let copy = [...selectedMonsters]
                                copy.push(monster.id)
                                setSelectedMonsters(copy)
                            }}/>
                            
                        </p>
                        {/* <button className="monster-button" onClick={}>
                        Create Encounter
                    </button> */}
                    </>
                }
            )
        }
        </>
    )
}