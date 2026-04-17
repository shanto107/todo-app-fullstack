output "docker_manager_server_public_ip" {
  value = module.docker_manager_instance.public_ip
}

output "docker_manager_server_private_ip" {
  value = module.docker_manager_instance.private_ip
}