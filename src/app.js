const express = require('express')

const db = require('./tools/database')
const initModels = require('./models/initModels')
const config = require('./config')
const productsRouter = require('./products/products.router')

const app = express()

db.authenticate()
.then(()=> console.log('DB Authentication Succesfully'))
.catch((err)=> console.log(err))

db.sync()
.then(()=> console.log('Database Synced'))
.catch((err)=> console.log(err))

initModels()

app.use(express.json())

app.get('/', (req, res)=> {
    res.status(200).json({message: 'OK!'})
})

app.use('/products', productsRouter)

app.listen(config.port, ()=> {
    console.log(`Server Started At Port ${config.port}`)
})