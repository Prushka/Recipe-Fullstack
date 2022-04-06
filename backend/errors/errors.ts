export enum EndpointError {
    UserNotLoggedIn = "UserNotLoggedIn",
    InvalidObjectId = "InvalidObjectId",
    NoPermission = "NoPermission",
    UserNotFound = "UserNotFound",
    RecipeNotFound = "RecipeNotFound",
    ReviewNotFound = "ReviewNotFound",
    InvalidAuth = "InvalidAuth",
    UsernameEmailExists = "UsernameEmailExists",
    UsernameExists = "UsernameExists",
    EmailExists = "EmailExists",
    FollowMyself = "FollowMyself",
    FileNotFound = "FileNotFound",
    NotImageFile = "NotImageFile",
    InvalidCategory = "InvalidCategory",
    InvalidDiet = "InvalidDiet",
    FakeValidationError = "FakeValidationError",
    NoInputFile = "NoInputFile"
}

export function throwError(name: EndpointError) {
    const e = new Error(name)
    e.name = name
    throw e
}