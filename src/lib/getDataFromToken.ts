import {NextRequest} from "next/server"
import jwt from "jsonwebtoken"

export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')
        if (token) {
           return  jwt.decode(token.value as string)
        }
        return null;
    } catch (error) {
        return null
    }
}