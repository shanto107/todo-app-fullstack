terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "practice-profile"
}

# vpc
module "vpc" {
  source         = "../terraform/modules/vpc"
  name           = "${var.project_name}-vpc"
  vpc_cidr_block = var.vpc_cidr_block
}

# public subnet
module "public_subnet" {
  source                  = "../terraform/modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.public_cidr_blocks[0]
  availability_zone       = var.availabiliy_zones[0]
  map_public_ip_on_launch = true
  name                    = "${var.project_name}-public-subnet"
}

# internet gateway
module "igw" {
  source = "../terraform/modules/igw"
  vpc_id = module.vpc.vpc_id
  name   = "${var.project_name}-igw"
}

# route table for public subnet and igw
module "public_route_table" {
  source     = "../terraform/modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "igw"
  gateway_id = module.igw.igw_id
  subnet_id  = module.public_subnet.subnet_id
  name       = "${var.project_name}-public-rt"
}


# security group for docker swarm manager server
module "docker_manager_security_group" {
  source      = "../terraform/modules/security_group"
  name        = "${var.project_name}-docker-manager-sg"
  vpc_id      = module.vpc.vpc_id
  description = "Security group for docker swarm manager"
  ingress_rules = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      description = "http"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      description = "https"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      description = "ssh"
    }
  ]
}

# docker manager aws instance
module "docker_manager_instance" {
  source                      = "../terraform/modules/ec2"
  name                        = "${var.project_name}-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.public_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.docker_manager_security_group.sg_id]
  user_data                   = file("${path.module}/user_data/docker_setup.sh")
}
