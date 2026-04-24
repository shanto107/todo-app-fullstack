variable "aws_region" {
  type = string
}

variable "project_name" {
  type = string
}

variable "vpc_cidr_block" {
  type = string
}

variable "public_cidr_blocks" {
  type = list(string)
}

variable "availabiliy_zones" {
  type = list(string)
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "key_name" {
  type = string
}

variable "aws_account_id" {
  type = string
}

variable "hosted_zone" {
  type = string
}

variable "acm_certificate_arn" {
  type = string
}

variable "domain_name" {
  type = string
}
