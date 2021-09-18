## About the Project

This application is for users to get their best 9 photos in a grid layout. They will upload all
the photos they have and after uploading, we’ll let them select the best 9 photos and their order. They
can alter their selection and order anytime by visiting the application again.


 #### Attention


The provided endpoint ( https://dev-pb-apps.s3-eu-west-1.amazonaws.com/collection/CHhASmTpKjaHyAsSaauThRqMMjWanYkQ.json ) for getting uploaded photos retrieves entries with picture URL, https://placeimg.com/2560/2560/any. which generates a random picture every time it's called. Also, the id property can not be used to get a unique picture.
Therefore I had to optimize default JSON with uploaded photo details. It's served from one of the endpoints in Node Application. Below I have stated part of both JSON.

I utilized https://i.ibb.co to store photos and also to fetch them.

##### default JSON

```json
{
	"id": 2270,
	"code": "CHhASmTpKjaHyAsSaauThRqMMjWanYkQ",
	"startDate": 1578391244,
	"endDate": null,
	"author": {
		"id": "101",
		"createdAt": "2019-10-28 16:07:53",
		"name": "John Doe",
		"firstName": "John",
		"lastName": "Doe",
		"picture": "https://placeimg.com/640/640/people",
		"source": "Facebook",
		"lang": "eu",
		"country": "eu",
		"sourceId": "101030302",
		"email": "help@pastbook.com"
	},
	"cover": "https://placeimg.com/2560/2560/any",
	"is_shareable": true,
	"entries": [{
		"id": 204900037,
		"message": "",
		"picture": "https://placeimg.com/2560/2560/any",
		"pictureSmall": "",
		"pictureMedium": "",
		"pictureStored": "",
		"timestamp": 1578391381
	}]
}

```

##### optimized JSON

```json
{
	"id": 2270,
	"code": "CHhASmTpKjaHyAsSaauThRqMMjWanYkQ",
	"startDate": 1578391244,
	"endDate": null,
	"author": {
		"id": "101",
		"createdAt": "2019-10-28 16:07:53",
		"name": "John Doe",
		"firstName": "John",
		"lastName": "Doe",
		"picture": "https://placeimg.com/640/640/people",
		"source": "Facebook",
		"lang": "eu",
		"country": "eu",
		"sourceId": "101030302",
		"email": "help@pastbook.com"
	},
	"cover": "https://placeimg.com/2560/2560/any",
	"is_shareable": true,
	"entries": [{
		"id": "KKV8bt4",
		"message": "",
		"picture": "https://i.ibb.co",
		"pictureSmall": "",
		"pictureMedium": "",
		"pictureStored": "",
		"timestamp": 1578391381
	}]
}

```








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

`git clone https://github.com/hpbuddhika/photo-gallery.git`

### 2. Build image

`docker-compose build`

### 3. Start Application

`docker-compose up -d`

  
Without `-d` option, you can see stdout.  
`docker-compose up`

upon successful build completion, you can access the application on http://localhost


### 4. Stop Application

`docker-compose down`
