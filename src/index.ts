import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { AppDataSource } from './db'
import { AirlineRoute } from './routes/airline.route'
import { TicketRouter } from './routes/ticket.route'
import { FlightRoute } from './routes/flight.route'

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

app.use('/api/airline', AirlineRoute)
app.use('/api/ticket', TicketRouter)
app.use('/api/flight', FlightRoute)