#!/bin/bash
set -e
exec > /var/log/user-data.log 2>&1

# -------------------------
# Update system
# -------------------------
apt update -y
apt install -y curl git nginx postgresql postgresql-contrib build-essential libatomic1

systemctl enable postgresql
systemctl start postgresql

# -------------------------
# Setup PostgreSQL
# -------------------------
sudo -u postgres psql <<'EOF'
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'todo_app_user') THEN
      CREATE USER todo_app_user WITH PASSWORD 'todo2026';
   END IF;
END
$$;
EOF

sudo -u postgres psql <<'EOF'
SELECT 'CREATE DATABASE todo_app_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todo_app_db')\gexec
EOF

sudo -u postgres psql <<'EOF'
GRANT ALL PRIVILEGES ON DATABASE todo_app_db TO todo_app_user;
EOF

sudo -u postgres psql -d todo_app_db <<'EOF'
GRANT ALL ON SCHEMA public TO todo_app_user;
ALTER SCHEMA public OWNER TO todo_app_user;
EOF

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
# Backend setup as ubuntu
# -------------------------
sudo -u ubuntu -H bash -lc '
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

cd $HOME/todo-app-fullstack/backend
npm install

cat > .env <<EOT
DB_USER=todo_app_user
DB_HOST=localhost
DB_NAME=todo_app_db
DB_PASSWORD=todo2026
DB_PORT=5432
DATABASE_URL=postgres://todo_app_user:todo2026@localhost:5432/todo_app_db
PORT=3000
EOT

npx node-pg-migrate up
pm2 start server.js --name todo-backend
pm2 save
'

# -------------------------
# PM2 startup
# -------------------------
env PATH=/home/ubuntu/.nvm/versions/node/$(ls /home/ubuntu/.nvm/versions/node | tail -n1)/bin:/usr/bin:/bin \
/home/ubuntu/.nvm/versions/node/$(ls /home/ubuntu/.nvm/versions/node | tail -n1)/lib/node_modules/pm2/bin/pm2 \
startup systemd -u ubuntu --hp /home/ubuntu

systemctl enable pm2-ubuntu

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
        proxy_pass http://localhost:3000;
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