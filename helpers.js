const axios = require('axios')
const ProgramingModal = require('./model')

function getAll(req, res) {
    axios.get("https://ltuc-asac-api.herokuapp.com/programmingLangData").then(result => {
        res.json(result.data)
    })
}


function getFav(req, res) {
    let email = req.query.email
    ProgramingModal.findOne({ email }, (err, result) => {
        if (result) {
            res.json(result.fav)
        }
        else {
            res.json([])
        }
    })
}
function addFav(req, res) {
    let { title, imageUrl, email } = req.body
    ProgramingModal.findOne({ email }, (err, result) => {
        if (result) {
            let idx = result.fav.findIndex(elem => {
                return elem.title == title
            })

            if (idx == -1) {
                let newFav = result.fav
                newFav.push({ title: title, imageUrl: imageUrl })
                result.fav = newFav
                result.save().then(
                    res.json('saved'))
            }
            else {
                res.json("saved before")
            }
        }
        else {
            ProgramingModal.create({ email: email, fav: [{ title: title, imageUrl: imageUrl }] })
            res.json("saved new user")
        }

    })
}

function deleteFav(req, res) {
    let email = req.query.email
    let title = req.query.title
    ProgramingModal.findOne({ email }, (err, result) => {
        let idx = result.fav.findIndex(elem => {
            return elem.title == title
        })
        result.fav.splice(idx, 1)
        console.log(result.fav)
        result.save().then(
            res.json(result.fav))
    })
}
function updatefav(req, res) {
    let {title1, title, imageUrl, email } = req.body
    ProgramingModal.findOne({ email }, (err, result) => {
        let idx = result.fav.findIndex(elem => {
            return elem.title === title1
        })

        console.log(idx)
        result.fav[idx] = {title: title, imageUrl: imageUrl }
     
        console.log(result.fav)
        result.save().then(
            res.json(result.fav))
    })

}
module.exports = { getAll, getFav, addFav, deleteFav, updatefav }