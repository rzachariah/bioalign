#!/bin/bash
set -e 

docker-compose up --build --abort-on-container-exit --exit-code-from bdd > /dev/null
docker logs bdd