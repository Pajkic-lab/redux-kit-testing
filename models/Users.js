const Sequelize = require('sequelize')
const db = require('../db/database')


const Users = db.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

module.exports = Users


/*
CREATE TABLE users (
	id serial PRIMARY KEY NOT NULL,
	name VARCHAR (50) NOT NULL,
	email VARCHAR (100) UNIQUE NOT NULL,
	password VARCHAR (50) NOT NULL
);
*/