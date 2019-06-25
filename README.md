# bioalign
Find protein containing a DNA sequence

## Overview
This application enables users to match DNA sequences with proteins. Given a DNA sequence as a string of nucleotides (eg `AATCGTTTA`), it will search a protein database and return the name and location of a protein with a matching seqeunce, if found.

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

## Run it locally
docker-compose allows us to build and run the application in one command
```
docker-compose up --build
```
or, if that's too much to type
```
./run.sh
```
Find the web UI at http://localhost:3000
Find the swagger documentation at http://localhost:4000/api/v1

This application depends on some AWS resources, which you will not have access to. You will see AWS access errors in the logs for api and compute--the compute service will terminate due to this issue. This is a known issue. See TODO.

## Testing 
This app includes BDD testing infrastructure in the `tests/bdd` folder. To test the app
```
./test.sh
```

## Queueing
Alignment requests are sent from the api to the compute engine via an AWS SQS queue called `align-request`. The queue allows us to decouple the api from the compute engine. Each can be scaled independently. In addition, the queue provides load leveling. If there is a sudden burst of requests, these will be queued without impacting the ability of the application to receive more requests.

There are tradeoffs here. A cloud should be as simple as possible, and we've chosen to add additional components. The queue interaction makes the API of the compute engine opaque. Testing is more of a challenge.

An example message payload looks like this.
```
{
    "taskId": "4ee74481-70d5-4c31-8e46-5bd47716e345",
    "sequence": "AAACCCTGTG"
}
```

## Storage
This application persists data to two DynamoDB tables.

An `Alignments` table with hash key `date` and sort field `time`. The `date` provides a nice partition of the data set. The intention is that we will query for alignments by date, and show just recent alignments on the dashboard.

A `Tasks` table with hash key `taskId`. We query for task status by specific taskId.

In principle, these two tables could be combined into one, so there is a tradeoff here. I chose to keep these separate to enable different access patterns. Also, these two kinds of data are treated differently. Alignment data is treated as durable and immutable. Task data is treated as transient and mutable. Task data could be extracted into a redis cache with a TTL.

## Images
There are image snips of various `components` in the images folder.

## TODO
- HTTPS (Don't type your password in the search box)
- CDN for web acceleration (Cloudfront)
- DNS for a nicer URL (Route53)
- Mock AWS locally, so that someone other than me can use the stack locally
- Cleanly extract configuration as environment variables
- DynamoDB query by alignment hash (date)
- CI/CD
- Comprehensive BDD coverage
- Authentication
- Improved logging
- Monitoring/Alerting
- Service proxy for distributed tracing/microservice resiliency
- Performance test gate
- Scalability test gate
- Chaos testing
- Map/reduce of alignment computation (can check for alignment on each protein independently)

## Doctrine
In this repo we practice sustainable development: every commit should leave the codebase in a state ready to accept new work.

We prefer small evolutionary changes to large revolutionary ones.

We build small services that do one thing well--i.e. microservices.

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
