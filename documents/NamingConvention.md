# Permissive App Naming Conventions

Permissive is a streamlined UI for managing projects, teams and permissions on Github.  The following documents the naming conventions used by the Permissive app.


## Github Teams

The format for the name of a team managed by permissive is as follows:
> [prefix]-[type]-[repository name]-[permission]


### [prefix]

The prefix is used to designate the teams that are managed by the Permissive app.
> "zzz-permissive"


### [type]

The type is used to determine if the team is responsible for a single repository ("repo") or if the team is reponsible for a set of repositories ("project").
> "project", "repo"

*The initial deployment of the app will only provide support for "repo".*


### [repository name]

The repository name value is taken directly from the associated repository.
> "*"


### [permission]

The Github permission granted to all members of the team for the associated repo.
> "admin", "write", "read"


### Github Team Name Examples


#### Single Repository (retrace)

1. zzz-permissive-repo-retrace-admin
2. zzz-permissive-repo-retrace-write
3. zzz-permissive-repo-retrace-read


#### Project with Multiple Repositories (pe2e-ui, pe2e-server)

1. zzz-permissive-project-pe2e-ui-admin
2. zzz-permissive-project-pe2e-ui-write
3. zzz-permissive-project-pe2e-ui-read
4. zzz-permissive-project-pe2e-server-admin
5. zzz-permissive-project-pe2e-server-write
6. zzz-permissive-project-pe2e-server-read
