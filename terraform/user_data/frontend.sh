#!/bin/bash

apt update && sudo apt upgrade -y
apt install nginx -y
systemctl start nginx
systemctl enable nginx