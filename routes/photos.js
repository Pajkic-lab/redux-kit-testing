const express = require('express')
const router= express.Router()

const Photos = require('../models/Photos')

const auth = require('../middleware/auth')


router.post('/', auth, async(req, res)=> {
    const{image}= req.body
    const {id} = req.user
    const photo = new Photos({created_by: id, photo: image})
    await photo.save()
    const povrat = { photo: photo.photo, id: photo.id, created_by: photo.created_by }
    res.json(povrat) 
})

router.get('/', auth, async(req, res)=> {
    const{id} = req.user
    const data = await Photos.findAll({ where: { created_by: id }, raw: true } )
    res.json(data)
})

router.delete('/', auth, async(req, res)=> {
    const {id} = req.body
    await Photos.destroy({ where: {id: id}}).then(res.json(id))
})

module.exports = router

