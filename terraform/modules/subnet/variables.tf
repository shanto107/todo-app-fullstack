variable "project_name" {
  type    = string
  default = "todo_app"
}

variable "vpc_id" {
  type = string
}

variable "cidr_block" {
  type        = string
  description = "cidr blocks for vpc, public / private subnet"
  default     = "11.0.1.0/24"
}

variable "availability_zone" {
  type        = string
  description = "availability zone used by subnets"
  default     = "ap-south-1a"
}

variable "map_public_ip_on_launch" {
  type        = bool
  description = "true for public subnet and false for private subnet"
}


variable "name" {
  type = string
}



