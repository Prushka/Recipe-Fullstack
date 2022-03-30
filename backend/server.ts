import express, {Request, Response} from 'express';
import * as bodyParser from "body-parser";
import {User} from "./models/recipe";
import connectMongo from "./db/mongoose";

connectMongo().catch(err => console.log(err))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

function isValidationError(error: Error) {
    return error.name === "ValidationError"
}

function serverError(res: Response) {
    res.status(500).send("Internal Server Error")
}

app.get('/', async (req: Request, res: Response) => {
});

app.post('/user', async (req: Request, res: Response) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const preUser = await User.findByEmailName(email, name)
    if(preUser){
        res.status(400).send("User exists (same email or same name)")
        return
    }
    try {
        let user = new User({
            name: req.body.name,
            email: email,
            avatar: req.body.avatar,
            password: password
        })
        user = await user.save()
        res.send(user)
    } catch (e) {
        if (e instanceof Error && isValidationError(e)) {
            res.status(400).send(e.message)
        } else {
            serverError(res)
        }
    }
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
