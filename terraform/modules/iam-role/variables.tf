variable "role_name" {
  type = string
}

variable "principals" {
  type = map(any)
}

variable "policy_name" {
  type = string
}

variable "inline_policy" {
  type = string
}

variable "instance_profile_name" {
  type = string
}