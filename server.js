const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const db = require('./db/database')
const path = require('path')



app.use(cors())
app.use(express.json({ extended: false }))
db.authenticate() 
.then(()=> console.log('database connected!'))
.catch( err=> console.log('Error:' + err))   


app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/photos', require('./routes/photos'))

//serve static if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

