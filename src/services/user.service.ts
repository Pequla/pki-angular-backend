import { configDotenv } from "dotenv";
import { AppDataSource } from "../db";
import { User } from "../entities/User";
import { LoginModel } from "../models/login.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const repo = AppDataSource.getRepository(User)
configDotenv()
const accessSecret = process.env.JWT_ACCESS_SECRET
const accessTTL = process.env.JWT_ACCESS_TTL
const refreshSecret = process.env.JWT_REFRESH_SECRET
const refreshTTL = process.env.JWT_REFRESH_TTL

export class UserService {
    static async login(model: LoginModel) {
        const user = await this.getByEmail(model.email);
        if (await bcrypt.compare(model.password, user.password)) {
            const payload = {
                email: user.email
            }

            return {
                email: user.email,
                access: jwt.sign(payload, accessSecret, { expiresIn: accessTTL }),
                refresh: jwt.sign(payload, refreshSecret, { expiresIn: refreshTTL })
            }
        }

        throw new Error('Bad credentials')
    }

    static async refresh(token: string) {
        const decoded: any = jwt.verify(token, refreshSecret)
        return {
            access: jwt.sign({email: decoded.email}, accessSecret, { expiresIn: accessTTL }),
            refresh: token
        }
    }

    static async getByEmail(email: string) {
        const data = await repo.findOne({
            where: {
                email: email
            }
        })

        if (data == undefined)
            throw new Error('User not found')

        return data
    }

    static async verifyToken(req, res, next) {
        if (req.path == '/api/user/login' || req.path == '/api/user/refresh') {
            next()
            return
        }

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == undefined) {
            res.status(401).json({
                message: 'No token found',
                timestamp: new Date()
            })
            return
        }

        jwt.verify(token, accessSecret, (err: any, user: any) => {
            if (err) {
                res.status(403).json({
                    message: 'Invalid token',
                    timestamp: new Date()
                })
                return
            }

            req.user = user
            next()
        })
    }
}