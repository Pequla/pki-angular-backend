import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Ticket } from "../entities/Ticket";
import { UserService } from "./user.service";
import { FlightService } from "./flight.service";
import { FlightModel } from "../models/flight.model";

const repo = AppDataSource.getRepository(Ticket)

export class TicketService {
    static async getAllTickets(auth: any) {
        const data = await repo.find({
            select: {
                ticketId: true,
                flightId: true,
                airlineId: true,
                return: true,
                createdAt: true
            },
            where: {
                user: {
                    email: auth.email
                },
                deletedAt: IsNull()
            },
            relations: {
                airline: true
            }
        })

        // Fetch all flights by Ticket Ids
        const flights: FlightModel[] = await FlightService.getFlightsByIds(
            data.map(t => t.flightId)
        )

        // Map flights to tickets
        for (const ticket of data) {
            (ticket as any).flight = flights.find(f => f.id === ticket.flightId)
        }

        return data
    }

    static async getTicketById(id: number, auth: any) {
        const data = await repo.findOne({
            select: {
                ticketId: true,
                flightId: true,
                airlineId: true,
                return: true,
                createdAt: true
            },
            where: {
                ticketId: id,
                user: {
                    email: auth.email
                },
                deletedAt: IsNull()
            },
            relations: {
                airline: true
            }
        })

        if (data == undefined)
            throw new Error("NOT_FOUND")

        const flight = await FlightService.getFlightById(data.flightId);
        (data as any).flight = flight
        return data
    }

    static async createTicket(auth: any, ticket: Ticket) {
        const flight = await FlightService.getFlightById(ticket.flightId)
        const scheduled = new Date(flight.scheduledAt)
        const now = new Date()
        if (scheduled <= now) {
            throw Error('FLIGHT_OUTDATED')
        }

        const user = await UserService.getByEmail(auth.email)
        ticket.userId = user.userId
        ticket.deletedAt = null
        ticket.createdAt = new Date()

        const data = await repo.save(ticket)
        delete data.deletedAt
        return data
    }

    static async deleteTicket(id: number) {
        const data = await repo.findOne({
            where: {
                ticketId: id,
                deletedAt: IsNull()
            }
        })

        if (data == undefined)
            throw new Error('Ticket not found')

        data.deletedAt = new Date()
        await repo.save(data)
    }
}