#!/bin/bash
set -e

echo "docker node labelling start. 🚀"

docker node update --label-add role=db-node db-host
docker node update --label-add role=app-node app-host-01
docker node update --label-add role=app-node app-host-02

echo "docker node labelling successful. 🎉"