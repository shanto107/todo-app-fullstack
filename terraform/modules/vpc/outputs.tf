output "vpc_id" {
  value = aws_vpc.this.id
}

output "igw_id" {
  value = aws_internet_gateway.this.vpc_id
}

output "subnet_id" {
  value = aws_subnet.public.id
}
