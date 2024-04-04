import { Router } from "express";
import { TicketService } from "../services/ticket.service";

export const TicketRouter = Router()

TicketRouter.get('/', async (req, res) => {
    try {
        res.json(await TicketService.getAllTickets())
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})

TicketRouter.post('/', async (req, res) => {
    try {
        res.json(await TicketService.createTicket(req.body))
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})

TicketRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id)
        await TicketService.deleteTicket(id)
        res.status(204).send()
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})