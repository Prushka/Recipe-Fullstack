import {Schema, model, Model, Document, ObjectId} from 'mongoose';
import validator from "validator";
import {genSalt, hash, compare} from "bcryptjs";
import {getFileURLFromStoredString} from "../utils/util";

export const DEFAULT_AVATAR = "https://s2.loli.net/2022/04/04/LWscZaKF8MpgBQf.png"

export interface SessionUser {
    _id?: ObjectId
    name: string
    email: string
    avatar?: string
    role: 0 | 1
    followers: string[]
    following: string[]
    savedRecipes: string[]
}

export interface IUser extends SessionUser, Document<ObjectId> {
    password: string
}

export enum Role {
    USER = 0,
    ADMIN = 1,
    Guest = -1
}

interface UserModel extends Model<IUser> {
    findByUsernameEmailPassword: (email: String, password: String) => Promise<IUser>
    findByEmailName: (email?: String, name?: String) => Promise<IUser>
}

const UserSchema = new Schema<IUser, UserModel>({
    name: {type: String, required: true},
    email: {
        type: String, required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Not valid email'
        }
    },
    avatar: {
        type: String, get:
            (avatar: string) => getFileURLFromStoredString(avatar) ?? DEFAULT_AVATAR
    },
    password: {
        type: String, required: true,
        minlength: 3
    },
    role: {type: Number, default: 0},
    followers: [
        {type: String}
    ],
    following: [
        {type: String}
    ],
    savedRecipes: [
        {type: String}
    ]
});

UserSchema.pre('save', function (next) {
    const user = this; // binds this to User document instance

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        // generate salt and hash the password
        genSalt(10, (err, salt) => {
            hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

UserSchema.static('findByUsernameEmailPassword', async function findByUsernameEmailPassword(input, password) {
    const User = this
    let user = await User.findOne({$or: [{email: input}, {name: input}]});
    if (user) {
        return new Promise((resolve) => {
            compare(password, user!.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    resolve(null)
                }
            })
        })
    }
    return
});

UserSchema.static('findByEmailName', async function findByEmailName(email?: string, name?: string) {
    const User = this
    if (email && name) {
        return User.findOne({$or: [{email: email}, {name: name}]});
    }
    if (email) {
        return User.findOne({email: email})
    }
    if (name) {
        return User.findOne({name: name})
    }
    return User.find()
});

export const User = model<IUser, UserModel>('User', UserSchema)