# Configuring the docker environment.

### For Linux you can install docker directly, but for mac and windows a linux vm is required to host the docker containers.

Installation instructions for mac and windows can be found;

here

https://docs.docker.com/installation/mac/

and here

https://docs.docker.com/installation/windows/

#### boot2docker information (if running mac / windows)
`boot2docker up` Stars the boot2docker vm for hosting docker containters.

`boot2docker shutdown` Stops the boot2docker vm.

`boot2docker status` Shows the status of the boot2docker vm.

`boot2docker restart` Restarts the boot2docker vm, this is required sometimes in order to get the network to work properly after the host machine has gone to sleep, or the network has restarted.

`boot2docker ip` Displays the ip address of the docker host vm. **This is important, as this will be the ip address that
needs to be visited in order to see permissive running instead vs looking at localhost.** It should also be noted, that this ip address should be mapped to the callback url that is used by the github app used for authenticating github.

### Building the docker container. (This assumes boot2docker is running and working as per the instructions above if you are
on mac or windows.)

#### background
Docker requires a container to be built in order for it to run our code. Our current scenario downloads a base image
that is listed in the Dockerfile. That image contains installations of node, gulp and bower. Once that images is
downloaded it then runs apt-get to install updates to the packages so we are using the latest versions. (This may not be
the desired behavior at some point, but during development it is how things are working.)

Once the container has been updated to use the newest versions of the software we need, it will run through the build
process using npm install and gulp, and when that is done the process is complete.

Note: This seems to have issues on slower network connections, and can take a few minutes to happen.

#### building
###### Note: Make sure the working directory is cleaned of the node_modules or there could be build errors because docker will copy the path supplied to the build command into the container, which will include node_modules if it has not been removed.

run the build command to create the docker container. The -t flag sets a tag for the container created, and the first argument to build tells it what path to look for the Dockerfile and files to copy into the container. When running a docker build from within the permisive directory run the following command.

`docker build -t="atsid/permissive" .`

#### Setting up the environment variables.

At this time the permissive configuration values will be set with an environment file when running from docker. In order
to do this a file with the following environment variables is needed.

```
GITHUB_ORG=<org name of repos to be managed.>
GITHUB_TOKEN=<auth token created by an admin user of the org. needed to have permission to edit permissions.>
GITHUB_CLIENTID=<github app client id, required for github authentication.>
GITHUB_CLIENT_KEY=<github app client secret, required for githb authentication.>
HOSTNAME=<host name of the app, this must match the host named in the githup client app.>
```
#### Running the docker container

###### Break down the run command.

docker run instructs docker to start an image.

the -d flag set's it to run in the background.

the -p flag and the arguments set it so the host will allow the ports to pass through to the ports the app has exposed. permissive uses port 3000, and that is what is exposed in our Dockerfile used for build so for our purposes it would be -p 3000:3000 in order to expose port 3000 on the docker container host and the docker container itself.

the --env-file <path> takes the path of the environment variables file.

atsid/permissive is the tag for the docker container we want to run.

###### Running the image

enter the following command to run the container in the background. (no logging will show up on the console this way.) 
`docker run -d -p <host port>:<container port> --env-file <path> atsid/permissive`

enter this command if you would prefer to see logging on the console.

`docker run -p <host port>:<container port> --env-file <path> atsid/permissive`

#### Checking the status of the container and stopping it.
`docker ps` this command will show a list of running containers along with information about port mapping if applicable.
docker kill <container id>; This will stop the container from running. (in some cases this may not be the preferred way
to stop the container, but for our service it is fine.)

#### Note that there is a separate Dockerfile in the package directory used for the build and deployment to AWS. 
The Dockerfile at the project root can be used for development and troubleshooting.
