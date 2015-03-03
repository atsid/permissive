#RESTful Services API for permissive

This is a draft of the operations available to meet the initial views of the app. The models will be formalized as JSON Schema with link definitions. Note that this first iteration does not include batch endpoints yet. Those will effectively be an optimization task.

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
        public: boolean //indicates if the repo is public (defaults to false)
    }

###UserRepo
Repo details when viewed by a user, to include overlay of permission (extends Repo).

    {
        id: integer, //formal repo id, assigned by GitHub upon creation
        name: string, //name of the repo
        description: string, //short description of the repo, optional
        public: boolean, //indicates if the repo is public (defaults to false)
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
