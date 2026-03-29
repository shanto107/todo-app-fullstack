#!/bin/bash
set -e
exec > /var/log/user-data.log 2>&1

# -------------------------
# Update system
# -------------------------
apt update -y
apt install -y curl git nginx build-essential libatomic1

# -------------------------
# Install NVM + Node as ubuntu
# -------------------------
sudo -u ubuntu -H bash -lc '
export NVM_DIR="$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source "$NVM_DIR/nvm.sh"
nvm install --lts
nvm use --lts
npm install -g pm2
'

# -------------------------
# Clone repo as ubuntu
# -------------------------
sudo -u ubuntu -H bash -lc '
cd $HOME
if [ ! -d todo-app-fullstack ]; then
  git clone https://github.com/shanto107/todo-app-fullstack.git
fi
'

# -------------------------
# Frontend setup as ubuntu
# -------------------------
sudo -u ubuntu -H bash -lc '
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

cd $HOME/todo-app-fullstack/frontend
npm install
echo "VITE_API_URL=" > .env
npm run build
'

# -------------------------
# Deploy frontend
# -------------------------
mkdir -p /var/www/todo
cp -r /home/ubuntu/todo-app-fullstack/frontend/dist/* /var/www/todo/
chown -R www-data:www-data /var/www/todo

# -------------------------
# Nginx config
# -------------------------
cat > /etc/nginx/sites-available/default <<'EOT'
server {
    listen 80;
    root /var/www/todo;
    index index.html;

    location /api/ {
        proxy_pass http://${backend_private_ip}:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOT

nginx -t
systemctl restart nginx
systemctl enable nginx