output "fronend_public_ip" {
  value = module.frontend_instance.public_ip
}

output "backend_private_ip" {
  value = module.backend_instance.private_ip
}

output "db_private_ip" {
  value = module.db_instance.private_ip
}

output "vpc_id" {
  value = module.vpc.vpc_id
}
