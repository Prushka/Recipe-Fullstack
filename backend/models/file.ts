import {Document, model, Schema} from "mongoose";


export interface IFile extends Document {
    name: string
    author: string
    contentType: string
    data: any
}

const FileSchema = new Schema<IFile>({
    name: String,
    author: String,
    contentType: String,
    data: Buffer
});


export const File = model<IFile>('File', FileSchema)