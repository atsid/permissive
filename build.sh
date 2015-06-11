if [ -f /usr/bin/apt-get ]
then
    apt-get install ca-certificates
fi

# Install NodeJS
node_version=0.10.32
if [ ! -e node-v$node_version-linux-x64.tar.gz ]
then
    mkdir .npm node_lib
    wget https://nodejs.org/dist/v$node_version/node-v$node_version-linux-x64.tar.gz
    tar xf node-v$node_version-linux-x64.tar.gz
    mv node-v* node_lib
fi

export PATH=$WORKSPACE/node_lib/node-v$node_version-linux-x64/bin:$PATH

npm config set dev false
# Make the node installation local to this Workspace
npm config set prefix $WORKSPACE/node_lib/node-v$node_version-linux-x64
# Make the npm installation local to this Workspace
npm config set cache $WORKSPACE/.npm

#Update away from problematic npm ver (1.4.x)
npm install -g  npm@2.1.4
npm install
npm test
