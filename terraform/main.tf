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
  region = var.aws_region
  profile = "practice-profile"
}

module "vpc" {
  source = "./modules/vpc"

  project_name = var.project_name
  cidr_blocks = var.cidr_blocks
  availability_zones = var.availability_zones
}

module "security_group" {
    source = "./modules/security_group"

    project_name = var.project_name
    vpc_id = module.vpc.vpc_id
    own_ip = var.own_ip
}

module "ec2" {
    source = "./modules/ec2"

    project_name = var.project_name
    ami_id = var.ami_id
    instance_type = var.instance_type
    vpc_id = module.vpc.vpc_id
    subnet_id = module.vpc.subnet_id
    security_group_ids = [module.security_group.security_group_id]
    key_name = var.key_name
    user_data_path     = "${path.module}/user_data/frontend.sh"
}

