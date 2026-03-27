variable "project_name" {
  type    = string
  default = "todo_app"
}

variable "vpc_id" {
  type        = string
  description = "vpc id for security group"
}

variable "own_ip" {
  type        = string
  description = "ip of own device"
}
