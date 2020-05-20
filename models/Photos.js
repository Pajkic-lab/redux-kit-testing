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

/*
CREATE TABLE photos (
	id serial PRIMARY KEY NOT NULL,
	created_by integer references users(id) NOT NULL,
	photo VARCHAR (200) NOT NULL
);
*/