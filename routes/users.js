const express = require('express')
const router= express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require('config')
const { check, validationResult } = require('express-validator')

const Users = require('../models/Users')

router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 6})
],
 async(req, res)=>{
     const errors = validationResult(req)
     if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
        let user = await Users.findOne({ where: { email: email }})
        if(user) {
            return res.status(400).json({errors: [{msg: 'USER ALREDY EXISTS'}]})
        }
        user = new Users({name: name, email: email, password: password})
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        const payload = { user: { id: user.id }}
        jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
            if(err) throw err
            res.json({token})
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
    
 })

 module.exports = router