

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

## DB init

4 users will be created if they don't exist:

```js
"admin@admin.com", "admin", "admin", Role.ADMIN
"user@example.com", "user", "user", Role.USER
"user1@example.com", "user1", "user1", Role.USER
"user2@example.com", "user2", "user2", Role.USER
```

# Routes

Note you can access all routes in `/postman/CSC309 - Recipe.postman_collection.json`

1. Import the above file into postman
2. Set environment variables `host` (e.g., `express.csc309.muddy.ca`) and `port` (e.g., `80`)

There are a few routes that require extra instructions:

1. `/file/upload` This route accepts a file in form-data with key `file` and returns the GridFS json. 
It's required to store any file uploaded to this route using the property `storeWith`. 
* For instance, after uploading a file, return format can be: 
```json
{
    "fieldname": "file",
    "originalname": "2(3).png",
    "encoding": "7bit",
    "mimetype": "image/png",
    "id": "624ce45ffe32ba5548849c0d",
    "filename": "68c8de1168b55dc06b7e79c6f49a5da4",
    "metadata": null,
    "bucketName": "fs",
    "chunkSize": 261120,
    "size": 43405,
    "uploadDate": "2022-04-06T00:52:47.241Z",
    "contentType": "image/png",
    "storeWith": "624ce45ffe32ba5548849c0d.png"
}
```
* You should store `624ce45ffe32ba5548849c0d.png` as thumbnail or avatar
* This file string will be stored as is. However, on return, this field will become `BASE_URL/file/624ce45ffe32ba5548849c0d.png`
* You'll be able to access that file from the previous link (e.g., [https://express.csc309.muddy.ca/file/624cd3a0fe32ba5548849b86.jpeg](https://express.csc309.muddy.ca/file/624cd3a0fe32ba5548849b86.jpeg)).

## Error Handling

Note the following applies to every route:
1. All authorization and authentication errors are handled (returns 401 on error) (see below for every route's permission level)
2. If any resource cannot be found, a 404 will be returned
3. If any request is malformed in any way, a 400 will be returned

For all errors returned, they shared the same structure. **For example**:
* ```json
  {
  "error": "UserNotLoggedIn",
  "message": "Unauthorized (User not logged in)"
  }
  ```
* ```json
  {
  "error": "RecipeNotFound",
  "message": "Required recipe cannot be found"
  }
  ```
* ```json
  {
  "error": "NoPermission",
  "message": "Permission Denied"
  }
  ```

Errors can be found in `errors/error.ts`