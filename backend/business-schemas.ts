/*
 * Copyright 2022 Dan Lyu
 */

import {Role} from "./models/user";

export const REST_ICONS: { [key: string]: string } = {
    GET: "&#x1F4D7;",
    POST: ":heavy_plus_sign:",
    PATCH: "&#x1F4D9;",
    DELETE: ":heavy_minus_sign:"
}

export const PERMISSION_DESCRIPTION: { [key: string]: string } = {
    "-1": "Public Route",
    "0": "Require logged-in user",
    "1": "Require logged-in admin"
}

export const EFFECTIVE_WHEN_DESCRIPTION: { [key: string]: string } = {
    "-1": "Always effective",
    "0": "User is logged in",
    "1": "User is admin"
}

interface APISchemaField {
    type: 'string' | 'integer' | 'boolean' | 'array of ObjectIds' | 'file' | 'array of String' | 'ObjectId'
    description?: string
    required?: boolean
    effectiveWhen?: Role | string
    default?: string
}

export type BusinessSchema = { [key: string]: APISchemaField }

export const UserLoginIn: BusinessSchema = {
    input: {
        type: 'string',
        description: 'Username Or Email',
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
}

export const UserRegister: BusinessSchema = {
    email: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    password: {
        type: 'string',
        required: true,
        description: 'Should be at least 3 characters long'
    }
}

export const VoteReview: BusinessSchema = {
    positivity: {
        type: 'integer',
        default: "0"
    }
}

export const UpdateReview: BusinessSchema = {
    content: {
        type: 'string'
    },
    rating: {
        type: 'integer',
        description: 'Can only be -1, 0 or 1'
    },
    approved: {
        type: 'boolean',
        effectiveWhen: Role.ADMIN
    },
    inappropriateReportUsers: {
        type: "array of ObjectIds",
        effectiveWhen: Role.ADMIN
    }
}

export const PostReview: BusinessSchema = {
    ...UpdateReview,
}

export const PostRecipe: BusinessSchema = {
    title: {
        type: "string",
        required: true
    },
    category: {
        type: "string"
    },
    diet: {
        type: "string"
    },
    instructions: {
        type: "string"
    },
    thumbnail: {
        type: "string"
    },
    "approved": {
        type: 'boolean',
        effectiveWhen: Role.ADMIN
    },
    "tags": {
        type: "array of String"
    },
    "ingredients": {
        type: "array of String"
    }
}

export const UpdateRecipe: BusinessSchema = {
    ...PostRecipe,
    title: {
        type: "string",
        required: false
    }
}

export function mapIdToDescription(description: string) {
    const field: APISchemaField = {
        type: 'string',
        description: description,
        required: true
    }
    return {id: field}
}

export const UserObjectId = mapIdToDescription("User ObjectId")
export const ReviewObjectId = mapIdToDescription("Review ObjectId")
export const RecipeObjectId = mapIdToDescription("Recipe ObjectId")
export const FileObjectId = mapIdToDescription("File ObjectId")

// It takes too much time to describe all output schemas again...
export const FileInfoOutput = "Standard GridFS json with filename, content_type, _id, url, etc."
export const FileDownloadOutput = "Downloads/Loads the file"

export const RecipeOutput = "Recipe data with all reviews of this recipe, every review contains user votes and reports"

export const UserOutput = "User data with user's followers, following users, saved recipe ids (exclude password)"
export const PublicUserOutput = "User data with user's followers, following users, saved recipe ids (exclude password, email)"

export const ReviewOutput = "Review data with review's author, rating, comment, also contains votes and reports this review's got"