# Getting started
#### Deployed URL: [https://recipe.muddy.ca](https://recipe.muddy.ca)
## Running the frontend

Please run `npm install` first

* `npm run start` to start your development app

The frontend depends on a backend.

Set the backend url in `/src/axios/Axios.js`: 
```js
const BASE_URL = "https://express.csc309.muddy.ca"
```

We didn't use environment variables since react embeds this to the production build (and our docker build wasn't working somehow with an env var).

**It is required to have both frontend and backend in the same domain (localhost works) OR make sure both have secure=true and are using ssl**

This affects the cookie [see this issue](https://stackoverflow.com/questions/67821709/this-set-cookie-didnt-specify-a-samesite-attribute-and-was-default-to-samesi).

# Disclaimer

I used mui's rating and autocomplete with custom styles.

Following libraries were also used:
* Redux
* Axios
* React-Icons
* React-UID
* Notistack (for snackbar)

Almost everything else was created and styled from scratch.