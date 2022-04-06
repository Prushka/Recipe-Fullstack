/*
 * Copyright 2022 Dan Lyu
 */


import {getAllEnums} from "../utils/util";
import express from "express";
import {genericErrorChecker, publicRoute} from "./route";
import {EndpointError, throwError} from "../errors/errors";
import {RecipeCategories, RecipeDiets} from "../models/recipe";
import {app} from "../server";
import {PERMISSION_DESCRIPTION, REST_ICONS} from "../business-schemas";

export const constantRoute = express.Router()

constantRoute.get("/recipe/categories", publicRoute(async (req, res) => {
    res.send(getAllEnums(RecipeCategories))
}, {description: "Get all available recipe categories"}))

constantRoute.get("/recipe/diets", publicRoute(async (req, res) => {
    res.send(getAllEnums(RecipeDiets))
}, {description: "Get all available recipe diets"}))

constantRoute.get("/routes", publicRoute(async (req, res) => {
    let routes: any[] = []
    app._router.stack.forEach((middleware: any) => {
        // The way to interact with express routes was from here https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express
        // The rest is original
        let regexp = middleware.regexp.toString();
        regexp = regexp.slice(3);
        const index = regexp.indexOf('/?(');
        regexp = regexp.slice(0, index - 1);

        if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler: any) => {
                let route = handler.route;
                if (route) {
                    const methods = []
                    for (let method in route.methods) {
                        if (route.methods[method]) {
                            methods.push(method)
                        }
                    }
                    let _route = {
                        child: route.path, parent: regexp,
                        methods: methods, fullPath: regexp + route.path
                    }
                    if (route.stack && route.stack.length > 0 && route.stack[0].handle && route.stack[0].handle.spec) {
                        const spec = route.stack[0].handle.spec
                        _route = {..._route, ...spec}
                    }
                    routes.push(_route)
                }
            });
        }
    });


    const jsonHeader = "```json"
    const jsonFooter = "```"
    const backtick = "`"

    const md: { [key: string]: string[] } = {}

    const fakeResponse = () => {
        const s = {
            status: (code: number) => {
                s.code = code
                return s
            },
            send: (message: string) => {
                s.message = message
                return s
            },
            message: "",
            code: -1
        }
        return s
    }

    routes.forEach(route => {
        if (!Object.keys(md).includes(route.parent)) {
            md[route.parent] = []
        }
        let icon: string = ""
        let description: string = ""
        let method: string = ""
        let requestBody: string = ""
        let params: string = ""
        let formData: string = ""
        let returns: string = ""
        const errors: Set<EndpointError> = route.possibleErros
        const possibleErrors = (Array.from(errors).map((error: EndpointError) => {
            const response = fakeResponse()
            try {
                throwError(error)
            } catch (e) {
                genericErrorChecker(response, e)
            }
            return `${backtick}${error}(${response.code})${backtick}`
        })).join(' ')

        const permissionLevel = PERMISSION_DESCRIPTION[route.permission]
        if (route.methods && route.methods.length > 0) {
            method = route.methods[0].toUpperCase()
            icon = REST_ICONS[method] ?? ""
        }
        if (route.description) {
            description = `**Description**: ${route.description}`
        }

        if (route.requestBody) {
            requestBody = `**Request Body**\n${jsonHeader}\n${JSON.stringify(route.requestBody, null, 2)}\n${jsonFooter}`
        }

        if (route.paramMapping) {
            params = `**Path Parameters**\n${jsonHeader}\n${JSON.stringify(route.paramMapping, null, 2)}\n${jsonFooter}`
        }

        if (route.formData) {
            formData = `**Form-Data**\n${jsonHeader}\n${JSON.stringify(route.formData, null, 2)}\n${jsonFooter}`
        }

        if (route.returns) {
            returns = `**Returns** ${route.returnsArray ? 'an array of' : ''}: ${route.returns}`
        }
        // const table = `<table><tr><td>Permission Level</td><td>${permissionLevel}</td></tr><tr><td>Possible Errors</td><td>${possibleErrors ? possibleErrors : "None"}</td></tr></table>`
        const table = `|Permission Level|${permissionLevel}|\n|-|-|\n|Possible Errors|${possibleErrors ? possibleErrors : "None"}|`
        const routeContent = `### ${icon} ${method}&nbsp; ${route.fullPath}\n${description}\n\n${returns}\n\n${table}\n\n${requestBody}\n\n${params}\n\n${formData}\n---\n\n`
        md[route.parent].push(routeContent)
    })

    const result = []
    let totalRoutes = 0
    for (let router in md) {
        const header = `# Router: ${router}\n`
        totalRoutes += md[router].length
        result.push(header, md[router].join(''))
    }

    res.send(result.join(''))
}, {description: "Get all routes in json format"}))