import express, { Request, Response } from 'express';
import * as bodyParser from "body-parser";
import {UserModel} from "./models/recipe";

const app = express()
app.use(bodyParser.json())

app.get('/', async (req: Request, res: Response) => {
    const user = new UserModel({
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    })
    await user.save()
    res.send(await UserModel.find())
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
