//this module is specifically designed to create and export get functions

//fetch for user
const user = localStorage.getItem("user")

export const getUser = () => {
    return fetch(`http://localhost:8088/encounters?userId=${user}`)
        .then(res => res.json())

}


export const getExpandedEncounter = (encounterId) => {
    return fetch(`http://localhost:8088/encounters/${encounterId}?_expand=user&_expand=location&_expand=type`)
        .then(response => response.json())

}


//fetch call for encounters
export const getEncounters = () => {
    fetch("http://localhost:8088/encounters?_sort=description")
        .then(res => res.json())
}

//fetch for encounterId

//fetch call for locations
export const getLocations = () => {
    return fetch("http://localhost:8088/locations")
        .then(res => res.json())
}

//fetch call for types
export const getTypes = () => {
    return fetch("http://localhost:8088/types")
        .then(res => res.json())
}

//fetch call for encounterMonsters