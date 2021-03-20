flask-react-nginx
=================

flask-react-nginx guide using docker-compose


## **see server Readme for how to set up enviroment before building the containers**
For sparing bandiwth and storage, I ommitted any node_modules and venv files form the containers. Those dependencies will be added on the build

client
------

The client directory was created using `create-react-app`. There are two Dockerfiles used for the client. One is for local development, using the npm development serer. The other builds the app into static files which are then serves them to nginx.

server
------

The server is responsible for exposing an api endpoint for client consumption. In this example, the client consumes the `/api/test/` endpoint in the `index.js` file.

Development
-----------

To build the development enviroments (fron this directory) either:
- type in the cli  `docker-compose -f conf/docker-dev.yml up`
- or run a script `./scripts/dev.sh`

* Note that the react development server will compile and refresh on file changes, also uses React.StrictMode*

In dev mode, it will also build a testing container.. however when building, it will just be built and then exited (not cluttering your terminal. You will have to activate it to use it

To turn on the testing container
- open a new terminal
- get a list of image names if you need `docker image ls`. It should be `conf_frontendtest` <dirname>_<servicename>
- start a container using that image `docker run -it conf_frontendtest bin\bash`
- start up your testing

Production
----------

To build a production enviroment, from this directory:
- `docker-compose -f conf/docker-prod.yml up`
- or the bash script`./scripts/prod.sh`
* Note production not build and not tested, but scripts and setup configs are, including

Usage
-----

- expose new api endpoints in the server view
- read from endpoints in client


You can access the dev server UI at localhost:3000

Seems like a lot of code? Meh. Most of it is out there. It is a lot of piecing together and copyPasta from these three sites.

- orig enviroment files form: [https://github.com/AndrewRPorter/flask-react-nginx] (https://github.com/AndrewRPorter/flask-react-nginx)
- ui components form: [https://material-ui.com/] (https://material-ui.com/)
- sendgrid files from: [https://github.com/sendgrid/sendgrid-python/] (https://github.com/sendgrid/sendgrid-python/)


