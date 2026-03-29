#!/bin/bash
set -euxo pipefail
exec > >(tee /var/log/user-data.log | logger -t user-data -s 2>/dev/console) 2>&1

export DEBIAN_FRONTEND=noninteractive

apt-get clean
rm -rf /var/lib/apt/lists/*
apt-get update -o Acquire::Retries=5
apt-get install -y --fix-missing postgresql postgresql-contrib

systemctl enable postgresql
systemctl start postgresql

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

sed -i "s/^#listen_addresses =.*/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
echo "host all all 11.0.0.0/16 md5" >> /etc/postgresql/*/main/pg_hba.conf

systemctl restart postgresql