# CSC309H1S Recipe Web App (Course Project)

This is a fullstack app with express backend (mongodb as db and file storage) and react frontend.

Deployed URL:
**~~[https://recipe.muddy.ca](https://recipe.muddy.ca)~~**

This project will no longer be deployed.

## Phase 2

## [Backend Instructions (Click)](backend/README.md)

Backend is **complete** with following routes (**see above link for details**):

* **User**
    * Register
    * Login
    * Logout
    * Get latest user info
    * Get public user info
    * Delete user themselves
    * Update user themselves
    * Follow user
    * Unfollow user
    * Admin get all user info
    * Admin delete user
    * Admin update user by user id
* **Recipe**
    * Create recipe
    * Update my recipe by recipe id
    * Get all public recipes
    * Get my recipes
    * Get recipe by author id
    * Get recipe by recipe id
    * Delete my recipe
    * Save recipe as favorite
    * Remove saved recipe
    * Admin update any recipe by recipe id
    * Admin delete any recipe by recipe id
* **Review**
    * Upsert a review on a recipe by recipe id
    * Delete my review by review id
    * Get my reviews
    * Get review by review id
    * Get reviews by recipe id
    * Get reviews by user id
    * Admin get all reviews
    * Admin update any review by review id
* **Review voting**
    * Vote (upvote/downvote) review (upsert) by review id
    * Report a review as inappropriate
    * Delete my inappropriate report
* **File (upload/retrieve/delete/view)**
    * Upload a file (GridFS implementation)
    * Get file by [file id] and [file id + extension]
    * Get file info by file id
    * Admin get all files info
    * Admin delete file by file id
* **Constants**
    * Get all routes and APISpec in markdown or json format
    * Get all recipe categories
    * Get all recipe diets

## [Frontend Instructions (Click)](frontend/README.md)

**Please see above link for details.**

Note that frontend doesn't do strict checking on permissions (this is handled by backend).

However, all components are displayed properly given the logged-in user's permission.

If the user attempted to do something they don't have permission for or entered anything invalid, a snackbar with
detailed error message will appear.

The following has been implemented:

* **User (every component used in any following pages is mobile friendly)**
    * Login using [email or name] and password
    * Register with email, name, password
    * Logout on session expire or using the sidebar button at the bottom
    * Display user info in sidebar and in my profile
    * Edit my profile in `My Profile` tab
        * Upload avatar
        * Edit username
        * Reset password
        * Delete my account with confirmation
        * Check users this user's following and this user's followers
            * Sort and filter these users with their username
            * Remove following users by clicking the following user's row
                * A confirmation dialog will popup
    * Admin can manage all users in `Manage Users` tab
        * Filter/Sort user by username, role, email
        * Sort by user following users and followers
        * Search user by user id
        * (Click on a user row to) Edit this user
            * Every action mentioned above in edit `My Profile` is supported
            * Edit user role

* **Reviews**
    * User can manage all their reviews in `My Reviews` tab
        * Sort/Filter by recipe title, review author, rating, content, upvotes, downvotes
        * (Click on a review row to) Edit this review
            * Edit rating
            * Edit content
            * Delete this review
    * Admin can manage all reviews in `Manage Reviews` tab
        * Every action mentioned above in edit `My Reviews` is supported
        * Edit users who reported this review
        * Approve/Disapprove this review
        * Check all users who voted on this review
            * Sort/Filter by author name, author id, positivity
    * User can update and create new review with `rating, comment (optional)` in `View Recipe` dialog. This dialog will
      appear every time user attempts to view a recipe.
    * User can view all reviews posted in a recipe's `View` dialog. In this dialog, all reviews will be displayed
      together with upvotes and downvotes they have got.
        * Users can also sort reviews by review rating, upvotes and downvotes
        * Users can also filter reviews by rating an author name

* **Vote Review**
    * User can vote any review in the `View Recipe` dialog.
        * Click the thumbs up button/thumbs down button to vote
        * Click existing vote to remove the vote

* **Recipes**
    * Admin can manage all recipes in `Manage Recipes` tab
        * Sort/Filter by instructions, title, category, ingredients, author, author name, tags
        * Someone else's implementing editing recipe component
    * User can edit recipes in the recipe dialog. This supports:
        * Upload a thumbnail
        * Edit title
        * Edit instructions
        * Edit category using a dropdown or text field
        * Edit diet using a radio button group
        * Edit instructions using a custom list component (to add/remove ingredients)
        * Edit tags using a custom list component
        * Delete the recipe
    * Admin will have access to all above features and:
        * Mark a recipe as approved
        * View recipe's author, recipe's ids
        * Delete any recipe
    * View recipe
        * Besides the review features, users can do the following in the `View Recipe` dialog:
            * Follow the recipe author
            * Check all recipe information
    * Browse public recipes/saved recipes
        * User can check all approved recipes or recipes they marked as saved in this page's grid as `Recipe Cards`:
            * Sort recipes by title, authorName, category, tags, reviews, average rating
            * Search using recipe's title, author name and category
            * Check review's average rating
            * Click the full/outlined heart button to save this recipe or remove it from favorites
    * Dashboard
        * Check user statistics
        * Get all recipes
        * Get top 3 recipes
    * Personal Recipes
        * Create new recipe using all said data in the `Edit Recipe` dialog
        * Update any existing recipes users have created using all said data in the `Edit Recipe` dialog

## Phase 1

### Log-in page:

Unmatched username, password and any username dosen’t exsit in database will encounter password and username unmatch
error by clicking dubmit button. only matched password with exist user in database will lead user to login Login by
admin will lead you to admin page Hardcode user data for username and password:
Username:user1,Password: user1 Username:user2,Password:user2 Username: admin,Password: admin

### Sign-Up page:

New user sign up through sign up page will redirect them to my profile page

### Saved Recipe Page:

On saved recipe page, by clicking the recipes(recipe1, recipe2), user will be redirect to the detailed recipe page.

### Home Page:

When you run the application, you will be directed initially to the home page where it looks like a normal home page for
a website. There will be two buttons on the navigation bar that redirects you to the log in or sign up page in which you
can either log in with your credential or create a new account.

### Personal Recipe Page:

The personal recipe page when you first get directed to it is a list of all your personal recipes that you posted on to
the website. Here, you can search for any of your recipes using the search bar. In the list, you can choose to delete
any of your recipes and also view more details of it. There is also an add recipe button which when you click, a pop-up
will appear with a form where you can enter key information of the new recipe you want to add. For example, there is an
input for the recipe name, tags, ingredients and instructions.

### My Profile:

In this page, the user (both regular user and admin) can view their user information. If they want to change their
profile picture, they need to select `Choose File` to choose a picture from their local machine to be their new profile
picture. The `Update` is to confirm that they want to use the current picture as their profile picture and the database
will be updated. For each field (`username`, `gender`, `email`, `birthday`, `type`), if the user wants to update the
information, they need to click on the `EDIT` button and enter the new information according to the format shown above
the textbox (if any). After that, they click on `UPDATE` so that the new information will be saved to the database.
Especially, for the `type` field, the user is restricted to three options to identify themselves. They need to click on
one of the buttons when they edit the field, and their last selection will be saved when they hit `UPDATE`.

### Browse Recipes:

In this page, the user can search for recipes by entering keywords in the search bar. Currently, we have 5 mock recipes
for searching:
`{title: "Grilled Pork Chops with Smoked Paprika Rub", tags: ["omnivore", "pork"]}`
`{title: "Air-Fried Frozen Salmon", tags: ["pescatarian", "salmon"]}`
`{title: "Golden Chicken", tags: ["omnivore", "chicken"]}`
`{title: "Creamy Broccoli Vegan Pasta", tags: ["vegetarian", "pasta", "broccoli"]}`
`{title: "Slow Cooker Sweet and Sour Chicken Thighs", tags: ["omnivore", "chicken"]}`
If the keywords they enter match any keyword in the `tags` list, the corresponding recipe will show as a search result.
For multiple keywords, separate them using a space ‘ ‘. After clicking on the `SEARCH` button, the search results will
show underneath the search bar. The user can view the full recipe by clicking on the recipe title which will redirect
them to the corresponding recipe page. If the keywords the user enters are not valid or don’t match any recipe, an error
message will show up. For the current search feature, the user needs to refresh the page every time after they search
once (click on the `SEARCH` button) to ensure an accurate result.

### Recipe Page:

In this page, the user can see the full recipe post including the title, author, keywords for the recipe, a picture (
optional), ingredient needed, instruction. Under the recipe, there are thumbs up and thumbs down buttons for the user to
rate the recipe. If the user clicks on the button once, they upvote the recipe. If they click it again, they cancel the
upvote action. The user can leave comments for the recipe by typing in the comment box and clicking on `POST COMMENT`
button. There's also a `REPORT` button for every recipe and comment. If the user finds the recipe or comment
inappropriate, they can click on the button. They can cancel the action by clicking it again.

### Admin Grids (this applies to all following admin grid pages):

These grids can be searched using a combination of text fields that are located above these grids. They can also be
sorted using grid headers by clicking the specific header. Sorting using one header also resets all other sorting styles
and the data (which is a normal behavior when it comes to sorting a grid). All grids, search text fields and their
dialog popups, are styled for both desktop and mobile.

#### Admin Manage Users [/manage/users]:

This page lists all users, their basic info and some of their recipe statistics. You can search the grid by username,
permission, email and the number of uploaded recipes.

* Clicking the username of any row will give you a popup, where you can edit this user’s basic information (i.e.,
  username, email, avatar and permission).
* Clicking the uploaded recipe of any row will give you a popup, which lists all the recipes this user has uploaded.

#### Admin Manage Recipes [/manage/recipes]:

This page lists all recipes, their categories, the last edit time and their authors.

* Clicking the recipe name of any row will give you a popup, where you can edit the recipe’s basic information (i.e.,
  recipe name and category).
* Clicking the username of any row will give you the same username popup, where you can edit the user's basic
  information (as part of the feature that allows admin to manage data based on cell type instead of the specific page).
* Clicking the review of any row will give you a popup, which contains another grid component. You can search (i.e.,
  search rating author) and sort in that popup as well.

#### Admin Manage Reviews [/manage/reviews]:

This page lists all reviews made by users on all recipes. This includes the person who posted the review, the recipe
name, its rating, the amount of reports that have been made on this review and the creation time of the review.

* Clicking the recipe name will give you the same popup as described in Admin Manage Recipes.
* Clicking usernames of recipe author or rating author will give you the same popup as described in Admin Manage Users.
* Clicking report count will give you a list of reports that have been posted by other users on this recipe review. (
  i.e., users can report inappropriate reviews so that admin can decide if or not to remove this recipe review).

### Third-party Libraries:

* @material-ui/core/Button
* @material-ui/core/Textfield
* @material-ui/icons
* React-uid

### Disclaimer on Libraries:

All components used in admin grid pages (i.e., manage users/recipes/reviews), side navigation bar and top navigation bar
have been made from scratch. The only library used in those pages is react-icons (which contains svg icons). Everything,
including their mobile styles have been created from scratch.
