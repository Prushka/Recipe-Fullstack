export enum EndpointError {
    UserNotLoggedIn = "UserNotLoggedIn",
    InvalidObjectId = "InvalidObjectId",
    NoPermission = "NoPermission",
    UserNotFound = "UserNotFound",
    RecipeNotFound = "RecipeNotFound",
    ReviewNotFound = "ReviewNotFound",
    InvalidAuth = "InvalidAuth"
}

export function throwError(name: EndpointError) {
    const e = new Error(name)
    e.name = name
    throw e
}