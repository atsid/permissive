npm test

npm install --production
cd app/client && gulp --release
cd ../../
cp -R ./package ./target
cp package.json app.js ./target
cp -R ./node_modules ./target
cp -R ./app ./target/app

cd ./target
zip -q -r ../permissive.zip .