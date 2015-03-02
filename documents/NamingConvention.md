# Permissive App Naming Conventions


## Github Teams

> [prefix]-[type]-[name]-[permission]


### [prefix]
* "zzz-permissive"

The prefix is used to designate the teams that are managed by the Permissive app.


### [type]
* "project"
* "repo"

The type is used to determine if the team is associated to a single repository ("repo") or if the team is associated with a set of repositories ("project").
*The initial deployment of the app will only provide support for "repo".*


### [name]
* "*"

The name is the unique identifier for the team. This is the user facing part of the naming convention, and should be something along the lines of the name of associated app or project (e.g. "crewatlas" or "pe2e-ui").


### [permission]
* "admin"
* "write"
* "read"

The Github permission granted to all members of the team for the associated repo.


### Examples


#### Single Repository (retrace)

* zzz-permissive-repo-retrace-admin
* zzz-permissive-repo-retrace-write
* zzz-permissive-repo-retrace-read


#### Project with Multiple Repositories (pe2e)

* zzz-permissive-project-pe2e-ui-admin
* zzz-permissive-project-pe2e-ui-write
* zzz-permissive-project-pe2e-ui-read

* zzz-permissive-project-pe2e-server-admin
* zzz-permissive-project-pe2e-server-write
* zzz-permissive-project-pe2e-server-read
