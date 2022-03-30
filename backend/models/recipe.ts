import {Schema, model, Model} from 'mongoose';
import validator from "validator";
import {genSalt, hash, compare} from "bcryptjs";

interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
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
    }
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
    const user = await User.findOne({email: email})
    if(user){
        compare(password, user.password, (err, result) => {
            if (result) {
                return user
            }
        })
    }
    return
});

UserSchema.static('findByEmailName', async function findByEmailName(email, name) {
    const User = this
    return User.findOne({email: email, name: name});
});

export const User = model<IUser, UserModel>('User', UserSchema)