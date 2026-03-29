resource "aws_route_table" "this" {
  vpc_id = var.vpc_id
  tags = {
    Name = var.name
  }
}

resource "aws_route" "public_igw_route" {
  count = var.route_type == "igw" ? 1 : 0
  route_table_id = aws_route_table.this.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = var.gateway_id
}

resource "aws_route" "private_ngw_route" {
  count = var.route_type == "ngw" ? 1 : 0
  route_table_id = aws_route_table.this.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = var.gateway_id
}

resource "aws_route_table_association" "this" {
  subnet_id      = var.subnet_id
  route_table_id = aws_route_table.this.id
}