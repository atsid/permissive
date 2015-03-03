# Sources
This document uses the following sources to map between the permissive API, github API, and the intermediate node-github API.


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


# Mapping permissive to node-github
The following details the node-github methods that will be called to fulfill the permissive APi call. With data caching, it is possible that not all node-github calls will be made.


## (1) Get a list of users
* orgs.getMembers


## (1a) Get a list of users (and permission for a specific repo)
* orgs.getMembers
* repos.getFromOrg
* repos.getTeams


## (2) Get details for a user
* user.getFrom


## (3) Add repo permission for a user
* repos.getTeams
* orgs.addTeamMember


## (3a) Update repo permission for a user
* repos.getTeams
* orgs.deleteTeamMember
* orgs.addTeamMember


## (4) Remove all repo access for a user
* repos.getFromUser
* orgs.deleteTeamMember


## (5) Get list of repos
* repos.getFromOrg


## (6) Get details for a repo
* repos.get


## (7) Add user permission for a repo
* repos.getTeams
* orgs.addTeamMember


## (7a) Update user permission for a repo
* repos.getTeams
* orgs.deleteTeamMember
* orgs.addTeamMember


## (8) Remove all user access to a repo
* repos.getTeams
* orgs.deleteTeam




# Mapping node-github to github 


##Users


### List of Users
* Github API - https://developer.github.com/v3/orgs/members/#members-list
* Github URL - GET /orgs/:org/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getMembers
* node-github method - orgs.getMembers


### Single User
* Github API - https://developer.github.com/v3/users/#get-a-single-user
* Github URL - GET /users/:username
* node-github API - http://mikedeboer.github.io/node-github/#user.prototype.getFrom
* node-github method - user.getFrom



## Repos


### List of Repos
* Github API - https://developer.github.com/v3/repos/#list-organization-repositories
* Github URL - GET /orgs/:org/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromOrg
* node-github method - repos.getFromOrg


### List of Repos by User
* Github API - https://developer.github.com/v3/repos/#list-user-repositories
* Github URL - GET /users/:username/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromUser
* node-github method - repos.getFromUser


### Single Repo by User
* Github API - https://developer.github.com/v3/repos/#get
* Github URL - GET /repos/:owner/:repo
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.get
* node-github method - repos.get



## Teams/Members


### List Teams by Repo
* Github API - https://developer.github.com/v3/repos/#list-teams
* Github URL - GET /repos/:owner/:repo/teams
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getTeams
* node-github method - repos.getTeams


### List Members by Team
* Github API - https://developer.github.com/v3/orgs/teams/#list-team-members
* Github URL - GET /teams/:id/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeamMembers
* node-github method - orgs.getTeamMembers


### Create Team
* Github API - https://developer.github.com/v3/orgs/teams/#create-team
* Github URL - POST /orgs/:org/teams
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.createTeam
* node-github method - orgs.createTeam


### Delete Team
* Github API - https://developer.github.com/v3/orgs/teams/#delete-team
* Github URL - DELETE /teams/:id
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.deleteTeam
* node-github method - orgs.deleteTeam


### Add Member to Team **(deprecated)**
* Github API - https://developer.github.com/v3/orgs/teams/#add-team-member
* Github URL - PUT /teams/:id/members/:username
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.addTeamMember
* node-github method - orgs.addTeamMember


### Add Membership to Team
* Github API - https://developer.github.com/v3/orgs/teams/#add-team-membership
* Github URL - PUT /teams/:id/memberships/:username
* node-github - https://github.com/mikedeboer/node-github/issues/221


### Remove Member from Team **(deprecated)**
* Github API - https://developer.github.com/v3/orgs/teams/#remove-team-member
* Github URL - DELETE /teams/:id/members/:username
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.deleteTeamMember
* node-github method - orgs.deleteTeamMember


### Remove Membership from Team
* Github API - https://developer.github.com/v3/orgs/teams/#remove-team-membership
* Github URL - DELETE /teams/:id/memberships/:username
* node-github - https://github.com/mikedeboer/node-github/issues/221





## MD Template

### 
* Github API - 
* Github URL - 
* node-github API - 
* node-github method - 
