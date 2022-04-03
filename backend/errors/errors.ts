export enum EndpointError {
    UserNotLoggedIn = "UserNotLoggedIn",
    InvalidObjectId = "InvalidObjectId",
    NoPermission = "NoPermission",
    UserNotFound = "UserNotFound",
    RecipeNotFound = "RecipeNotFound",
    ReviewNotFound = "ReviewNotFound"
}

export function throwError(name: EndpointError) {
    const e = new Error(name)
    e.name = name
    throw e
}