## Requirement

* [Docker](https://www.docker.com)
* [Docker-Compose](https://docs.docker.com/compose/)
  
Unrecommended: Using on Windows Machine

## Container Architecture

See docker-compose.yml file

* client
  * React application container
  * Using Dockerfile in project root. 
* db
  * Database container
  * Using official docker image mongo.
* api
  * Node application container
  * Using Dockerfile in project root. 

## How to Use

### 1. Clone From Github

`git clone git@github.com:Mic-U/hanami-docker-compose-template.git`

### 2. Build Hanami image

`docker-compose build`

### 3. Start Application

`docker-compose up -d`

  
Without `-d` option, you can see stdout.  
`docker-compose up`


### 4. Stop Application

`docker-compose down`