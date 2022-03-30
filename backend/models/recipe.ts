import {Schema, model} from 'mongoose';
import validator from "validator";
import {genSalt, hash} from "bcryptjs";
interface User {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

const UserSchema = new Schema<User>({
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
    }
});

UserSchema.pre('save', function(next) {
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

export const UserModel = model<User>('User', UserSchema)
