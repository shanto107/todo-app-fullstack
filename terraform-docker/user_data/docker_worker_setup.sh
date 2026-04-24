#!/bin/bash
set -e
exec > /var/log/user-data.log 2>&1

# setting hostname
HOSTNAME="${hostname}"
hostnamectl set-hostname "$HOSTNAME"
echo "127.0.1.1 $HOSTNAME" >> /etc/hosts 

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

# Reading MANAGER_PRIVATE_IP and WORKER_TOKEN to ssm parameter store
for i in {1..20}; do
    WORKER_TOKEN=$(aws ssm get-parameter --name "/docker/swarm/worker-join-token" --with-decryption --query "Parameter.Value" --output text) && break
    sleep 10
done

MANAGER_PRIVATE_IP=$(aws ssm get-parameter --name "/docker/swarm/manager-private-ip" --with-decryption --query "Parameter.Value" --output text)

# joning the instance to swarm as a worker
docker swarm join --token $WORKER_TOKEN $MANAGER_PRIVATE_IP:2377

mkdir -p /home/ubuntu/.docker
chown -R ubuntu:ubuntu /home/ubuntu/.docker