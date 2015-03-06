[![Build Status](https://travis-ci.org/atsid/permissive.svg?branch=master)](https://travis-ci.org/atsid/permissive)
[![Coverage Status](https://coveralls.io/repos/atsid/permissive/badge.svg?branch=master)](https://coveralls.io/r/atsid/permissive?branch=master)
[![Dependency Status](https://david-dm.org/atsid/permissive.svg)](https://david-dm.org/atsid/permissive)

# permissive
Permissions management console and services

Permissive is intended to simplify the GitHub user/team/repo permissions structure by presenting a flattened view of users and repos. Right now, GitHub forces you to use teams as a way of managing permissions, instead of allowing per-user repo settings (or per-repo user settings). This app will provide the translation services to map a flattened workflow to the teams structure, via the GitHub API.

Common use cases we will address initially:

1. New user: a new user has been added to your org, and needs permissions grants across various apps they are going to work on.
2. New repo: a new repo has been created, and users within your org need permissions granted to it.
3. Remove user: a user has been offboarded, and needs to be safely removed from all repo access.
4. Remove repo: a repo has been deleted. (This may work itself out automatically with no side effects.)

Permissive will provide a user interface for simple management of these use cases, and also provides a RESTful service API so that the functionality is available for other tooling with an organization.

## Getting Started

We use [Vagrant](http://vagrantup.com) to manage our local development environments. To get started, just launch:

    vagrant up

That'll grab a recent Ubuntu 14.04 (trusty) 64-bit base image, provision it with node.js v0.12, and pull all the dependencies for the permissive app.

To run the application:

    vagrant ssh
    cd /vagrant

Then:

    GITHUB_USER=<your username> GITHUB_PASSWORD=<your password> GITHUB_ORG=<your org> npm start

or

    GITHUB_TOKEN=<your token> GITHUB_ORG=<your org> npm start

You can use either basic authentication (username/password) or an OAuth token to authenticate with the GitHub API.

As you develop, you can pull down the latest dependencies with either `npm install` from within the Vagrant VM or `vagrant provision` from your host.
