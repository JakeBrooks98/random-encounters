//this module is specifically designed to create and export get functions
const user = localStorage.getItem("user")

export const getUser = () => {
    return fetch(`http://localhost:8088/encounters?userId=${user}`)
    .then(res => res.json())
    
}

//export const getExpandedLocation = 