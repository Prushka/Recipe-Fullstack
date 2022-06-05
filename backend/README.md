# Getting started
#### Deployed URL: ~~[https://express.csc309.muddy.ca](https://express.csc309.muddy.ca)~~
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

# Disclaimer
**Note that the generation of following routes doesn't rely on additional libraries and is original.**

**I've included route, method, path parameters, request body, form data and error types.**

# Router: /review
### :heavy_minus_sign: DELETE&nbsp; /review/report/:id
**Description**: Delete a review's report by review id (Effective only when logged-in-user is the author who reported this review)

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /review/report/:id
**Description**: Report a review as inappropriate by review id

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /review/vote/:id
**Description**: Upvote or downvote a review (upsert action)

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|

**Request Body**
```json
{
  "positivity": {
    "type": "integer",
    "default": "0",
    "required": false
  }
}
```

**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### :heavy_minus_sign: DELETE&nbsp; /review/:id
**Description**: Delete a review by review id

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`NoPermission(401)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D9; PATCH&nbsp; /review/:id
**Description**: Update a review by review id

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|

**Request Body**
```json
{
  "content": {
    "type": "string",
    "required": false
  },
  "rating": {
    "type": "integer",
    "description": "Can only be -1, 0 or 1",
    "required": false
  },
  "approved": {
    "type": "boolean",
    "effectiveWhen": "User is admin",
    "required": false
  },
  "inappropriateReportUsers": {
    "type": "array of ObjectIds",
    "effectiveWhen": "User is admin",
    "required": false
  }
}
```

**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /review/:id
**Description**: Post or Update a review on recipe by recipe id (upsert action)

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `RecipeNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|

**Request Body**
```json
{
  "content": {
    "type": "string",
    "required": false
  },
  "rating": {
    "type": "integer",
    "description": "Can only be -1, 0 or 1",
    "required": false
  },
  "approved": {
    "type": "boolean",
    "effectiveWhen": "User is admin",
    "required": false
  },
  "inappropriateReportUsers": {
    "type": "array of ObjectIds",
    "effectiveWhen": "User is admin",
    "required": false
  }
}
```

**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /review/admin/all
**Description**: Get all reviews

**Returns** an array of: Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in admin|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)` `NoPermission(401)`|






---

### &#x1F4D7; GET&nbsp; /review/
**Description**: Get logged-in-user's reviews

**Returns** an array of: Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### &#x1F4D7; GET&nbsp; /review/:id
**Description**: Get review by review id

**Returns** : Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Public Route|
|-|-|
|Possible Errors|`ReviewNotFound(404)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Review ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /review/recipe/:id
**Description**: Get all reviews on recipe by recipe id

**Returns** an array of: Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Public Route|
|-|-|
|Possible Errors|`InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /review/user/:id
**Description**: Get all reviews a user has posted by user id

**Returns** an array of: Review data with review's author, rating, comment, also contains votes and reports this review's got

|Permission Level|Public Route|
|-|-|
|Possible Errors|`InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

# Router: /user
### :heavy_plus_sign: POST&nbsp; /user/follow/:id
**Description**: Follow user by user id

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### :heavy_minus_sign: DELETE&nbsp; /user/follow/:id
**Description**: Unfollow user by user id

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### :heavy_minus_sign: DELETE&nbsp; /user/
**Description**: Delete my account and logout

**Returns** : Deleted

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### :heavy_minus_sign: DELETE&nbsp; /user/:id
**Description**: Delete user by user id

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in admin|
|-|-|
|Possible Errors|`UserNotFound(404)` `UserNotLoggedIn(401)` `NoPermission(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /user/:id
**Description**: Get user public information by user id

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password, email)

|Permission Level|Public Route|
|-|-|
|Possible Errors|`UserNotFound(404)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /user/
**Description**: Get my (the logged in user's) latest user information

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### &#x1F4D7; GET&nbsp; /user/admin/all
**Description**: Get all users

**Returns** an array of: User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in admin|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)` `NoPermission(401)`|






---

### &#x1F4D9; PATCH&nbsp; /user/:id
**Description**: Update user information by user id (can be used by both admin to update any user OR user to update their own information)

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotFound(404)` `NoPermission(401)` `UsernameExists(400)` `EmailExists(400)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /user/logout
**Description**: Logout



|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### :heavy_plus_sign: POST&nbsp; /user/login
**Description**: Login using [email OR username] and [password]

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Public Route|
|-|-|
|Possible Errors|`InvalidAuth(400)`|

**Request Body**
```json
{
  "input": {
    "type": "string",
    "description": "Username Or Email",
    "required": true
  },
  "password": {
    "type": "string",
    "required": true
  }
}
```




---

### :heavy_plus_sign: POST&nbsp; /user/register
**Description**: Register

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Public Route|
|-|-|
|Possible Errors|`UsernameEmailExists(400)` `FakeValidationError(400)`|

**Request Body**
```json
{
  "email": {
    "type": "string",
    "required": true
  },
  "name": {
    "type": "string",
    "required": true
  },
  "password": {
    "type": "string",
    "required": true,
    "description": "Should be at least 3 characters long"
  }
}
```




---

# Router: /recipe
### :heavy_minus_sign: DELETE&nbsp; /recipe/:id
**Description**: Delete recipe by recipe id

**Returns** : Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`RecipeNotFound(404)` `NoPermission(401)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D9; PATCH&nbsp; /recipe/:id
**Description**: Update recipe by recipe id

