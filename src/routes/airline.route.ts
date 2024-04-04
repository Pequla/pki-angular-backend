import { Router } from "express";
import { AirlineService } from "../services/airline.service";

export const AirlineRoute = Router()

AirlineRoute.get('/', async (req, res) => {
    res.json(await AirlineService.getAllAirlines())
})