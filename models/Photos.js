const Sequelize = require('sequelize')
const db = require('../db/database')


const Photos = db.define('photos', {
    created_by: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
})

module.exports = Photos