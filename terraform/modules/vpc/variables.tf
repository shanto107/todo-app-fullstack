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

variable "project_name" {
  type    = string
  default = "todo_app"
}
