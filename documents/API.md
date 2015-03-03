#RESTful Services API for permissive

This is a draft of the operations available to meet the initial views of the app. The models will be formalized as JSON Schema with link definitions (fields indicating operations allowed for the logged in user will be represented as links, such as 'editable' below). Note that this first iteration does not include batch endpoints yet. Those will effectively be an optimization task.

##Operations

1. Get list of users. If permission_repo is specified, the "permission" flag on each user will be present, reporting their access to that repo.

        GET /users?permission_repo=:id
        returns User[]
2. Get details for a user

        GET /users/:username
        returns User

3. Add/update repo permissions for a user

        PUT /users/:username/repos/:id/permissions/:permission
        returns null, 204
4. Remove all repo access for a user

        DELETE /users/:username/repos/:id
        returns null, 204
5. Get list of repos. If permission_user is specified, the "permission" flag on each repo will be present, reporting the access available for that user.

        GET /repos
        returns Repo[]
6. Get details for a repo

        GET /repos/:id
        returns Repo
7. Add/update user permissions for a repo

        PUT /repos/:id/users/:username/permissions/:permission
        returns null, 204
8. Remove all user access to a repo

        DELETE /repos/:id/users/:username
        returns null, 204

Note that 3/7 and 4/8 are effectively aliases to each other, suitable for different views.

Also note that some PUT operations have no body, as the URL contains sufficient data. See [GitHub documentation](https://developer.github.com/v3/#http-verbs).

##Models

###User
Basic details for a user. Note that GitHub API uses "login" as the username field on all user responses, but all API methods use :username as the param. We are going to use "username" throughout for consistency.

    {
        username: string, //username, forms ID throughout GitHub API
        name: string, //friendly name, optional
        avatar_url: string, //link to GitHub avatar, optional
        permission: string //permission level of user on a repo (pull, push, admin). only present if permission_repo is specified on request.
    }

###Repo
Basic details for a repo.

    {
        id: integer, //formal repo id, assigned by GitHub upon creation
        name: string, //name of the repo
        description: string, //short description of the repo, optional
        public: boolean, //indicates if the repo is public (defaults to false)
        editable: boolean, //indicates that the logged in user can edit permissions for this repo (defaults to false)
        permission: string //permission level of user on this repo (pull, push, admin). only present if permission_user is specified on request.
    }

##Views
The first iteration of the draft will support two views (by-user and by-repo). Therefore, the list of operations above is limited to what will initially be required. These views will be defined in greater detail in a separate document, but the following descriptions are presented in order to understand services workflow required.

###By-user
* raw list of organization users visible to logged in user (1)
* expanding a user retrieves the list of repos visible to them (5 with permission_user={selected user})
* toggle button will be present on each repo with None|Read|Write|Admin (5)
    * note that only repos that the logged in user has **admin** access to will have these buttons 
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (3 or 4 for each repo)

###By-repo
* raw list of organization repos visible to logged in user (5)
* expanding a repo retrieves the list of users with access (1 with permission_repo={selected repo})
* toggle button will be present on each user with None|Read|Write|Admin (1)
    * note that these buttons will only be present if the logged in user has **admin** access to the selected repo
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (7 or 8 for each repo)
