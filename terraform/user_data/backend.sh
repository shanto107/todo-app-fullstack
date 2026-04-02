#!/bin/bash
set -euxo pipefail
exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

export DEBIAN_FRONTEND=noninteractive

# apt-get clean
# rm -rf /var/lib/apt/lists/*
# apt-get update -o Acquire::Retries=5
# apt-get install -y --fix-missing curl git build-essential libatomic1 ca-certificates

for i in 1 2 3 4 5; do
  apt-get clean
  rm -rf /var/lib/apt/lists/*
  apt-get update -o Acquire::Retries=5 && \
  apt-get install -y --fix-missing curl git build-essential libatomic1 ca-certificates && break
  sleep 10
done

sudo -u ubuntu -H bash -lc "
export NVM_DIR=\"\$HOME/.nvm\"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source \"\$NVM_DIR/nvm.sh\"
nvm install --lts
nvm use --lts
npm install -g pm2
"

sudo -u ubuntu -H bash -lc "
cd \$HOME
if [ ! -d todo-app-fullstack ]; then
  git clone https://github.com/shanto107/todo-app-fullstack.git
fi
"

sudo -u ubuntu -H bash -lc "
export NVM_DIR=\"\$HOME/.nvm\"
source \"\$NVM_DIR/nvm.sh\"

cd \$HOME/todo-app-fullstack/backend
npm install

cat > .env <<EOT
DB_USER=todo_app_user
DB_HOST=${db_host}
DB_NAME=todo_app_db
DB_PASSWORD=todo2026
DB_PORT=5432
DATABASE_URL=postgres://todo_app_user:todo2026@${db_host}:5432/todo_app_db
PORT=3000
EOT

npx node-pg-migrate up
pm2 start server.js --name todo-backend
pm2 save
"

env PATH=/home/ubuntu/.nvm/versions/node/$(ls /home/ubuntu/.nvm/versions/node | tail -n1)/bin:/usr/bin:/bin \
/home/ubuntu/.nvm/versions/node/$(ls /home/ubuntu/.nvm/versions/node | tail -n1)/lib/node_modules/pm2/bin/pm2 \
startup systemd -u ubuntu --hp /home/ubuntu || true

systemctl enable pm2-ubuntu || true