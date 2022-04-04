/*
 * Copyright 2022 Dan Lyu
 */

import express from "express";
import {userRoute} from "./route";
import * as fs from "fs";
import {GridFsStorage} from "multer-gridfs-storage";
import {connectionString} from "../db/mongoose";
import multer from "multer";

export const fileRouter = express.Router()
const storage = new GridFsStorage({
    url: connectionString
});

const upload = multer({storage})

fileRouter.post("/", userRoute(async (req, res) => {
    upload.single('file')(req, res, ()=>{
        const file = req.file
        if (!file) {
            res.status(400).send("File not found")
        }
        res.send(file)
    })
}))

fileRouter.get("/:id", userRoute(async(req, res) => {

}))