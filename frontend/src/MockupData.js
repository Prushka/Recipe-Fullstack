const users = [
    {
        "Username": "TestUser1",
        "Permission": "User",
        "id": 1,
        "Email": "testuser1@example.com",
        "Uploaded Recipes": 0
    },
    {
        "Username": "TestUser2",
        "Permission": "User",
        "id": 2,
        "Avatar": "https://s2.loli.net/2022/02/11/1IV4f92WzuUYKcm.jpg",
        "Uploaded Recipes": 6
    }
    ,
    {
        "Username": "TestUser3",
        "Permission": "Admin",
        "id": 3,
        "Avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png",
        "Email": "testuser3@example.com",
        "Uploaded Recipes": 3
    },
    {
        "Username": "TestUser4",
        "Permission": "Admin",
        "id": 4,
        "Avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png",
        "Email": "testuser3@example.com",
        "Uploaded Recipes": 3
    }
]

const recipes = [
    {
        "Recipe Name": "Water",
        "Category": "Beverage",
        "Last Edit": "122 days ago",
        "Created By": "TestUser2",
        "id": 1,
        "Report": 0
    },
    {
        "Recipe Name": "Juice",
        "Category": "Beverage",
        "Last Edit": "12 days ago",
        "Created By": "TestUser2",
        "id": 2,
        "Report": 1
    },
    {
        "Recipe Name": "Blood",
        "Category": "Beverage",
        "Last Edit": "11 days ago",
        "Created By": "TestUser2",
        "id": 3,
        "Report": 4
    },
    {
        "Recipe Name": "Sushi",
        "Category": "Japanese",
        "Last Edit": "1 day ago",
        "Created By": "TestUser2",
        "Reviews": 12,
        "id": 4,
        "Report": 0
    },
    {
        "Recipe Name": "Sashimi",
        "Category": "Japanese",
        "Last Edit": "9 days ago",
        "Created By": "TestUser2",
        "id": 5,
        "Report": 1
    },
    {
        "Recipe Name": "Rice",
        "Category": "Mystery",
        "Last Edit": "2 days ago",
        "Created By": "TestUser2",
        "id": 6,
        "Report": 8
    },
    {
        "Recipe Name": "Cheesecake",
        "Category": "Dessert",
        "Last Edit": "2 days ago",
        "Created By": "TestUser3",
        "Reviews": 1,
        "id": 7,
        "Report": 0
    },
    {
        "Recipe Name": "Bread",
        "Category": "Dessert",
        "Last Edit": "20 days ago",
        "Created By": "TestUser3",
        "id": 8,
        "Report": 1
    },
    {
        "Recipe Name": "Cupcakes",
        "Category": "Dessert",
        "Last Edit": "12 days ago",
        "Created By": "TestUser3",
        "id": 9,
        "Report": 1
    },
    {
        "Recipe Name": "Roasted Apple",
        "Category": "Fruits",
        "Last Edit": "11 days ago",
        "Created By": "TestUser4",
        "id": 10,
        "Report": 1
    },
    {
        "Recipe Name": "Roasted Cucumber",
        "Category": "Fruits",
        "Last Edit": "11 days ago",
        "Created By": "TestUser4",
        "id": 11,
        "Report": 1
    },
    {
        "Recipe Name": "Roasted Tomato",
        "Category": "Fruits",
        "Last Edit": "11 days ago",
        "Created By": "TestUser4",
        "Reviews": 1,
        "id": 12,
        "Report": 1
    }
]

const reviews = [
    {
        "Recipe": "Cheesecake",
        "Recipe Author": "TestUser3",
        "Rating": true,
        "Comment Author": "TestUser2",
        "Report Count": 0,
        "Posted At": "2022-01-20",
        "id": 1,
        "public": false
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser2",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 2,
        "public": true
    },
    {
        "Recipe": "Roasted Tomato",
        "Recipe Author": "TestUser4",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 10,
        "Posted At": "2022-01-21",
        "id": 3,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": false,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 4,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 5,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 6,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": false,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 7,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": false,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 8,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": false,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 9,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 10,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 11,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 12,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 13,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": true,
        "Comment Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 14,
        "public": true
    }
]

const reports = [
    {
        "Report Author": "TestUser2",
        "Report Reason": "Spam",
        "User Total Reports": 2,
        "Reported At": "2022-01-01",
        "id": 0
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 1
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 2
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 3
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 4
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 5
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 6
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 7
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 8
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 9
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 10
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 11
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 12
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 13
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 14
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 15
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 16
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 17
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 18
    },
    {
        "Report Author": "TestUser2",
        "Report Reason": "Some Reason",
        "User Total Reports": 2,
        "Reported At": "2022-01-02",
        "id": 19
    }
]

const defaultUser = {
    "Username": "None",
    "Permission": "None",
    "id": -1
}

const defaultReview = {
    "Report Author": "None",
    "id": -1
}

const findUserByName = (userName) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i]["Username"] === userName) {
            return users[i]
        }
    }
    return null
}

const findRecipeById = (id) => {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i]["id"] === id) {
            return recipes[i]
        }
    }
    return null
}

const findRecipesByUsername = (userName) => {
    const _recipes = []
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i]["Created By"] === userName) {
            _recipes.push(recipes[i])
        }
    }
    return _recipes
}

const findRecipesByRecipeName = (recipeName) => {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i]["Recipe Name"] === recipeName) {
            return recipes[i]
        }
    }
    return null
}

export {
    findRecipesByRecipeName,
    findUserByName,
    findRecipesByUsername,
    recipes,
    users,
    defaultUser,
    defaultReview,
    reviews,
    reports
}