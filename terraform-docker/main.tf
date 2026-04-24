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

# public subnet 1
module "public_subnet" {
  source                  = "../terraform/modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.public_cidr_blocks[0]
  availability_zone       = var.availabiliy_zones[0]
  map_public_ip_on_launch = true
  name                    = "${var.project_name}-public-subnet-az1"
}

# public subnet 2
module "public_subnet_backup" {
  source                  = "../terraform/modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.public_cidr_blocks[1]
  availability_zone       = var.availabiliy_zones[1]
  map_public_ip_on_launch = true
  name                    = "${var.project_name}-public-subnet-az2"
}


# internet gateway
module "igw" {
  source = "../terraform/modules/igw"
  vpc_id = module.vpc.vpc_id
  name   = "${var.project_name}-igw"
}

# route table for public subnet and igw
module "public_subnet_route_table" {
  source     = "../terraform/modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "igw"
  gateway_id = module.igw.igw_id
  subnet_id  = module.public_subnet.subnet_id
  name       = "${var.project_name}-public-rt"
}

module "public_subnet_backup_route_table" {
  source     = "../terraform/modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "igw"
  gateway_id = module.igw.igw_id
  subnet_id  = module.public_subnet_backup.subnet_id
  name       = "${var.project_name}-public-backup-rt"
}

# security group for application load balancer
module "alb_security_group" {
  source      = "../terraform/modules/security_group"
  name        = "${var.project_name}-swarm-alb-sg"
  vpc_id      = module.vpc.vpc_id
  description = "ALB Security Group"
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
    }
  ]
}


# security group for docker swarm manager server
module "docker_swarm_security_group" {
  source      = "../terraform/modules/security_group"
  name        = "${var.project_name}-docker-swarm-sg"
  vpc_id      = module.vpc.vpc_id
  description = "Security group for docker swarm manager and worker"
  ingress_rules = [
    {
      from_port              = 80
      to_port                = 80
      protocol               = "tcp"
      source_security_groups = [module.alb_security_group.sg_id]
      cidr_blocks            = []
      self                   = false
      description            = "http"
    },
    {
      from_port              = 22
      to_port                = 22
      protocol               = "tcp"
      source_security_groups = []
      cidr_blocks            = ["0.0.0.0/0"]
      self                   = false
      description            = "ssh"
    },
    {
      from_port              = 2377
      to_port                = 2377
      protocol               = "tcp"
      source_security_groups = []
      cidr_blocks            = []
      self                   = true
      description            = "swarm cluster management"
    },
    {
      from_port              = 7946
      to_port                = 7946
      protocol               = "tcp"
      source_security_groups = []
      cidr_blocks            = []
      self                   = true
      description            = "swarm node communication tcp"
    },
    {
      from_port              = 7946
      to_port                = 7946
      protocol               = "udp"
      source_security_groups = []
      cidr_blocks            = []
      self                   = true
      description            = "swarm node communication udp"
    },
    {
      from_port              = 4789
      to_port                = 4789
      protocol               = "udp"
      source_security_groups = []
      cidr_blocks            = []
      self                   = true
      description            = "swarm overlay network"
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
  depends_on = [module.docker_manager_instance]
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
  depends_on = [module.docker_manager_instance]
}

# data source from aws rotue53 hosted zone 
data "aws_route53_zone" "main" {
  name         = var.hosted_zone
  private_zone = false
}

# creating alb-target-group
resource "aws_lb_target_group" "alb_tg" {
  name     = "${var.project_name}-alb-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  health_check {
    enabled             = true
    interval            = 30
    path                = "/"
    protocol            = "HTTP"
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200"
  }

  tags = {
    Name = "${var.project_name}-alb-tg"
  }
}

# attaching target groups
resource "aws_lb_target_group_attachment" "swarm_worker_01_attachment" {
  target_group_arn = aws_lb_target_group.alb_tg.arn
  target_id        = module.docker_worker_app_instance_01.instance_id
  port             = 80
}

resource "aws_lb_target_group_attachment" "swarm_worker_02_attachment" {
  target_group_arn = aws_lb_target_group.alb_tg.arn
  target_id        = module.docker_worker_app_instance_02.instance_id
  port             = 80
}

# creating application-load-balancer
resource "aws_lb" "alb" {
  name                       = "${var.project_name}-swarm-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [module.alb_security_group.sg_id]
  subnets                    = [module.public_subnet.subnet_id, module.public_subnet_backup.subnet_id]
  enable_deletion_protection = false

  tags = {
    Name = "${var.project_name}-swarm-alb"
  }
}

# alb-listener for http 
resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# alb-listener for https
resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.acm_certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb_tg.arn
  }
}

# route53 alias record
resource "aws_route53_record" "route53_record" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}
