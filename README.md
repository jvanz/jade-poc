Swagger and Jade proof of concept
================================

This repository contains 3 applications to make a proof of concept about how
an web page and a CLI application can consume and interact with a backend
through an API.

As a proof of concept the application have not the goal to implement all features
and do not have preoccupation with appearance and performance. Maybe there are
some bug... who knows? ;)

Applications
-----------

### API

Inside `api` directory there is a application that handle the api. To do this
application was used the [Swagger](http://swagger.io/). Swagger is a framework
to help API development, it's allows developer to define the entire api using
YAML/JSON files and just implement the controller to handle the request

### Web

In the `web` directory is find the web application. This web server is developed
with node.js, more specific using [expressjs](http://expressjs.com/) to make the
request routing and [jade](http://jade-lang.com/) as template engine.

### CLI

The `cli` folder there is a simple python application to fetch, show and delete
data through the API.


### Running
#### Prerequisite

* [Docker](https://docs.docker.com/)
* [Docker compose](https://docs.docker.com/compose/)

#### Web and API

To make the deploy and development proccess easier,
[docker compose](https://docs.docker.com/compose/) is being used to run 3
containers. One running nginx, other the API app and another the web app.

`docker-compose -f support/docker-compose.yml up -d`

The `-d` flag is optional. However, if it is not present the terminal
will be block

Once the three containers are up and running the web page will be available
at `http://localhost:8080`

#### CLI

To run the CLI it necessary that the API is already running to avoid crashes.
*As a curses app, CLI problably only works in Unix systems*
To run the CLI run:

`python3 cli/cli.py`

In the CLI app use the following key to navigate:

* arrow-up: move in menu options and table row
* arrow-down: move in menu options and table row
* arrow-left: navigate in table pages
* arrow-right: navigate in table pages
* HOME: open menu
* d: delete selected table row
