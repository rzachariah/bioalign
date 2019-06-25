# bioalign
Find protein containing a DNA sequence

## Overview
This application enables users to match DNA sequences with proteins. Given a DNA sequence as a string of nucleotides, it will search a protein database and return the name and location of a protein with a matching seqeunce, if found.

## Try it out!
http://bioalign.s3.amazonaws.com/index.html

## Architecture
This is a web application backed by containerized microservices running on AWS. The browser client makes REST api calls to perform alignments and query their state. Compute intensive alignments are performed asynchronously by a separate compute service.

The front end is a React app that runs in the browser. The static content is deployed to S3.

The API is a NodeJs server with a Swagger documentation page.

The compute engine is a python microservice that uses the Biopython library to perform alignments.

Alignment requests are sent from the api to the compute engine via an sqs queue.

The state of ongoing and completed alignments is stored in DynamoDB.

Both the api and compute services run as containerized microservices on AWS Fargate.

## Organization

This application is designed to be modular and testable. There are separate folders for the various components

- **ui**: react app
- **api**: nodejs REST api
- **compute**: python compute server
- **bdd**: BDD tests

## Doctrine
In this repo we practice sustainable development: every commit should leave the codebase in a state ready to accept new work.

We prefer small evolutionary changes to large revolutionary changes.

We build small services that do one thing well--i.e. microservices.

## Run it locally
docker-compose allows us to build and run the application in one command
```
docker-compose up --build
```
or, if that's too much to type
```
run.sh
```
[](images/docker-compose.png)
Find the web UI at http://localhost:3000
Find the swagger documentation at http://localhost:4000
[](images/swagger.png)

## Testing 
New features should be validated with BDDs living in the tests folder. To test the app
```
./test.sh
```

## Contributing
1. Clone it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History
06/22/2019    Born

## Credits
Ranjith Zachariah
