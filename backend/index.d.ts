import session from 'express-session'
import {IUser} from "./models/user";

declare module 'express-session' {
    interface SessionData {
        user: IUser
    }
}