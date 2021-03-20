This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# How to run test when building in Docker development

- have the containers run
find the name container of the dev enviroment `docker container ls`

open new terminal and get into the `docker exec -v <this_dir>/client:/usr/app -it <container name> \bin\bash`
you must attach volumes for watches to work. `--watchAll` might be too slow, but you can watch files

now run the tests  `npm test` or `npm test --watch` or `npm test --watchAll`
press enter or follow options in terminal to keep re-triggering tests

# want this to work?

You need to make a couple of changes here, just like you have to in the server
- You must replace the value of 'sender_email' to a validated sender email from your sendgrid
    line 17 on `<root_dir>/src/utils/appReducer.js`
- You must also use that same email into the array of valid email for i to pass the extra validation step
    line 177 of the same file
