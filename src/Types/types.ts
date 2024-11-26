export interface Credentials {
    email: string,
    password: string,
    username?: string
}


export interface Room {
    topic: string,
    roomType: string,
    owner?: string
}