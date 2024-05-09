export interface FlightModel {
    id: number
    type: {
        id: number
        name: string
    }
    flightKey: string
    flightNumber: string
    destination: string
    scheduledAt: string
    estimatedAt: string
    connectedType: string
    connectedFlight: string
    plane: string
    gate: string
    terminal: string
}