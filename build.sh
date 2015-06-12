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
npm install gulp --allow-root
npm install bower --allow-root
npm install

export PATH=node_modules/gulp/bin/:$PATH
export PATH=node_modules/bower/bin/:$PATH
bower update # make sure packages are up to date.

npm test

npm install --production
cd app/client && gulp --release
cd ../../
cp -R ./package ./target
cp package.json app.js ./target
cp -R ./node_modules ./target
cp -R ./app ./target/app

cd ./target
zip -r ../permissive.zip .
