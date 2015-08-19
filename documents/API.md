#RESTful Services API for permissive

This is a draft of the operations available to meet the initial views of the app. The models will be formalized as JSON Schema with link definitions. Note that this first iteration does not include batch endpoints yet. Those will effectively be an optimization task.

##Operations

1. Get identity of authenticated user
  
        GET /identity
        returns Identity{}

2. Get list of users. If permission_repo is specified, the "permission" flag on each user will be present, reporting their access to that repo.

        GET /users[?permission_repo=:id]
        returns User[]

3. Add/update/remove repo permissions for a user

        PUT /users/:username/repos/:id/permissions/:permission
        returns null, 204

4. Get list of repos. If permission_user is specified, the "permission" flag on each repo will be present, reporting the access available for that user.

        GET /repos[?permission_user=:username]
        returns Repo[]

5. Add/update/remove user permissions for a repo

        PUT /repos/:id/users/:username/permissions/:permission
        returns null, 204
        
6. Get list of teams and their associated users and repos

        GET /teams
        returns Team[]
        
7. Get organization structure
        
        GET /organization
        returns Organization{}


Note that 3/5 are effectively aliases to each other, suitable for different views.

Also note that some PUT operations have no body, as the URL contains sufficient data. See [GitHub documentation](https://developer.github.com/v3/#http-verbs).

##Models

###User
Basic details for a user. Note that GitHub API uses "login" as the username field on all user responses, but all API methods use :username as the param. We are going to use "username" throughout for consistency.

    {
        username: string, //username, forms ID throughout GitHub API
        name: string, //friendly name, optional
        avatar_url: string, //link to GitHub avatar, optional
        permission: string, //details of user permission on a repo . only present if permission_repo is specified on request.
    }

###Repo
Basic details for a repo.

    {
        id: integer, //formal repo id, assigned by GitHub upon creation
        name: string, //name of the repo
        description: string, //short description of the repo, optional
        public: boolean, //indicates if the repo is public (defaults to false)
        permission: string, //details of user permission on this repo. only present if permission_user is specified on request.
    }
    
###Team
Basic details for a team.

    {
        id: integer, //formal team id, assigned by GitHub upon creation
        name: string, //name of the team
        description: string, //short description of the team, optional
        privacy: string, //details of the privacy level of a team
        users: User, //representation of the team's Github users
        repos: Repo, //representation of the team's repos
    }
    
###Organization
Details of the organization's repos and users
A data structure that combines the organizations repos, users and their associated permissions.

    {
        id: integer, //formal repo id, assigned by GitHub upon creation and maps to the basic details for a repo and its associated users with their associated permissions
        users: User, //representation of the organization's Github users
    }

##Views
The first iteration of the draft will support two views (by-user and by-repo). Therefore, the list of operations above is limited to what will initially be required. These views will be defined in greater detail in a separate document, but the following descriptions are presented in order to understand services workflow required.

###By-user
* raw list of organization users visible to logged in user (1)
* expanding a user retrieves the list of repos visible to them (5 with permission_user={selected user})
* toggle button will be present on each repo with None|Read|Write|Admin (5)
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (3 or 4 for each repo)

###By-repo
* raw list of organization repos visible to logged in user (5)
* expanding a repo retrieves the list of users with access (1 with permission_repo={selected repo})
* toggle button will be present on each user with None|Read|Write|Admin (1)
* clicking toggle button for a set of repos and then "save" will send changes one-at-a-time (7 or 8 for each repo)

###By-team
* raw list of organization teams visible to logged in user
* expanding a team retrieves the list of repos associated with the team

###By-organization
* matrix of organization repos and users along with associated user permissions per repo
