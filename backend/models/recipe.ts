import {Schema, model, Model, Document} from 'mongoose';
import validator from "validator";
import {genSalt, hash, compare} from "bcryptjs";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: "admin" | "user";
}

interface UserModel extends Model<IUser> {
    findByEmailPassword: (email: String, password: String) => Promise<IUser>
    findByEmailName: (email: String, name: String) => Promise<IUser>
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
    avatar: String,
    password: {
        type: String, required: true,
        minlength: 6
    },
    role: {type: String, default: "user"}
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

UserSchema.static('findByEmailPassword', async function findByEmailPassword(email, password) {
    const User = this
    let user = await User.findOne({email: email})
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

UserSchema.static('findByEmailName', async function findByEmailName(email, name) {
    const User = this
    return User.findOne({$or: [{email: email}, {name: name}]});
});

export const User = model<IUser, UserModel>('User', UserSchema)