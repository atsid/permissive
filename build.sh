npm install -g gulp
npm install bower

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