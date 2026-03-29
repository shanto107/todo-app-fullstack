variable "name" {
  type    = string
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

variable "vpc_id" {
  type        = string
  description = "vpc id for security group"
}

variable "subnet_id" {
  type        = string
  description = "public subnet id"
}

variable "security_group_ids" {
  type        = list(string)
  description = "vpc security group id"
}

variable "key_name" {
  type    = string
  default = "main"
}

variable "associate_public_ip_address" {
  type = bool
}

variable "user_data" {
  type = string
}