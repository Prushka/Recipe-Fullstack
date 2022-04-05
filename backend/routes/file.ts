/*
 * Copyright 2022 Dan Lyu
 */

import express from "express";
import {adminRoute, genericErrorChecker, publicRoute, userRoute} from "./route";
import * as fs from "fs";
import {GridFsStorage} from "multer-gridfs-storage";
import {connectionString} from "../db/mongoose";
import multer from "multer";
import mongoose from "mongoose";
import {EndpointError, throwError} from "../errors/errors";

export const fileRouter = express.Router()
const storage = new GridFsStorage({
    url: connectionString
});

const upload = multer({storage})

const connect = mongoose.createConnection(connectionString);

let gfs: any;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "fs"
    });
});

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml']

fileRouter.post("/", userRoute(async (req, res) => {
    upload.single('file')(req, res, () => {
        const file = req.file
        if (!file) {
            res.status(400).send("File not found")
        } else {
            res.send(file)
        }
    })
}))

fileRouter.get("/image/:filename", publicRoute(async (req, res) => {
    gfs.find({filename: req.params.filename}).toArray((err: any, files: any) => {
        try {
            if (!files[0] || files.length === 0) {
                throwError(EndpointError.FileNotFound)
            }
            if (IMAGE_TYPES.includes(files[0].contentType)) {
                gfs.openDownloadStreamByName(req.params.filename).pipe(res);
            } else {
                throwError(EndpointError.NotImageFile)
            }
        } catch (e) {
            genericErrorChecker(res, e)
        }
    });
}))

fileRouter.get("/", adminRoute(async (req, res) => {
    const connection = mongoose.connection.db
    const files = connection.collection('fs.files')
    files.find({}).toArray((err, data) => {
        res.send(data)
    })
}))

fileRouter.get("/chunk", adminRoute(async (req, res) => {
    const connection = mongoose.connection.db
    const chunks = connection.collection('fs.chunks')
    chunks.find({}).toArray((err, data) => {
        res.send(data)
    })
}))