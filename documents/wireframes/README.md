Basic user interface wireframes for permissive.

users.svg shows a basic expandable list of users, displaying the repo permissions for each. The repo-oriented view is nearly identical, but inverted.

##User Workflow

1. Load page :arrow_right: `GET /users`
2. Click to expand user :arrow_right: `GET /repos?permission_user={selected username}`
3. Click permission toggle
    * if a **single repo**\*
        * if `read | write | admin` :arrow_right: `PUT /repos/{repo id}/users/{username}/permissions/{permission}`
        * else if `none` :arrow_right: `DELETE /repos/{repo id}/users/{username}`
    * else if **edit all** control
        * `for each (repo id)` :arrow_right: `PUT /repos/{repo id}/users/{username}/permissions/{permission}`

\**note that these are represented as hypermedia links `edit-user-permission` and `remove-user-permission` respectively.*
