import { Router } from "express";
import { FlightService } from "../services/flight.service";

export const FlightRoute = Router()

FlightRoute.get('/:id', async (req, res)=>{
    try {
        const id = Number.parseInt(req.params.id)
    res.json(await FlightService.getFlightById(id))
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})