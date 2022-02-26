const users = {
    "TestUser1": {
        "Username": "TestUser1",
        "Permission": "Guest",
        "id": 1
    },
    "TestUser2": {
        "Username": "TestUser2",
        "Permission": "User",
        "id": 2,
        "avatar": "https://s2.loli.net/2022/02/11/1IV4f92WzuUYKcm.jpg"
    }
    ,
    "TestUser3": {
        "Username": "TestUser3",
        "Permission": "Admin",
        "id": 3,
        "avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png"
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

const defaultUser = {
    "Username": "None",
    "Permission": "None",
    "id": -1
}

export {recipes, users, defaultUser}