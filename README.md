[![Build Status](https://travis-ci.org/atsid/permissive.svg?branch=master)](https://travis-ci.org/atsid/permissive)
[![Test Coverage](https://codeclimate.com/github/atsid/permissive/badges/coverage.svg)](https://codeclimate.com/github/atsid/permissive)
[![Code Climate](https://codeclimate.com/github/atsid/permissive/badges/gpa.svg)](https://codeclimate.com/github/atsid/permissive)
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

## Using Docker... If you are going to use docker please see the DockerReadme.md instead of the below comments.


## Getting Started

We use [Vagrant](http://vagrantup.com) to manage our local development environments. To get started, just launch:

    vagrant up

That'll grab a recent Ubuntu 14.04 (trusty) 64-bit base image, provision it with node.js v0.12, and pull all the dependencies for the permissive app.

To run the application:

    vagrant ssh
    cd /vagrant

Then:

    <environment vars> npm start

The required environment vars are:

* GITHUB_ORG: This is the org name to manage.
* GITHUB_TOKEN: You need to use an OAuth token to authenticate with the GitHub API. This token must have **owner** permissions against the org, or else team management cannot be performed.
* GITHUB_CLIENTID: This is the application OAuth ID provided by GitHub when you register the application.
* GITHUB_CLIENT_KEY: This is the application OAuth secrect key provided by GitHub when you register the application.

If you instead choose to run with mock services that don't interact with the live GitHub API, you can ignore those params and use these instead:

* SERVICE=mock: Setting 'mock' here will toggle the services to swap in a mock impl.
* GITHUB_USERNAME: Put in one of the mock usernames to simulate interaction as, because there won't be live auth (testuser1, testuser2, or testuser3). Default=testuser3.

As you develop, you can pull down the latest dependencies with either `npm install` from within the Vagrant VM or `vagrant provision` from your host.

### Configuration

The environment variables mentioned above can also be supplied in json files. Currently, they must reside in the app/server/config folder.
There is a 'mock.json' file there now that makes it easy to start the app with the mock data (`ENV=mock npm start`).
Note that you can add any environment files you'd like in the config folder and then use the **ENV** environment variable to toggle it on.
However, there is a special env name: **local** that has been added to gitignore. So if you create a `local.json` file in the config folder,
you can use it to store dev settings without worrying about them getting checked into git.

###Angular UI

Scaffolding for a UI is in place, but full build system integration is not yet complete. To get started in the meantime:

Get your server running using the starter instructions above.
Open a new cmd tab, then:

    cd app/client
    bower install
    ../../node_modules/.bin/gulp
    
That'll start a watcher that compiles the client and serves it up.
