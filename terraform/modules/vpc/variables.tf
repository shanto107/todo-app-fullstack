variable "vpc_cidr_block" {
  type        = string
  description = "cidr blocks for vpc, public / private subnet"
  default     = "11.0.0.0/16"
}

variable "name" {
  type    = string
}
