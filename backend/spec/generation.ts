/*
 * Copyright 2022 Dan Lyu
 */


import {app} from "../server";

export function getAllRoutes() {
    let route, routes:any[] = [];
    const paths:any[] = []

    app._router.stack.forEach(function(middleware:any){
        if(middleware.route){ // routes registered directly on the app
            routes.push(middleware.route);
        } else if(middleware.name === 'router'){ // router middleware
            middleware.handle.stack.forEach(function(handler:any){
                route = handler.route;
                if(route){
                    console.log(middleware.path)
                    routes.push(route)
                }
            });
        }
    });

    console.log(paths)

    return ""
}