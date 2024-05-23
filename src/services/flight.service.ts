import axios from "axios";
import { FlightModel } from "../models/flight.model";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api/flight',
    headers: {
        'Accept': 'application/json'
    }
})

export class FlightService {
    static async getFlightById(id: number): Promise<FlightModel> {
        const rsp = await client.get(`/${id}`)
        return rsp.data
    }

    static async getFlightsByIds(ids: number[]): Promise<FlightModel[]> {
        const rsp = await client.request({
            url: '/list',
            method: 'post',
            data: ids
        })

        return rsp.data
    }
}