
# 🚀 MERN Stack Deployment on VPS (Docker + MongoDB 4.4)

This guide helps you deploy a MERN stack application (MongoDB, Express.js, React, Node.js) on a VPS using **Docker** and **Docker Compose**.

---

## 🧰 Prerequisites

Make sure you have the following:

- A VPS running **Ubuntu** (e.g., from ResellerClub, DigitalOcean, etc.)
- A **domain name** (configured in ResellerClub or other DNS provider)
- **SSH access** to your VPS
- **Git** installed on the VPS

---

## ⚙️ Project Structure

Ensure your project directory has this basic structure:

```
your-project/
├── client/         # React Frontend
├── server/         # Express Backend
└── docker-compose.yml
```

---

## 🐳 Docker Compose Setup

Create a `docker-compose.yml` file in your project root:

```yaml
version: "3"
services:
  mongodb:
    image: mongo:4.4
    container_name: mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: pass123
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./server
    container_name: backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=mongodb://admin:pass123@mongodb:27017/EBoutique?authSource=admin

  frontend:
    build: ./client
    container_name: frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

---

## 📦 Step 1: Connect to VPS & Update

```bash
# Connect to your VPS
ssh root@your-server-ip

# Update the package list and installed packages
sudo apt update && sudo apt upgrade -y
```

---

## 🐋 Step 2: Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verify Docker installation
docker --version
```

---

## 🔧 Step 3: Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version
```

---

## 📁 Step 4: Clone Your Project

### Option 1: Using Git

```bash
git clone https://github.com/yourusername/your-mern-project.git
cd your-mern-project
```

### Option 2: Download ZIP (if Git not available)

```bash
wget https://github.com/SHAMIL-VAKKAYIL/EBoutique/archive/refs/heads/main.zip
unzip main.zip
mv EBoutique-main EBoutique
cd EBoutique
```

---

## ▶️ Step 5: Build and Launch App

```bash
# Build and run the containers in detached mode
docker-compose up --build -d

# Check running containers
docker ps
```

---

## ✅ Deployment Success

Your MERN application is now:

- **Frontend:** Available on `http://your-domain.com` or `http://your-server-ip`
- **Backend API:** Accessible on port `5000`
- **MongoDB:** Running internally on port `27017`

---

## 🧹 Useful Commands

```bash
# View logs
docker-compose logs -f

# Stop the containers
docker-compose down

# Rebuild containers after changes
docker-compose up --build -d
```

## 📬 Need Help?

Feel free to open an issue or reach out if you get stuck.  
Happy coding! 💻🚀

---
