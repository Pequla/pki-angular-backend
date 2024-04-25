import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Ticket } from "../entities/Ticket";
import { UserService } from "./user.service";

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

        return data
    }

    static async createTicket(auth: any, ticket: Ticket) {
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
            where:{
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