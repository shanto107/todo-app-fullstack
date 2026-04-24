output "docker_manager_server_public_ip" {
  value = module.docker_manager_instance.public_ip
}

output "docker_manager_server_private_ip" {
  value = module.docker_manager_instance.private_ip
}

output "docker_worker_db_server_private_ip" {
  value = module.docker_worker_db_instance.private_ip
}

output "docker_worker_app_server_01_private_ip" {
  value = module.docker_worker_app_instance_01.private_ip
}

output "docker_worker_app_server_02_private_ip" {
  value = module.docker_worker_app_instance_02.private_ip
}