output "nat_gateway_eip_id" {
  value = aws_eip.this.id
}


output "nat_gateway_id" {
  value = aws_nat_gateway.this.id
}