const users = [
    {
        "Username": "TestUser1",
        "Permission": "Guest",
        "id": 1,
        "Email": "testuser1@example.com",
        "Uploaded Recipes": null
    },
    {
        "Username": "TestUser2",
        "Permission": "User",
        "id": 2,
        "avatar": "https://s2.loli.net/2022/02/11/1IV4f92WzuUYKcm.jpg",
        "Uploaded Recipes": 6
    }
    ,
    {
        "Username": "TestUser3",
        "Permission": "Admin",
        "id": 3,
        "avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png",
        "Email": "testuser3@example.com",
        "Uploaded Recipes": 3
    },
    {
        "Username": "TestUser4",
        "Permission": "Admin",
        "id": 4,
        "avatar": "https://s2.loli.net/2022/02/10/grldkO4LeDjxmY8.png",
        "Email": "testuser3@example.com",
        "Uploaded Recipes": 3
    }
]

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
        "id": 0,
        "public": false
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 1,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 2,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 3,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 4,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 5,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 6,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 7,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 8,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 9,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 10,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 11,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 12,
        "public": true
    },
    {
        "Recipe": "Sushi",
        "Recipe Author": "TestUser1",
        "Rating": 5,
        "Rating Author": "TestUser3",
        "Report Count": 0,
        "Posted At": "2022-01-21",
        "id": 13,
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
        if(users[i]["Username"] === userName){
            console.log(users[i]["Username"])
            return users[i]
        }
    }
    return null
}

export {findUserByName, recipes, users, defaultUser, defaultReview, reviews, reports}