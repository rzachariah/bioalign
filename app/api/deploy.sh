#!/bin/bash
set -e -o verbose

VERSION=1.0.8
echo VERSION=$VERSION
docker build -t bioalign_api .
docker tag bioalign_api 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/api:$VERSION
docker tag bioalign_api 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/api
docker push 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/api:$VERSION
docker push 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/api