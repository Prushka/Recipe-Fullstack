const users = {
    "TestUser1": {
        "Username": "TestUser1",
        "Permission": "Guest",
        "id": 1,
        "Email": "testuser1@example.com",
        "Uploaded Recipes": null
    },
    "TestUser2": {
        "Username": "TestUser2",
        "Permission": "User",
        "id": 2,
        "avatar": "https://s2.loli.net/2022/02/11/1IV4f92WzuUYKcm.jpg",
        "Uploaded Recipes": 6
    }
    ,
    "TestUser3": {
        "Username": "TestUser3",
        "Permission": "Admin",
        "id": 3,
        "avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png",
        "Email": "testuser3@example.com",
        "Uploaded Recipes": 3
    }
}

const recipes = [
    {
        "Recipe Name": "Water",
        "Category": "Mystery",
        "Last Edit": "122 days ago",
        "Created By": "TestUser2",
        "id": 1
    },
    {
        "Recipe Name": "Sushi",
        "Category": "Japanese",
        "Views": 3,
        "Review": 4.2,
        "Steps": 10,
        "Last Edit": "10 days ago",
        "Created By": "TestUser1",
        "id": 2
    },
    {
        "Recipe Name": "Apple",
        "Category": "Fruit",
        "Views": 3,
        "Review": 4.2,
        "Created By": "TestUser3",
        "id": 3
    }
]

const reviews = [
    {
        "Recipe": "Water",
        "Recipe Author": "TestUser2",
        "Rating": 2,
        "Rating Author": "TestUser3",
        "Report Count": 20,
        "Posted At": "2022-01-20",
        "id": 0
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 1
    }
]

const defaultUser = {
    "Username": "None",
    "Permission": "None",
    "id": -1
}

export {recipes, users, defaultUser, reviews}