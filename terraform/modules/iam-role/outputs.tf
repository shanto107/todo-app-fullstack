output "ssm_role_name" {
  value = aws_iam_role.this.name
}

output "ssm_role_arn" {
  value = aws_iam_role.this.arn
}

output "instance_profile_name" {
  value = aws_iam_instance_profile.this.name
}

output "instance_profie_arn" {
  value = aws_iam_instance_profile.this.arn
}