**Returns** : Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`RecipeNotFound(404)` `NoPermission(401)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|

**Request Body**
```json
{
  "title": {
    "type": "string",
    "required": false
  },
  "category": {
    "type": "string",
    "required": false
  },
  "diet": {
    "type": "string",
    "required": false
  },
  "instructions": {
    "type": "string",
    "required": false
  },
  "thumbnail": {
    "type": "string",
    "required": false
  },
  "approved": {
    "type": "boolean",
    "effectiveWhen": "User is admin",
    "required": false
  },
  "tags": {
    "type": "array of String",
    "required": false
  },
  "ingredients": {
    "type": "array of String",
    "required": false
  }
}
```

**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /recipe/save/:id
**Description**: Save a recipe (by recipe id) as favorite

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`RecipeNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### :heavy_minus_sign: DELETE&nbsp; /recipe/save/:id
**Description**: Remove a favorite recipe from saved recipes by recipe id

**Returns** : User data with user's followers, following users, saved recipe ids (exclude password)

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`RecipeNotFound(404)` `UserNotLoggedIn(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### :heavy_plus_sign: POST&nbsp; /recipe/
**Description**: Create a recipe

**Returns** : Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`InvalidCategory(400)` `InvalidDiet(400)` `UserNotLoggedIn(401)`|

**Request Body**
```json
{
  "title": {
    "type": "string",
    "required": true
  },
  "category": {
    "type": "string",
    "required": false
  },
  "diet": {
    "type": "string",
    "required": false
  },
  "instructions": {
    "type": "string",
    "required": false
  },
  "thumbnail": {
    "type": "string",
    "required": false
  },
  "approved": {
    "type": "boolean",
    "effectiveWhen": "User is admin",
    "required": false
  },
  "tags": {
    "type": "array of String",
    "required": false
  },
  "ingredients": {
    "type": "array of String",
    "required": false
  }
}
```




---

### &#x1F4D7; GET&nbsp; /recipe/me
**Description**: Get all recipes created by the logged-in-user

**Returns** an array of: Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### &#x1F4D7; GET&nbsp; /recipe/public
**Description**: Get all recipes with approved === true

**Returns** an array of: Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Public Route|
|-|-|
|Possible Errors|None|






---

### &#x1F4D7; GET&nbsp; /recipe/saved
**Description**: Get logged-in-user's saved (favorite) recipes

**Returns** an array of: Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)`|






---

### &#x1F4D7; GET&nbsp; /recipe/:id
**Description**: Get recipe data by recipe id

**Returns** : Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Public Route|
|-|-|
|Possible Errors|`InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "Recipe ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /recipe/author/:id
**Description**: Get all recipes created by user

**Returns** an array of: Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Public Route|
|-|-|
|Possible Errors|`InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "User ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /recipe/
**Description**: Get all recipes regardless of approved or not

**Returns** an array of: Recipe data with all reviews of this recipe, every review contains user votes and reports

|Permission Level|Public Route|
|-|-|
|Possible Errors|None|






---

# Router: /file
### :heavy_plus_sign: POST&nbsp; /file/
**Description**: Upload file using form-data (GridFS implementation)

**Returns** : Standard GridFS json with filename, content_type, _id, url, etc.

|Permission Level|Require logged-in user|
|-|-|
|Possible Errors|`NoInputFile(400)` `UserNotLoggedIn(401)`|





**Form-Data**
```json
{
  "file": {
    "type": "file",
    "required": true
  }
}
```
---

### &#x1F4D7; GET&nbsp; /file/:id
**Description**: Get/Download file by file id

**Returns** : Downloads/Loads the file

|Permission Level|Public Route|
|-|-|
|Possible Errors|`FileNotFound(404)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "File ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /file/info/:id
**Description**: Get file information by file id

**Returns** : Standard GridFS json with filename, content_type, _id, url, etc.

|Permission Level|Public Route|
|-|-|
|Possible Errors|`FileNotFound(404)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "File ObjectId",
    "required": true
  }
}
```


---

### &#x1F4D7; GET&nbsp; /file/
**Description**: Get all files' information

**Returns** an array of: Standard GridFS json with filename, content_type, _id, url, etc.

|Permission Level|Require logged-in admin|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)` `NoPermission(401)`|






---

### :heavy_minus_sign: DELETE&nbsp; /file/:id
**Description**: Delete file by file id

**Returns** : Standard GridFS json with filename, content_type, _id, url, etc.

|Permission Level|Require logged-in admin|
|-|-|
|Possible Errors|`UserNotLoggedIn(401)` `NoPermission(401)` `InvalidObjectId(400)`|



**Path Parameters**
```json
{
  "id": {
    "type": "string",
    "description": "File ObjectId",
    "required": true
  }
}
```


---

# Router: /constant
### &#x1F4D7; GET&nbsp; /constant/recipe/categories
**Description**: Get all available recipe categories



|Permission Level|Public Route|
|-|-|
|Possible Errors|None|






---

### &#x1F4D7; GET&nbsp; /constant/recipe/diets
**Description**: Get all available recipe diets



|Permission Level|Public Route|
|-|-|
|Possible Errors|None|






---

### &#x1F4D7; GET&nbsp; /constant/routes
**Description**: Get all routes in json format



|Permission Level|Public Route|
|-|-|
|Possible Errors|None|






---

