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
1. Get a list of teams in the organization (orgs.getTeams)
1. For each team (which defines permission)
 1. Get a list of repos managed by the team (orgs.getTeamRepos)
 1. Get each team member (orgs.getTeamMembers)
 1. Update mapping to include permission (Repo -> User -> Permission)
1. Return the mapping for the requested repo


### 2 Get details for a user
1. Get the user data (user.getFrom)


### 3 Add repo permission for a user
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. Find the appropriate team (permission)
1. Add the user to the team (orgs.addTeamMember)


### 3a Update repo permission for a user
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. Find the users current team
1. Remove the user from the team (orgs.deleteTeamMember)
1. Find the users new team (permission)
1. Add the user to the team (orgs.addTeamMember)


### 3b Remove repo access for a user
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. For each team associated with the repo
 1. Get the members (orgs.getTeamMembers)
 1. If the user is on the team, remove them (orgs.deleteTeamMember)


### 4 Get list of repos
1. Get a list of repos in the organization (repos.getFromOrg)


### 4a Get a list of repos with permission for a specific user
1. Get a list of members in the organization (orgs.getMembers)
1. For each member
 1. Get the user data (user.getFrom)
1. Get a list of repos in the organization (repos.getFromOrg)
1. Create a mapping of Repo -> User
1. Get a list of teams in the organization (orgs.getTeams)
1. For each team (which defines permission)
 1. Get a list of repos managed by the team (orgs.getTeamRepos)
 1. Get each team member (orgs.getTeamMembers)
 1. Update mapping to include permission (Repo -> User -> Permission)
1. Return a mapping for the requested user


### 5 Get details for a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo


### 6 Add user permission for a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. Find the users new team (permission)
1. Add the user to the team (orgs.addTeamMember)


### 6a Update user permission for a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. Find the users current team
1. Remove the user from the team (orgs.deleteTeamMember)
1. Find the users new team (permission)
1. Add the user to the team (orgs.addTeamMember)


### 6b Remove user access to a repo
1. Get a list of repos in the organization (repos.getFromOrg)
1. Find the appropriate repo
1. Get a list of teams in the organization (orgs.getTeams)
1. For each team associated with the repo
 1. Delete the team (orgs.deleteTeam)


# Mapping node-github to github
The following details the mapping between the node-github and github APIs.


##Users

There are two views in the permissive app. One of the views is centered on the Github members of an organization. 


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

There are two views in the permissive app. One of the views is centered on the Github repos that belong to an organization. 


### List of Repos

This method will be used to retrieve a list of all repos that belong to an organization.

* Github API - https://developer.github.com/v3/repos/#list-organization-repositories
* Github URL - GET /orgs/:org/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromOrg
* node-github method - repos.getFromOrg



## Teams/Members

Permissive will manage repo read/write/admin access via the construction of teams.


### List Teams

This method will retrieve a list of all teams that belong to an organization. Permissive will follow a format when naming teams so that it can filter out any team that it does not manage.

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


### Create Team

This method will create a new team. Github requires the authenticated user to be an owner of the org. The current permissive API does not require this functionality, but it will be a needed in the future.

* Github API - https://developer.github.com/v3/orgs/teams/#create-team
* Github URL - POST /orgs/:org/teams
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.createTeam
* node-github method - orgs.createTeam


### Delete Team

This method will delete an existing team. Github requires the authenticated user to be an owner of the org.

* Github API - https://developer.github.com/v3/orgs/teams/#delete-team
* Github URL - DELETE /teams/:id
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.deleteTeam
* node-github method - orgs.deleteTeam


### Add Member to Team **(deprecated)**

This method will add a member to the team. The authenticated user must have admin permissions for the team. This method is deprecated, and will not be in the next major release of the Github API.

* Github API - https://developer.github.com/v3/orgs/teams/#add-team-member
* Github URL - PUT /teams/:id/members/:username
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.addTeamMember
* node-github method - orgs.addTeamMember


### Add Membership to Team

This method will add a new member to the team. If the user is already a part of the team’s organization (meaning they’re on at least one other team in the organization), this endpoint will add the user to the team.

If the user is completely unaffiliated with the team’s organization (meaning they’re on none of the organization’s teams), this endpoint will send an invitation to the user via email. This newly-created membership will be in the “pending” state until the user accepts the invitation, at which point the membership will transition to the “active” state and the user will be added as a member of the team.

* Github API - https://developer.github.com/v3/orgs/teams/#add-team-membership
* Github URL - PUT /teams/:id/memberships/:username
* node-github - https://github.com/mikedeboer/node-github/issues/221


### Remove Member from Team **(deprecated)**

This method will remove a member from the team. The authenticated user must have admin permissions for the team. This method is deprecated, and will not be in the next major release of the Github API.

* Github API - https://developer.github.com/v3/orgs/teams/#remove-team-member
* Github URL - DELETE /teams/:id/members/:username
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.deleteTeamMember
* node-github method - orgs.deleteTeamMember


### Remove Membership from Team

This method will remove a member from the team. The authenticated user must have admin permissions for the team. 

* Github API - https://developer.github.com/v3/orgs/teams/#remove-team-membership
* Github URL - DELETE /teams/:id/memberships/:username
* node-github - https://github.com/mikedeboer/node-github/issues/221
