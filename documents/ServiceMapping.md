#Sources

Github API
> https://developer.github.com/v3/repos/

node-github repo
> https://github.com/mikedeboer/node-github

node-github API
> http://mikedeboer.github.io/node-github/

node-github routes.json
> https://github.com/mikedeboer/node-github/blob/master/api/v3.0.0/routes.jsons



#Users


##List of Users
* Github API - https://developer.github.com/v3/users/#get-all-users
* Github URL - GET /users
* node-github API - ?
* node-github method - ?


##List of Users by Org
* Github API - https://developer.github.com/v3/orgs/members/#members-list
* Github URL - GET /orgs/:org/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getMembers
* node-github method - orgs.getMembers


##Single User
* Github API - https://developer.github.com/v3/users/#get-a-single-user
* Github URL - GET /users/:username
* node-github API - http://mikedeboer.github.io/node-github/#user.prototype.getFrom
* node-github method - user.getFrom



#Repos


##List of Repos by Org
* Github API - https://developer.github.com/v3/repos/#list-organization-repositories
* Github URL - GET /orgs/:org/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromOrg
* node-github method - repos.getFromOrg


##List of Repos by User
* Github API - https://developer.github.com/v3/repos/#list-user-repositories
* Github URL - GET /users/:username/repos
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getFromUser
* node-github method - repos.getFromUser


##Single Repo by User
* Github API - https://developer.github.com/v3/repos/#get
* Github URL - GET /repos/:owner/:repo
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.get
* node-github method - repos.get



#Teams/Members


## List Teams by Repo
* Github API - https://developer.github.com/v3/repos/#list-teams
* Github URL - GET /repos/:owner/:repo/teams
* node-github API - http://mikedeboer.github.io/node-github/#repos.prototype.getTeams
* node-github method - repos.getTeams


## List Team Members by Team
* Github API - https://developer.github.com/v3/orgs/teams/#list-team-members
* Github URL - GET /teams/:id/members
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.getTeamMembers
* node-github method - orgs.getTeamMembers


## Create Team
* Github API - https://developer.github.com/v3/orgs/teams/#create-team
* Github URL - POST /orgs/:org/teams
* node-github API - http://mikedeboer.github.io/node-github/#orgs.prototype.createTeam
* node-github method - orgs.createTeam


## Add User to Team
* Github API - https://developer.github.com/v3/orgs/teams/#add-team-membership
* Github URL - PUT /teams/:id/memberships/:username
* node-github API - ? (library only contains the deprecated method)
* node-github method - ? (library only contains the deprecated method)


## Remove User from Team
* Github API - https://developer.github.com/v3/orgs/teams/#remove-team-membership
* Github URL - DELETE /teams/:id/memberships/:username
* node-github API -  ? (library only contains the deprecated method)
* node-github method -  ? (library only contains the deprecated method)
