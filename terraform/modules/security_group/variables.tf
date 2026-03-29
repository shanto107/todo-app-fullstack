variable "name" {
  type    = string
}

variable "vpc_id" {
  type        = string
  description = "vpc id for security group"
}

variable "description" {
  type = string
}

variable "ingress_rules" {
  type = list(any)
}
