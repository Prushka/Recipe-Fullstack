import session from 'express-session'
import {IUser, SessionUser} from "./models/user";

declare module 'express-session' {
    interface SessionData {
        user: SessionUser
    }
}