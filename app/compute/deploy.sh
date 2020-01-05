#!/bin/bash
set -e -o verbose

VERSION=1.0.4
echo VERSION=$VERSION
docker build -t bioalign_compute .
docker tag bioalign_compute 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/compute:$VERSION
docker tag bioalign_compute 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/compute
docker push 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/compute:$VERSION
docker push 848798434565.dkr.ecr.us-east-1.amazonaws.com/bioalign/compute