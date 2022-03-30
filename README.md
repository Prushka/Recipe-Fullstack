# team36
# Log-in page:

Unmatched username, password and any username dosen’t exsit in database will encounter password and username unmatch error by clicking dubmit button.
only matched password with exist user in database will lead user to login
Login by admin will lead you to admin page
Hardcode user data for username and password:
Username:user1,Password: user1
Username:user2,Password:user2
Username: admin,Password: admin

# Sign-Up page:
New user sign up through sign up page will redirect them to my profile page

# Saved Recipe Page:
On saved recipe page, by clicking the recipes(recipe1, recipe2), user will be redirect to the detailed recipe page.

# Home Page: 
When you run the application, you will be directed initially to the home page where it looks like a normal home page for a website. There will be two buttons on the navigation bar that redirects you to the log in or sign up page in which you can either log in with your credential or create a new account. 

# Personal Recipe Page:
The personal recipe page when you first get directed to it is a list of all your personal recipes that you posted on to the website. Here, you can search for any of your recipes using the search bar. In the list, you can choose to delete any of your recipes and also view more details of it. There is also an add recipe button which when you click, a pop-up will appear with a form where you can enter key information of the new recipe you want to add. For example, there is an input for the recipe name, tags, ingredients and instructions. 

# My Profile:
In this page, the user (both regular user and admin) can view their user information. If they want to change their profile picture, they need to select `Choose File` to choose a picture from their local machine to be their new profile picture. The `Update` is to confirm that they want to use the current picture as their profile picture and the database will be updated. For each field (`username`, `gender`, `email`, `birthday`, `type`), if the user wants to update the information, they need to click on the `EDIT` button and enter the new information according to the format shown above the textbox (if any). After that, they click on `UPDATE` so that the new information will be saved to the database. Especially, for the `type` field, the user is restricted to three options to identify themselves. They need to click on one of the buttons when they edit the field, and their last selection will be saved when they hit `UPDATE`. 

# Browse Recipes:
In this page, the user can search for recipes by entering keywords in the search bar. Currently, we have 5 mock recipes for searching: 
     `{title: "Grilled Pork Chops with Smoked Paprika Rub", tags: ["omnivore", "pork"]}`
     `{title: "Air-Fried Frozen Salmon",  tags: ["pescatarian", "salmon"]}`
     `{title: "Golden Chicken",  tags: ["omnivore", "chicken"]}`
     `{title: "Creamy Broccoli Vegan Pasta", tags: ["vegetarian", "pasta", "broccoli"]}`
     `{title: "Slow Cooker Sweet and Sour Chicken Thighs", tags: ["omnivore", "chicken"]}`
If the keywords they enter match any keyword in the `tags` list, the corresponding recipe will show as a search result. For multiple keywords, separate them using a space ‘ ‘. After clicking on the `SEARCH` button, the search results will show underneath the search bar. The user can view the full recipe by clicking on the recipe title which will redirect them to the corresponding recipe page. If the keywords the user enters are not valid or don’t match any recipe, an error message will show up. For the current search feature, the user needs to refresh the page every time after they search once (click on the `SEARCH` button) to ensure an accurate result. 

# Recipe Page:
In this page, the user can see the full recipe post including the title, author, keywords for the recipe, a picture (optional), ingredient needed, instruction. Under the recipe, there are thumbs up and thumbs down buttons for the user to rate the recipe. If the user clicks on the button once, they upvote the recipe. If they click it again, they cancel the upvote action. The user can leave comments for the recipe by typing in the comment box and clicking on `POST COMMENT` button. There's also a `REPORT` button for every recipe and comment. If the user finds the recipe or comment inappropriate, they can click on the button. They can cancel the action by clicking it again. 


# Admin Grids (this applies to all following admin grid pages):
These grids can be searched using a combination of text fields that are located above these grids. They can also be sorted using grid headers by clicking the specific header. Sorting using one header also resets all other sorting styles and the data (which is a normal behavior when it comes to sorting a grid).
All grids, search text fields and their dialog popups, are styled for both desktop and mobile.

### Admin Manage Users [/manage/users]:
This page lists all users, their basic info and some of their recipe statistics. You can search the grid by username, permission, email and the number of uploaded recipes.
* Clicking the username of any row will give you a popup, where you can edit this user’s basic information (i.e., username, email, avatar and permission). 
* Clicking the uploaded recipe of any row will give you a popup, which lists all the recipes this user has uploaded.


### Admin Manage Recipes [/manage/recipes]:
This page lists all recipes, their categories, the last edit time and their authors.
* Clicking the recipe name of any row will give you a popup, where you can edit the recipe’s basic information (i.e., recipe name and category).
* Clicking the username of any row will give you the same username popup, where you can edit the user's basic information (as part of the feature that allows admin to manage data based on cell type instead of the specific page).
* Clicking the review of any row will give you a popup, which contains another grid component. You can search (i.e., search rating author) and sort in that popup as well.

### Admin Manage Reviews [/manage/reviews]:
This page lists all reviews made by users on all recipes. This includes the person who posted the review, the recipe name, its rating, the amount of reports that have been made on this review and the creation time of the review.
* Clicking the recipe name will give you the same popup as described in Admin Manage Recipes.
* Clicking usernames of recipe author or rating author will give you the same popup as described in Admin Manage Users.
* Clicking report count will give you a list of reports that have been posted by other users on this recipe review. (i.e., users can report inappropriate reviews so that admin can decide if or not to remove this recipe review).


# Third-party Libraries:
* @material-ui/core/Button
* @material-ui/core/Textfield
* @material-ui/icons
* React-uid

# Disclaimer on Libraries:

All components used in admin grid pages (i.e., manage users/recipes/reviews), side navigation bar and top navigation bar have been made from scratch. The only library used in those pages is react-icons (which contains svg icons). Everything, including their mobile styles have been created from scratch.
