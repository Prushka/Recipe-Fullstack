import express, { Request, Response } from 'express';
import * as bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('test');
});

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
