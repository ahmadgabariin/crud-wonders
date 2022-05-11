
const express = require('express')
const router = express.Router()

const wonders = [
    { name: "Mount Everest", location: "Nepal", visited: false },
    { name: "Grand Canyon", location: "Arizona", visited: false },
    { name: "Botanical Gardens", location: "Singapore", visited: true },
    { name: "Pantheon", location: "Greece", visited: false },
    { name: "Colosseum", location: "Italy", visited: true }
]

router.get('/wonders', function (req, res) {
    res.send(wonders)
})

router.post(`/wonder` , function (request , response) {
    console.log(`Someone's tying to make a post request`)
    let wonder = request.body
    wonder.visited = false
    wonders.push(wonder)
    //response.end()
    response.send(`completed adding wonder`)
})

router.put(`/wonder/:name` , function (request , response) {
    const name = request.params.name
    console.log(`someone trying to update !`)
    wonders.find(wonder => wonder.name === name).visited = true
    response.send(`updated successfully`)
})

router.delete(`/wonder/:name` , function (request , response) {
    const name = request.params.name
    let wonderIndex = wonders.findIndex(wonder => wonder.name === name)
    if(wonderIndex > -1){
        wonders.splice(wonderIndex , 1)
    }
    response.end()
})

module.exports = router