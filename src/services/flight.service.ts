import axios from "axios";

const client = axios.create({
    baseURL: 'https://flight.pequla.com/api/flight',
    headers: {
        'Accept': 'application/json'
    }
})

export class FlightService {
    static async getFlightById(id: number) {
        const rsp =  await client.get(`/${id}`)
        return rsp.data
    }
}