# 🚀 Todo App Deployment on AWS (Production Architecture)

![AWS](https://img.shields.io/badge/AWS-Cloud-orange?logo=amazonaws)
![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue?logo=postgresql)
![Nginx](https://img.shields.io/badge/Server-Nginx-darkgreen?logo=nginx)

---

## 📌 Overview

This project demonstrates a **production-grade full-stack deployment on AWS** using a scalable and secure architecture.

### 🧱 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js (Express)
* **Database:** PostgreSQL
* **Infrastructure:** AWS (VPC, EC2, ALB, Route 53, ACM)
* **Web Server:** Nginx
* **Process Manager:** PM2

---

## 🧠 Architecture

```text
User → Route53 → ALB (HTTPS)
     → Frontend EC2 (Nginx + React)
     → Backend EC2 (Node + PM2)
     → PostgreSQL EC2
```

---

## 🌐 Infrastructure Design

### 🏗️ VPC

* CIDR: `10.0.0.0/16`

### 🔀 Subnets

| Name            | CIDR        | Type    |
| --------------- | ----------- | ------- |
| public-alb      | 10.0.1.0/24 | Public  |
| public-frontend | 10.0.2.0/24 | Public  |
| private-backend | 10.0.3.0/24 | Private |
| private-db      | 10.0.4.0/24 | Private |

---

### 🌍 Networking

* **Internet Gateway:** Enables public access
* **NAT Gateway:** Allows private subnet outbound internet

#### Route Tables

```bash
# Public
0.0.0.0/0 → IGW

# Private
0.0.0.0/0 → NAT Gateway
```

---

## 🔐 Security Groups

| Layer        | Rules                |
| ------------ | -------------------- |
| **ALB**      | 80, 443 → 0.0.0.0/0  |
| **Frontend** | 80 → ALB, 22 → My IP |
| **Backend**  | 3000 → Frontend      |
| **Database** | 5432 → Backend       |

---

## 🖥️ EC2 Setup

### 🟣 Database Server (PostgreSQL)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib -y
```

```bash
sudo -u postgres psql
```

```sql
CREATE USER todo_app_user WITH PASSWORD 'todo2026';
CREATE DATABASE todo_app_db;
GRANT ALL PRIVILEGES ON DATABASE todo_app_db TO todo_app_user;

\c todo_app_db

GRANT ALL ON SCHEMA public TO todo_app_user;
ALTER SCHEMA public OWNER TO todo_app_user;
```

#### Enable Remote Access

```bash
sudo nano /etc/postgresql/*/main/postgresql.conf
# change:
listen_addresses = '*'
```

```bash
sudo nano /etc/postgresql/*/main/pg_hba.conf
# add:
host all all 10.0.0.0/16 md5
```

```bash
sudo systemctl restart postgresql
```

---

### 🔵 Backend Server

```bash
sudo apt update
sudo apt install nodejs npm git -y
npm install -g pm2
```

```bash
git clone https://github.com/shanto107/todo-app-fullstack.git
cd todo-app-fullstack/backend
npm install
```

#### `backend/.env`

```env
DB_HOST=<DB_PRIVATE_IP>
DB_USER=todo_app_user
DB_PASSWORD=
DB_NAME=todo_app_db
PORT=3000
```

```bash
pm2 start server.js
pm2 save
```

---

### 🟢 Frontend Server

```bash
sudo apt update
sudo apt install nginx nodejs npm git -y
```

```bash
git clone https://github.com/shanto107/todo-app-fullstack.git
cd todo-app-fullstack/frontend
npm install
```

#### `frontend/.env`

```env
VITE_API_URL=
```

```bash
npm run build
```

#### Deploy

```bash
sudo mkdir -p /var/www/todo
sudo cp -r dist/* /var/www/todo/
sudo chown -R www-data:www-data /var/www/todo
```

#### Nginx Config

```nginx
server {
    listen 80;

    root /var/www/todo;
    index index.html;

    location /api/ {
        proxy_pass http://<BACKEND_PRIVATE_IP>:3000;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
sudo systemctl restart nginx
```

---

## ⚖️ Load Balancer (ALB)

* **Type:** Internet-facing
* **Target Group Port:** 80
* **Health Check:** `/`

### Listener

* HTTP → Target Group
* HTTPS (443) → with ACM certificate

---

## 🌐 Route 53 (DNS)

```txt
Name: todo
Type: A
Alias: ALB
```

---

## 🔐 HTTPS with ACM

* Request certificate for: `todo.shanto.app`
* Validate via DNS
* Attach to ALB
* Redirect HTTP → HTTPS

---

## 🧪 Live Demo

🔗 [https://todo.shanto.app]

---

## 🔥 Key Learnings

* Designing VPC architecture
* Public vs Private subnet isolation
* Secure communication via Security Groups
* Reverse proxy with Nginx
* Load balancing with ALB
* DNS + HTTPS setup

---

## 🚀 Future Improvements

* 🔁 Auto Scaling Groups
* 🗄️ RDS instead of EC2 database
* ⚙️ CI/CD pipeline (GitHub Actions)
* 🐳 Docker & containerization
* 🌍 CloudFront CDN

---

## 📊 Architecture Diagram

```text
                ┌────────────────────┐
                │     User           │
                └─────────┬──────────┘
                          │
                          ▼
               ┌──────────────────────┐
               │   Route 53 (DNS)     │
               └─────────┬────────────┘
                         │
                         ▼
               ┌──────────────────────┐
               │  ALB (HTTPS - 443)   │
               └─────────┬────────────┘
                         │
                         ▼
         ┌────────────────────────────────┐
         │ Frontend EC2 (Public Subnet)   │
         │ Nginx + React                  │
         └──────────────┬─────────────────┘
                        │ /api
                        ▼
         ┌────────────────────────────────┐
         │ Backend EC2 (Private Subnet)   │
         │ Node.js + PM2                  │
         └──────────────┬─────────────────┘
                        │
                        ▼
         ┌────────────────────────────────┐
         │ Database EC2 (Private Subnet)  │
         │ PostgreSQL                     │
         └────────────────────────────────┘
```

---

## Job not finished

To be continued....

---
