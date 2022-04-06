/*
 * Copyright 2022 Dan Lyu
 */

import {Role, SessionUser} from "../models/user";
import {Request, Response} from "express";
import {EndpointError, throwError} from "../errors/errors";
import {getAllEnums} from "../utils/util";
import {RecipeCategories, RecipeDiets} from "../models/recipe";
import {BusinessSchema, EFFECTIVE_WHEN_DESCRIPTION} from "../business-schemas";

function constructResponseErrorBody(e: EndpointError | string, message: string, extra = {}) {
    return {
        error: e,
        message: message,
        ...extra
    }
}

export function genericErrorChecker(res: Response | any, e: any) {
    const errorHandler = (code: number, message: string, extra = {}) => {
        res.status(code).send(constructResponseErrorBody(e.name, message, extra))
    }
    if (e instanceof Error) {
        const name = e.name
        switch (name) {
            case "ValidationError":
                errorHandler(400, e.message)
                break
            case EndpointError.FakeValidationError:
                errorHandler(400, "Custom message from mongoose validation")
                break
            case EndpointError.UserNotLoggedIn:
                errorHandler(401, "Unauthorized (User not logged in)")
                break
            case EndpointError.NoPermission:
                errorHandler(401, "Permission Denied")
                break
            case EndpointError.InvalidObjectId:
                errorHandler(400, "Invalid Object Id")
                break
            case EndpointError.UserNotFound:
                errorHandler(404, "Required user cannot be found")
                break
            case EndpointError.RecipeNotFound:
                errorHandler(404, "Required recipe cannot be found")
                break
            case EndpointError.ReviewNotFound:
                errorHandler(404, "Required review cannot be found")
                break
            case EndpointError.InvalidAuth:
                errorHandler(400, "Invalid Email/Password combination")
                break
            case EndpointError.UsernameExists:
                errorHandler(400, "Username exists (Please choose a different one)")
                break
            case EndpointError.EmailExists:
                errorHandler(400, "Email exists (Please choose a different one)")
                break
            case EndpointError.UsernameEmailExists:
                errorHandler(400, "Username or email exists (Please choose a different one)")
                break
            case EndpointError.FollowMyself:
                errorHandler(400, "You cannot follow yourself")
                break
            case EndpointError.FileNotFound:
                errorHandler(404, "File not found")
                break
            case EndpointError.NotImageFile:
                errorHandler(400, "File is not an image")
                break
            case EndpointError.InvalidCategory:
                errorHandler(400, `Category is invalid`, {"categories": getAllEnums(RecipeCategories)})
                break
            case EndpointError.InvalidDiet:
                errorHandler(400, `Diet is invalid`, {"diets": getAllEnums(RecipeDiets)})
                break
            case EndpointError.NoInputFile:
                errorHandler(400, "Input file is missing in form data (should have key: 'file')")
                break
            default:
                console.log(e)
                res.status(500).send("Internal Server Error")
                break
        }
    } else {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

export interface APISpec {
    description: string
    returns?: string
    returnsArray?: boolean
    possibleErrors?: EndpointError[]
    requestBody?: BusinessSchema
    paramMapping?: BusinessSchema
    formData?: BusinessSchema
    outputSchema?: BusinessSchema
}

function generateFullSchema(schema: BusinessSchema | undefined): BusinessSchema | undefined {
    if (schema) {
        for (let schemaKey in schema) {
            if (!schema[schemaKey].required) {
                schema[schemaKey].required = false
            }
            if (schema[schemaKey].effectiveWhen && EFFECTIVE_WHEN_DESCRIPTION[`${schema[schemaKey].effectiveWhen}`]) {
                schema[schemaKey].effectiveWhen = EFFECTIVE_WHEN_DESCRIPTION[`${schema[schemaKey].effectiveWhen}`]
            }
        }
    }
    return schema
}

function generateFullSpec(fullSpec: any, spec: APISpec) {
    fullSpec.possibleErros = new Set<EndpointError>()
    if (spec.possibleErrors) {
        spec.possibleErrors.forEach(e => {
            fullSpec.possibleErros.add(e)
        })
    }
    fullSpec.description = spec.description
    fullSpec.returns = spec.returns
    fullSpec.returnsArray = spec.returnsArray
    fullSpec.requestBody = generateFullSchema(spec.requestBody)
    fullSpec.paramMapping = generateFullSchema(spec.paramMapping)
    fullSpec.formData = generateFullSchema(spec.formData)
    fullSpec.outputSchema = generateFullSchema(spec.outputSchema)
    if (fullSpec.permission > Role.Guest) {
        fullSpec.possibleErros.add(EndpointError.UserNotLoggedIn)
    }
    if (fullSpec.permission > Role.USER) {
        fullSpec.possibleErros.add(EndpointError.NoPermission)
    }
    if (spec.paramMapping) {
        fullSpec.possibleErros.add(EndpointError.InvalidObjectId)
    }
    return fullSpec
}

export function publicRoute(f: (req: Request, res: Response) => void, spec: APISpec) {
    const _route = async (req: Request, res: Response) => {
        try {
            await f(req, res)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
    _route.spec = generateFullSpec({permission: Role.Guest}, spec)
    return _route
}


export function userRoute(f: (req: Request, res: Response, sessionUser: SessionUser) => void, spec: APISpec, minRole: Role = Role.USER) {
    const _route = async (req: Request, res: Response) => {
        try {
            const user = req.session.user
            if (!user) {
                throwError(EndpointError.UserNotLoggedIn)
            }
            if (user!.role < (minRole ?? Role.USER)) {
                throwError(EndpointError.NoPermission)
            }
            await f(req, res, user!)
        } catch (e) {
            genericErrorChecker(res, e)
        }
    }
    _route.spec = generateFullSpec({permission: minRole}, spec)
    return _route
}


export function adminRoute(f: (req: Request, res: Response, sessionUser: SessionUser) => void, spec: APISpec) {
    return userRoute(f, spec, Role.ADMIN)
}