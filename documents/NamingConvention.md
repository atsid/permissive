# Permissive App Naming Conventions

The following documents the naming conventions used by the Permissive app.


## Github Teams
Permissive is responsible for creating and managing teams on Github. Permissive presents the user with a streamlined UI, but behind the scenes Permissive is parasing and organizing quite a bit of Github data.


The format for the name of a team managed by permissive is as follows:
> [prefix]-[type]-[name]-[permission]


### [prefix]

The prefix is used to designate the teams that are managed by the Permissive app.
> "zzz-permissive"


### [type]

The type is used to determine if the team is associated to a single repository ("repo") or if the team is associated with a set of repositories ("project").
> "project", "repo"

*The initial deployment of the app will only provide support for "repo".*


### [name]

The name is the unique identifier for the team. This is the user facing part of the naming convention, and should be something along the lines of the name of associated app or project (e.g. "crewatlas" or "pe2e-ui").
> "*"


### [permission]

The Github permission granted to all members of the team for the associated repo.
> "admin", "write", "read"


### Github Team Name Examples


#### Single Repository (retrace)

1. zzz-permissive-repo-retrace-admin
2. zzz-permissive-repo-retrace-write
3. zzz-permissive-repo-retrace-read


#### Project with Multiple Repositories (pe2e)

1. zzz-permissive-project-pe2e-ui-admin
2. zzz-permissive-project-pe2e-ui-write
3. zzz-permissive-project-pe2e-ui-read
4. zzz-permissive-project-pe2e-server-admin
5. zzz-permissive-project-pe2e-server-write
6. zzz-permissive-project-pe2e-server-read
