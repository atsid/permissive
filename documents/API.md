#RESTful Services API for permissive

This is a draft of the operations available to meet the initial views of the app. The models will be formalized as JSON Schema with link definitions (fields indicating operations allowed for the logged in user will be represented as links, such as 'editable' below). Note that this first iteration does not include batch endpoints yet. Those will effectively be an optimization task.

##Operations

1. Get list of users
        
        GET /users
        returns User[]
2. Get details for a user

        GET /users/:username
        returns User
3. Get list of repos visible to a user

        GET /users/:username/repos
        returns UserRepo[]
4. Add/update repo permissions for a user

        PUT /users/:username/repos/:id/permissions/:permission
5. Remove all repo access for a user

        DELETE /users/:username/repos/:id
6. Get list of repos

        GET /repos
        returns Repo[]
7. Get details for a repo

        GET /repos/:id
        returns Repo
8. Get list of users that have access to repo

        GET /repos/:id/users
        returns RepoUser[]
9. Add/update user permissions for a repo

        PUT /repos/:id/users/:username/permissions/:permission
10. Remove all user access to a repo

        DELETE /repos/:id/users/:username

Note that 4/9 and 5/10 are effectively aliases to each other, suitable for different views.

Also note that some PUT operations have no body, as the URL contains sufficient data. See [GitHub documentation](https://developer.github.com/v3/#http-verbs).

##Models

###User
Basic details for a user. Note that GitHub API uses "login" as the username field on all user responses, but all API methods use :username as the param. We are going to use "username" throughout for consistency.

    {
        username: string, //username, forms ID throughout GitHub API
        name: string, //friendly name, optional
        avatar_url: string //link to GitHub avatar, optional
    }

###Repo
Basic details for a repo.

    {
        id: integer, //formal repo id, assigned by GitHub upon creation
        name: string, //name of the repo
        description: string, //short description of the repo, optional
        public: boolean, //indicates if the repo is public (defaults to false)
        editable: boolean //indicates that the logged in user can edit permissions for this repo (defaults to false)
    }

###UserRepo
Repo details when viewed by a user, to include overlay of permission (extends Repo).

    {
        id: integer, //formal repo id, assigned by GitHub upon creation
        name: string, //name of the repo
        description: string, //short description of the repo, optional
        public: boolean, //indicates if the repo is public (defaults to false)
        editable: boolean //indicates that the logged in user can edit permissions for this repo (defaults to false)
        permission: string //permission level of user on this repo (pull, push, admin)
    }

###RepoUser
 User details when viewed under a repo, to include overlay of permission (extends User).

     {
         username: string, //username, forms ID throughout GitHub API
         name: string, //friendly name, optional
         avatar_url: string, //link to GitHub avatar, optional
         permission: string //permission level of user on this repo (pull, push, admin)
     }

##Views
The first iteration of the draft will support two views (by-user and by-repo). Therefore, the list of operations below is limited to what will initially be required. These views will be defined in greater detail in a separate document, but the following descriptions are presented in order to understand services workflow required.

###By-user
* raw list of organization users visible to logged in user (1)
* expanding a user retrieves the list of repos visible to them (3)
* toggle button will be present on each repo with None|Read|Write|Admin (3)
    * note that only repos that the logged in user has **admin** access to will have these buttons 
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (4 or 5 for each repo)

###By-repo
* raw list of organization repos visible to logged in user (6)
* expanding a repo retrieves the list of users with access (8)
* toggle button will be present on each user with None|Read|Write|Admin (8)
    * note that these buttons will only be present if the logged in user has **admin** access to the selected repo
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (9 or 10 for each repo)
