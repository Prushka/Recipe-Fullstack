

# Getting started
#### Deployed URL: [https://express.csc309.muddy.ca](https://express.csc309.muddy.ca)
## Running the backend

Please run `npm install` first

A mongodb is required. I used a mongodb container (see `docker-compose.yml`). Feel free to deploy it with atlas or with any local way.

* `npm run dev`: This command monitors all ts files, compiles them and restarts the backend on changes

* `npm run start`: This command starts the backend server

## Environment variables
| Name            | Description                                                          | Default Value                       |
|-----------------|----------------------------------------------------------------------|-------------------------------------|
| PORT            | Backend port                                                         | 8000                                |
| MONGODB_URI     | Standard MongoDB connection string                                   | mongodb://localhost:27017/RecipeAPI |
| BASE_URL        | Backend base url (will be used to return formatted GridFS files url) | http://localhost:8000               |
| ALLOWED_ORIGINS | CORS argument                                                        | http://localhost:3000               |


# Routes

Note you can access all routes in `/postman/CSC309 - Recipe.postman_collection.json`

1. Import the above file into postman
2. Set environment variables `host` (e.g., `express.csc309.muddy.ca`) and `port` (e.g., `80`)

## Error Handling

Note the following applies to every route:
1. All authorization and authentication errors are handled (returns 401 on error) (see below for every route's permission level)
2. If any resource cannot be found, a 404 will be returned
3. If any request is malformed in any way, a 400 will be returned

For all errors returned, they shared the same structure. For example:
* `{
  "error": "UserNotLoggedIn",
  "message": "Unauthorized (User not logged in)"
  }`
* `{
  "error": "RecipeNotFound",
  "message": "Required recipe cannot be found"
  }`
* `{
  "error": "NoPermission",
  "message": "Permission Denied"
  }`

Errors can be found in `errors/error.ts`