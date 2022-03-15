//this module contains the fetch call for dnd 5e monsters
import { useState, useEffect } from "react"

export const Monsters =() => {
    const [monsters, setMonsters] =useState()

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
                    return <p key={`monster--${monster.id}`}>
                            {monsters.name} <input type="checkbox" />
                            
                        </p>
                }
            )
        }
        </>
    )
}