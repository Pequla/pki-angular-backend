import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { AppDataSource } from './db'

const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

AppDataSource.initialize()
    .then(() => {
        const port = process.env.SERVER_PORT || 3000
        console.log('Connected to database')
        app.listen(port, () => console.log(`Listening on port ${port}`))
    })
    .catch(e => console.log(e))
