# Sources
This document uses the following sources to map between the permissive, node-github and github APIs.


permissive API
> https://github.com/atsid/permissive/blob/master/documents/API.md


github API
> https://developer.github.com/v3/repos/


node-github repo
> https://github.com/mikedeboer/node-github


node-github API
> http://mikedeboer.github.io/node-github/


node-github routes.json
> https://github.com/mikedeboer/node-github/blob/master/api/v3.0.0/routes.jsons


## Mapping permissive to node-github
The following details the node-github methods that will be called by permissive.


### 1 Get a list of users
1. Get a list of members in the organization (orgs.getMembers)
1. For each member
 1. Get the user data (user.getFrom)


### 1a Get a list of users with permission for a specific repo
1. Get a list of members in the organization (orgs.getMembers)
1. For each member
 1. Get the user data (user.getFrom)
1. Get a list of repos in the organization (repos.getFromOrg)
1. Create a mapping of Repo -> User
1. For each repo 
 1. Get a list of collaborators for the repo (which defines permission)
 1. Update mapping to include permission (Repo -> Collaborator? -> User -> Permission)
1. Return the mapping for the requested repo


### 2 Add or update repo permission for a user
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Add the user as a collaborator to the repo (repo.addCollaborator)


### 2a Remove repo access for a user
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Remove the user as a collaborator from the repo (repo.removeCollaborator)


### 3 Get list of repos
1. Get a list of repos in the organization (repos.getFromOrg)


### 3a Get a list of repos with permission for a specific user
1. Get a list of members in the organization (orgs.getMembers)
1. For each member
 1. Get the user data (user.getFrom)
1. Get a list of repos in the organization (repos.getFromOrg)
1. Create a mapping of Repo -> User
1. For each repo 
 1. Get a list of collaborators for the repo (which defines permission)
 1. Update mapping to include permission (Repo -> Collaborator? -> User -> Permission)
1. Return the mapping for the requested user


### 4 Add or update user permission for a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Add the user as a collaborator to the repo (repo.addCollaborator)


### 4a Remove user access to a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Remove the user as a collaborator from the repo (repo.removeCollaborator)


### 5 Get a list of teams with their associated repos and users
1. Get a list of teams in the organization (teams.getFromOrg)
 1. For each team
 1. Get a list of users for the team
 1. Get a list of repos for the team
 1. Create a mapping of Team -> (Repo, User)
1. Return the mapping for the organization


# Mapping node-github to github
The following details the mapping between the node-github and github APIs.


##Users

One of the views in Permissive is centered on the Github members of an organization. 


### List of Users

This method will be used to retrieve a list of all members of an organization. The login property (sometimes referenced in the github api as :username) returned for each user is used to identify them in the system.

* Github API - https://developer.github.com/v3/orgs/members/#members-list
* Github URL - GET /orgs/:org/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getMembers
* node-github method - orgs.getMembers


### Single User

This method returns the full set of data on a github user.

* Github API - https://developer.github.com/v3/users/#get-a-single-user
* Github URL - GET /users/:username
* node-github API - http://mikedeboer.github.io/node-github/#user.prototype.getFrom
* node-github method - user.getFrom


## Repos

One of the views in Permissive is centered on the Github repos that belong to an organization. 


### List of Repos

This method will be used to retrieve a list of all repos that belong to an organization.

* Github API - https://developer.github.com/v3/repos/#list-organization-repositories
* Github URL - GET /orgs/:org/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromOrg
* node-github method - repos.getFromOrg

### List of Collaborators

This method will be used to retreive a list of all collaborators for a repo.

* Github API - https://developer.github.com/v3/repos/collaborators/#list
* Github URL - GET /repos/:owner/:repo/collaborators
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getCollaborators
* node-github method - repos.getCollaborators

### Add Collaborator

This method will add a user as a collaborator to a repo.

* Github API - https://developer.github.com/v3/repos/collaborators/#add-collaborator
* Github URL - PUT /repos/:owner/:repo/collaborators/:username
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.addCollaborator
* node-github method - repos.addCollaborator

### Remove Collaborator

This method will remove a user as a collaborator from a repo.

* Github API - https://developer.github.com/v3/repos/collaborators/#remove-collaborator
* Github URL - DELETE /repos/:owner/:repo/collaborators/:username
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.removeCollaborator
* node-github method - repos.removeCollaborator

## Teams

One of the views in Permissive is centered on the Github teams that belong to an organization. 

### List Teams

This method will retrieve a list of all teams that belong to an organization. Permissive will follow a format when naming teams so that it can filter out any team that it does not manage.

* Github API - https://developer.github.com/v3/orgs/teams/#list-teams
* Github URL - GET /orgs/:org/teams
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeams
* node-github method - orgs.getTeams


### List Teams

This method will retrieve a list of all teams that belong to an organization.

* Github API - https://developer.github.com/v3/orgs/teams/#list-teams
* Github URL - GET /orgs/:org/teams
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeams
* node-github method - orgs.getTeams


### List Members by Team

This method will retrieve a list of all the team members. To get the list, the Github API requires the authenticated user to be a member of the team.

* Github API - https://developer.github.com/v3/orgs/teams/#list-team-members
* Github URL - GET /teams/:id/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeamMembers
* node-github method - orgs.getTeamMembers


### List Repos by Team

This method will retrieve a list of all the team repos.

* Github API - https://developer.github.com/v3/orgs/teams/#list-team-repos
* Github URL - GET /teams/:id/repos
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeamRepos
* node-github method - orgs.getTeamRepos

