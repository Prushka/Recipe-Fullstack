import express, {Request, Response} from 'express';
import * as bodyParser from "body-parser";
import {UserModel} from "./models/recipe";
import connectMongo from "./db/mongoose";

connectMongo().catch(err => console.log(err))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

function isValidationError(error: Error) {
    return error.name === "ValidationError"
}

app.get('/', async (req: Request, res: Response) => {
});

app.post('/user', async (req: Request, res: Response) => {
    try {
        let user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            avatar: req.body.avatar,
            password: req.body.password
        })
        user = await user.save()
        res.send(user)
    } catch (e) {
        if (e instanceof Error && isValidationError(e)) {
            res.status(400).send(e.message)
        }
    }
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
