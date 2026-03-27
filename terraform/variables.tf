variable "aws_region" {
  type = string
  default = "ap-south-1"
}

variable "project_name" {
  type    = string
  default = "todo_app"
}

variable "cidr_blocks" {
  type        = list(string)
  description = "cidr blocks for vpc, public / private subnet"
  default     = ["11.0.0.0/16", "11.0.1.0/24", "11.0.2.0/24"]
}

variable "availability_zones" {
  type        = list(string)
  description = "availability zone used by subnets"
  default     = ["ap-south-1a", "ap-south-1b"]
}

variable "own_ip" {
  type        = string
  description = "ip of own device"
}

variable "ami_id" {
  type        = string
  description = "ami for aws ap-south-1 ubuntu"
  default     = "ami-05d2d839d4f73aafb"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "key_name" {
  type    = string
  default = "main"
}


