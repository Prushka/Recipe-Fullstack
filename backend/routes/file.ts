/*
 * Copyright 2022 Dan Lyu
 */

import express from "express";
import {adminRoute, genericErrorChecker, publicRoute, userRoute} from "./route";
import * as fs from "fs";
import {GridFsStorage} from "multer-gridfs-storage";
import {MONGO_URI} from "../db/mongoose";
import multer from "multer";
import mongoose from "mongoose";
import {EndpointError, throwError} from "../errors/errors";
import {getImageURLFromFilename, requireObjectIdFromPara} from "../utils/util";

export const fileRouter = express.Router()
const storage = new GridFsStorage({
    url: MONGO_URI
});

const upload = multer({storage})

const connect = mongoose.createConnection(MONGO_URI);

let gfs: any;

connect.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "fs"
    });
});

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml']

const requireNonEmptyFiles = (files: any) => {
    if (!files[0] || files.length === 0) {
        throwError(EndpointError.FileNotFound)
    }
}

fileRouter.post("/", userRoute(async (req, res) => {
    upload.single('file')(req, res, () => {
        const file = req.file
        if (!file) {
            res.status(400).send("File not found in form data")
        } else {
            res.send(file)
        }
    })
}))

fileRouter.get("/image/:id", publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    gfs.find({_id: id}).toArray((err: any, files: any) => {
        try {
            requireNonEmptyFiles(files)
            if (IMAGE_TYPES.includes(files[0].contentType)) {
                gfs.openDownloadStream(id).pipe(res);
            } else {
                throwError(EndpointError.NotImageFile)
            }
        } catch (e) {
            genericErrorChecker(res, e)
        }
    });
}))

fileRouter.get("/:id", publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    gfs.find({_id: id}).toArray((err: any, files: any) => {
        try {
            requireNonEmptyFiles(files)
            gfs.openDownloadStream(id).pipe(res)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    });
}))

fileRouter.get("/info/:id", publicRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    gfs.find({_id: id}).toArray((err: any, files: any) => {
        try {
            requireNonEmptyFiles(files)
            res.send(files[0])
        } catch (e) {
            genericErrorChecker(res, e)
        }
    });
}))

fileRouter.get("/", adminRoute(async (req, res) => {
    gfs.find().toArray((err: any, files: any) => {
        try {
            requireNonEmptyFiles(files)
            const filesOut = files.map((file: any) => {
                if (IMAGE_TYPES.includes(file.contentType)) {
                    return {...file, url: getImageURLFromFilename(file._id)}
                }
                return file
            })
            res.send(filesOut);
        } catch (e) {
            genericErrorChecker(res, e)
        }
    });
}))

fileRouter.delete('/:id', adminRoute(async (req, res) => {
    const id = requireObjectIdFromPara(req)
    gfs.delete(id, (err: any, file: any) => {
        if (err) {
            return res.status(404).json({message: err.message})
        }
        res.send("deleted");
    });
}))