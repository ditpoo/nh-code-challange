# Start Server

`yarn build` then `yarn start` or

`npm i` then `npm run build` then `npm run start`

# Check User creation

`POST localhost:5000\v1\user`

Response: 

`{
    "success": true,
    "status": 200,
    "message": "Sucessfully created user",
    "data": {
        "isAnonymous": true,
        "role": "guest",
        "_id": "5fb2b214cfe371f5f44e980b",
        "createdAt": "2020-11-16T17:08:36.115Z",
        "__v": 0,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIyYjIxNGNmZTM3MWY1ZjQ0ZTk4MGIiLCJpYXQiOjE2MDU1NDY1MTYsImV4cCI6MTYwNTYzMjkxNn0.sJiM89vB6rij_vjTOWY5Bxs3-c8Xgl9jlOPglI98FkY"
    }
}`

Attach that token as a bearer token it will return the same User
