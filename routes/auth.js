const express = require('express')
const router= express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require('config')
const { check, validationResult } = require('express-validator')

const Users = require('../models/Users')

const auth = require('../middleware/auth')



router.post('/',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({min: 6})
],
 async(req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await Users.findOne({ where: { email: email }})
         if(!user){
             return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]})
         }
         const isMatch = await bcrypt.compare(password, user.password)
         if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalide credentials'}]})
        }
        const paylod = { user: { id: user.id }}
        jwt.sign(paylod, config.get('jwtSecret'), (err, token)=> {
            if(err) throw err
            res.json({ token })
        }) 
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

router.get('/', auth, async(req, res)=> {
    try {
        const user = await Users.findOne({where: {id: req.user.id}})
        const{id, name, email} = user
        res.json({id, name, email})
    } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
    }
})

module.exports = router