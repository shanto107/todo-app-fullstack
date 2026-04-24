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
module "docker_swarm_security_group" {
  source      = "../terraform/modules/security_group"
  name        = "${var.project_name}-docker-swarm-sg"
  vpc_id      = module.vpc.vpc_id
  description = "Security group for docker swarm manager and worker"
  ingress_rules = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      self        = false
      description = "http"
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      self        = false
      description = "https"
    },
    {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      self        = false
      description = "ssh"
    },
    {
      from_port   = 2377
      to_port     = 2377
      protocol    = "tcp"
      cidr_blocks = []
      self        = true
      description = "swarm cluster management"
    },
    {
      from_port   = 7946
      to_port     = 7946
      protocol    = "tcp"
      cidr_blocks = []
      self        = true
      description = "swarm node communication tcp"
    },
    {
      from_port   = 7946
      to_port     = 7946
      protocol    = "udp"
      cidr_blocks = []
      self        = true
      description = "swarm node communication udp"
    },
    {
      from_port   = 4789
      to_port     = 4789
      protocol    = "udp"
      cidr_blocks = []
      self        = true
      description = "swarm overlay network"
    }
  ]
}

# ssm role allowing ec2 instances to read from and write to the parameter store

module "ec2_ssm_role" {
  source    = "../terraform/modules/iam-role"
  role_name = "${var.project_name}-ssm-role"
  principals = {
    Service = "ec2.amazonaws.com"
  }
  policy_name = "${var.project_name}-ssm-role-policy"
  inline_policy = jsonencode(
    {
      Version = "2012-10-17"
      Statement = [
        {
          Effect = "Allow"
          Action = [
            "ssm:GetParameter",
            "ssm:GetParameters",
            "ssm:PutParameter"
          ]
          Resource = "arn:aws:ssm:${var.aws_region}:${var.aws_account_id}:parameter/docker/swarm/*"
        }
      ]
    }
  )
  instance_profile_name = "${var.project_name}-ssm-profile"
}

# docker manager aws instance
module "docker_manager_instance" {
  source                      = "../terraform/modules/ec2"
  name                        = "${var.project_name}-swarm-manager-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.public_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.docker_swarm_security_group.sg_id]
  iam_instance_profile        = module.ec2_ssm_role.instance_profile_name
  user_data                   = file("${path.module}/user_data/docker_manager_setup.sh")
}

# docker worker aws instances
module "docker_worker_db_instance" {
  source                      = "../terraform/modules/ec2"
  name                        = "${var.project_name}-swarm-worker-db-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.public_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.docker_swarm_security_group.sg_id]
  iam_instance_profile        = module.ec2_ssm_role.instance_profile_name
  user_data = templatefile("${path.module}/user_data/docker_worker_setup.sh", {
    hostname = "db-host"
  })
  depends_on = [module.docker_manager_instance]
}

module "docker_worker_app_instance_01" {
  source                      = "../terraform/modules/ec2"
  name                        = "${var.project_name}-swarm-worker-app-server-01"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.public_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.docker_swarm_security_group.sg_id]
  iam_instance_profile        = module.ec2_ssm_role.instance_profile_name
  user_data = templatefile("${path.module}/user_data/docker_worker_setup.sh", {
    hostname = "app-host-01"
  })
  depends_on                  = [module.docker_manager_instance]
}

module "docker_worker_app_instance_02" {
  source                      = "../terraform/modules/ec2"
  name                        = "${var.project_name}-swarm-worker-app-server-02"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.public_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.docker_swarm_security_group.sg_id]
  iam_instance_profile        = module.ec2_ssm_role.instance_profile_name
  user_data = templatefile("${path.module}/user_data/docker_worker_setup.sh", {
    hostname = "app-host-02"
  })
  depends_on                  = [module.docker_manager_instance]
}
