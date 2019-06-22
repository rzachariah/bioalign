# bioalign
Find proteins containing a DNA sequence

## Overview
This application enables users to match DNA sequences with proteins. Given a DNA sequence as a string of nucleotides, it will search a protein database and return the name and location of a protein with a matching seqeunce, if found.

## Architecture
This is a web application backed by containerized microservices running on AWS. The browser client makes REST api calls to perform alignments and query their state. Compute intensive alignments are performed asynchronously by a separate compute service.

The front end is a React app that runs in the browser. The static content is deployed to S3.

The API is a NodeJs server with a Swagger documentation page.

The compute engine is a python microservice that uses the Biopython library to perform alignments.

The state of ongoing and completed alignments are stored in DynamoDB.

Both the API and Compute service run as containerized microservices on AWS Fargate.

## Getting Started
You can run this application locally with one command.
```
docker-compose up
```
Find the web UI at http://localhost:8080
Find the swagger documentation at http://localhost:3000

## Development Standards
We practice sustainable development: every commit should leave the codebase in a state ready to accept new work.

This application is designed to be modular and testable. There are separate folders for the various components

- *ui*: react app
- *api*: nodejs REST api
- *compute*: python compute server
- *db*: persistent storage

We use whitespace for tabs: 4 spaces.

## Testing
We write BDDs to test our application features. BDDs live in the tests folder.

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
