import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";

const repo = AppDataSource.getRepository(Airline);

export class AirlineService {
    static async getAllAirlines() {
        return await repo.find()
    }
}