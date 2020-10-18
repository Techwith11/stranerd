# Stranerd

## Project setup


###### Download project
```
git clone 'https://github.com/kevinand11/stranerd'
```
###### Download development file server
```
git clone 'https://github.com/kevinand11/UploaderServer'
```


###### Install the main app and firebase-functions dependencies
```
cd stranerd\
npm install


cd firebase\functions\ && npm install && cd ..\..\

cd ..\
```


###### Install dependencies for file server
```
cd UploaderServer\
npm install
cd ..\
```


## Running app in development


###### Run file server with app simultaneously during development
```
cd UploaderServer\ && npm run start
```


###### Compiles and hot-reloads for development
```
cd stranerd\ && npm run serve
```

Note: If you plan on modifying the firebase functions already, you need to run a typescript watcher to compile the typescript down to JavaScript
```
cd stranerd\ && npm run watch:functions
```

Note: Ensure the following ports are free before starting both servers for development

File Server: 3000

Firebase UI: 4000

Firebase Hosting: 5000

Firebase Functions: 5001

Firebase Firestore: 5002

Firebase Database: 5003


## Development Practices
###### Linting
Vue cli does a good job of notifying you of linting errors during development. However, if you want to go the extra run, run the following command
```
cd stranerd\ && npm run lint
```

To lint firebase functions
```
cd stranerd\ && npm run lint:functions
```


## Building app for production

###### Compiles and minifies for production
```
cd stranerd\ && npm run build
```
This builds a minified version of the application, so you can get a feel of the application in production

###### Accessing built application
```
Visit http://localhost:5000 to view the application
```
The production build is served with firebase hosting, so ensure to build before accessing the hosting url


## Deployment
To deploy to Stranerd's production servers, push the code up to github and contact the adminstrator to review changes, merge and deploy.
```
Contact Email: kevinfizu@gmail.com
```


###### Personal Deployment
If you plan on deploying to a personal server,
- Create a personal github repository
- Create a personal firebase account
- Copy firebase project id into the default value in the .firebaserc file in the root directory
- Create a firebase service account, create a new json key from the service account,
encrypt the json value to base64 and create a new github secret named FIREBASE_TOKEN with the value, being the encrypted json
- Commit code and push to the master branch.
All necessary github actions have been set up to automatically deploy code from the master branch to firebase servers.
