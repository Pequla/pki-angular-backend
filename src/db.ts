import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { Airline } from './entities/Airline'
import { Ticket } from './entities/Ticket'
import { User } from './entities/User'

dotenv.config()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Airline, Ticket, User],
    logging: false
})