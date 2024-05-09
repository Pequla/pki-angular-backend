import { Router } from "express";
import { UserService } from "../services/user.service";

export const UserRoute = Router()

UserRoute.post('/login', async (req, res) => {
    try {
        res.json(await UserService.login(req.body))
    } catch (e) {
        res.status(401).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})

UserRoute.post('/register', async (req, res) => {
    try {
        res.json(await UserService.register(req.body))
    } catch (e) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})

UserRoute.post('/refresh', async (req, res) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        res.json(await UserService.refresh(token))
    } catch (e) {
        res.status(401).json({
            message: e.message,
            timestamp: new Date()
        })
    }
})