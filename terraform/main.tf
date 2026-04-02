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
  source         = "./modules/vpc"
  vpc_cidr_block = var.vpc_cidr_block
  name           = "${var.project_name}-vpc"
}

# public subnet for frontend
module "frontend_public_subnet_az1" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.public_subnet_cidr_blocks[0]
  availability_zone       = var.availability_zones[0]
  map_public_ip_on_launch = true
  name                    = "${var.project_name}-frontend-public-subnet_az1"
}

module "frontend_public_subnet_az2" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.public_subnet_cidr_blocks[1]
  availability_zone       = var.availability_zones[1]
  map_public_ip_on_launch = true
  name                    = "${var.project_name}-frontend-public-subnet_az2"
}


# private subnet for backend
module "backend_private_subnet" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.private_subnet_cidr_blocks[0]
  availability_zone       = var.availability_zones[0]
  map_public_ip_on_launch = false
  name                    = "${var.project_name}-backend-private-subnet"
}

#private subnet for database
module "db_private_subnet" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = var.private_subnet_cidr_blocks[1]
  availability_zone       = var.availability_zones[0]
  map_public_ip_on_launch = false
  name                    = "${var.project_name}-backend-db-subnet"
}

#internet gateway for public subnet 
module "igw" {
  source = "./modules/igw"
  vpc_id = module.vpc.vpc_id
  name   = "${var.project_name}-igw"
}

# nat-gateway for private subnet
module "ngw" {
  source    = "./modules/ngw"
  subnet_id = module.frontend_public_subnet_az1.subnet_id
  name      = "${var.project_name}-ngw"
}

# route table for public subnet and igw
module "public_route_table_az1" {
  source     = "./modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "igw"
  gateway_id = module.igw.igw_id
  subnet_id  = module.frontend_public_subnet_az1.subnet_id
  name       = "${var.project_name}-public-rt-az1"
}

module "public_route_table_az2" {
  source     = "./modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "igw"
  gateway_id = module.igw.igw_id
  subnet_id  = module.frontend_public_subnet_az2.subnet_id
  name       = "${var.project_name}-public-rt-az2"
}

# route table for private subnet and ngw

module "backend_private_route_table" {
  source     = "./modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "ngw"
  gateway_id = module.ngw.nat_gateway_id
  subnet_id  = module.backend_private_subnet.subnet_id
  name       = "${var.project_name}-backend-private-rt"
}

module "db_private_route_table" {
  source     = "./modules/route_table"
  vpc_id     = module.vpc.vpc_id
  route_type = "ngw"
  gateway_id = module.ngw.nat_gateway_id
  subnet_id  = module.db_private_subnet.subnet_id
  name       = "${var.project_name}-db-private-rt"
}

# security group for application load balancer 
module "alb_security_group" {
  source      = "./modules/security_group"
  name        = "${var.project_name}-alb-sg"
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


# security group for frontend
module "frontend_security_group" {
  source      = "./modules/security_group"
  name        = "${var.project_name}-frontend-sg"
  vpc_id      = module.vpc.vpc_id
  description = "Frontend Security Group"
  ingress_rules = [
    {
      from_port              = 80
      to_port                = 80
      protocol               = "tcp"
      cidr_blocks            = []
      source_security_groups = [module.alb_security_group.sg_id]
      description            = "http"
    },
    {
      from_port              = 22
      to_port                = 22
      protocol               = "tcp"
      cidr_blocks            = ["0.0.0.0/0"]
      source_security_groups = []
      description            = "ssh"
    }
  ]
}

# security group for backend
module "backend_security_group" {
  source      = "./modules/security_group"
  name        = "${var.project_name}-backend-sg"
  vpc_id      = module.vpc.vpc_id
  description = "Backend Security Group"

  ingress_rules = [
    {
      from_port              = 3000
      to_port                = 3000
      protocol               = "tcp"
      source_security_groups = [module.frontend_security_group.sg_id]
      description            = "server is listening on port 3000"
    }
  ]
}

# security group for db
module "db_security_group" {
  source      = "./modules/security_group"
  name        = "${var.project_name}-db-sg"
  vpc_id      = module.vpc.vpc_id
  description = "db Security Group"

  ingress_rules = [
    {
      from_port              = 5432
      to_port                = 5432
      protocol               = "tcp"
      source_security_groups = [module.backend_security_group.sg_id]
      description            = "Postgres is listening on port 5432"
    }
  ]
}

# database ec2 intance
module "db_instance" {
  source                      = "./modules/ec2"
  name                        = "${var.project_name}-db-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.db_private_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = false
  security_group_ids          = [module.db_security_group.sg_id]
  user_data                   = file("${path.module}/user_data/database.sh")

  depends_on = [module.ngw, module.db_private_route_table]
}

#backend ec2 instance
module "backend_instance" {
  source                      = "./modules/ec2"
  name                        = "${var.project_name}-backend-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.backend_private_subnet.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = false
  security_group_ids          = [module.backend_security_group.sg_id]
  user_data = templatefile("${path.module}/user_data/backend.sh", {
    db_host = module.db_instance.private_ip
  })

  depends_on = [module.ngw, module.backend_private_route_table]
}

#frontend ec2 instance
module "frontend_instance" {
  source                      = "./modules/ec2"
  name                        = "${var.project_name}-frontend-server"
  ami_id                      = var.ami_id
  instance_type               = var.instance_type
  vpc_id                      = module.vpc.vpc_id
  subnet_id                   = module.frontend_public_subnet_az1.subnet_id
  key_name                    = var.key_name
  associate_public_ip_address = true
  security_group_ids          = [module.frontend_security_group.sg_id]
  user_data = templatefile("${path.module}/user_data/frontend.sh", {
    backend_private_ip = module.backend_instance.private_ip
  })

  depends_on = [module.backend_instance]
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

# attach frontend to alb-target-group
resource "aws_lb_target_group_attachment" "frontend_tg_attachment" {
  target_group_arn = aws_lb_target_group.alb_tg.arn
  target_id        = module.frontend_instance.instance_id
  port             = 80
}

# creating application-load-balancer
resource "aws_lb" "alb" {
  name                       = "${var.project_name}-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [module.alb_security_group.sg_id]
  subnets                    = [module.frontend_public_subnet_az1.subnet_id, module.frontend_public_subnet_az2.subnet_id]
  enable_deletion_protection = false

  tags = {
    Name = "${var.project_name}-alb"
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



