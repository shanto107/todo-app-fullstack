#!/bin/bash
set -e
exec > /var/log/user-data.log 2>&1

apt update -y
apt install -y curl

curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
usermod -aG docker ubuntu

docker swarm init
mkdir -p /home/ubuntu/.docker
chown -R ubuntu:ubuntu /home/ubuntu/.docker