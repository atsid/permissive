# permissive
Permissions management console and services

Permissive is intended to simplify the GitHub user/team/repo permissions structure by presenting a flattened view of users and repos. Right now, GitHub forces you to use teams as a way of managing permissions, instead of allowing per-user repo settings (or per-repo user settings). This app will provide the translation services to map a flattened workflow to the teams structure, via the GitHub API.

Common use cases we will address initially:

1. New user: a new user has been added to your org, and needs permissions grants across various apps they are going to work on.
2. New repo: a new repo has been created, and users within your org need permissions granted to it.
3. Remove user: a user has been offboarded, and needs to be safely aremoved from all repo access.
4. Remove repo: a repo has been deleted. (This may work itself out automatically with no side effects.)

Permissive will provide a user interface for simple management of these use cases, and also provides a RESTful service API so that the functionality is available for other tooling with an organization.

## Getting Started

First, enable NodeJS harmony in your shell:

* alias node='node --harmony'
* alias gulp='node --harmony /usr/local/bin/gulp'

To run the application:

* npm install
* GITHUB_USER=<your username> GITHUB_PASSWORD=<your password> GITHUB_ORG=<your org> npm start

That should start the application using your credentials to interact with the GitHub API using basic auth.
