#!/bin/bash
set -e
exec > /var/log/user-data.log 2>&1

apt update -y
apt install -y curl unzip

# install aws cli 
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
aws --version

# install docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
usermod -aG docker ubuntu
docker --version

# get private ip
AWS_API_TOKEN=$(curl -s -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 300")
MANAGER_PRIVATE_IP=$(curl -s -H "X-aws-ec2-metadata-token: $AWS_API_TOKEN" http://169.254.169.254/latest/meta-data/local-ipv4)

# swarm initialization
docker swarm init --advertise-addr $MANAGER_PRIVATE_IP
WORKER_TOKEN=$(docker swarm join-token worker -q)

# writing MANAGER_PRIVATE_IP and WORKER_TOKEN to ssm parameter store
aws ssm put-parameter --name "/docker/swarm/manager-private-ip" --value "$MANAGER_PRIVATE_IP" --type "SecureString" --overwrite
aws ssm put-parameter --name "/docker/swarm/worker-join-token" --value "$WORKER_TOKEN" --type "SecureString" --overwrite

mkdir -p /home/ubuntu/.docker
chown -R ubuntu:ubuntu /home/ubuntu/.docker