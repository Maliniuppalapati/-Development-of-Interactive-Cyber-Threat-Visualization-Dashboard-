<div align="center">
  
# 🛡️ CyberShield SOC Dashboard

**A Full-Stack, Real-Time Cybersecurity Security Operations Center (SOC) Simulation**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)](https://www.python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📖 Overview
CyberShield is an enterprise-grade, real-time Security Operations Center (SOC) dashboard. Designed to simulate the environment of a modern Tier 1 & 2 cybersecurity analyst, it provides real-time threat monitoring via WebSockets, persistent incident tracking, and powerful AI-driven forensics tools.

This project was built from the ground up to demonstrate a strong understanding of full-stack architecture, asynchronous real-time data streaming, database management, and modern Large Language Model (LLM) integration.

## ✨ Key Features

- 🌍 **Real-Time Global Threat Map:** Live visualization of incoming simulated network attacks utilizing `Socket.io` for zero-latency updates.
- 🤖 **AI Phishing Email Analyzer:** A dedicated Python microservice connected to the Groq LLM API that performs forensic analysis on suspicious emails, returning structured JSON threat metrics (Confidence score, Tactics used, etc.).
- 💬 **SOC LLM Assistant:** A custom prompt-engineered chatbot restricted strictly to cybersecurity topics to assist analysts in understanding attack vectors (e.g., "How do I mitigate a DDoS attack?").
- 🚨 **Incident Management Workflow:** Full CRUD capabilities allowing analysts to promote live threats to official Incidents, update investigation statuses, and append timestamped forensics notes to a MongoDB database.
- 📊 **Enterprise Data Export:** Built-in capability to filter threat feeds and export them directly to CSV formats for external reporting and compliance.
- 🔔 **Live Toast Notifications:** Asynchronous, non-blocking UI alerts that notify the user the exact moment a "Critical" severity attack breaches the network.

## 🛠️ Technology Stack

**Frontend (Client)**
- **React.js + Vite** (Fast build tool)
- **Tailwind CSS** (Utility-first styling for dark-mode SOC aesthetics)
- **Lucide-React** (Modern iconography)
- **Socket.io-client** (Real-time data consumption)

**Backend (Server)**
- **Node.js & Express** (Main REST API & WebSocket server)
- **MongoDB & Mongoose** (NoSQL Database for persistent Incident and Threat logging)
- **JWT** (JSON Web Tokens for secure analyst authentication)

**AI Engine (Microservice)**
- **Python & Flask** (Lightweight API routing)
- **Groq API (`llama-3.3-70b-versatile`)** (Lightning-fast LLM inference)

**DevOps & Deployment**
- **Docker & Docker Compose** (Containerization of the entire 3-tier architecture with internal networking)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Docker (Optional, but recommended)
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A free [Groq API Key](https://console.groq.com/)

### Environment Setup
You must create a `.env` file in the `/server` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cybershield?appName=Threat
JWT_SECRET=your_super_secret_key
AI_ENGINE_URL=http://ai-engine:5001 # Or http://localhost:5001 if running locally
GROQ_API_KEY=gsk_your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

### Option A: Run via Docker (Recommended)
This is the easiest way to run the entire stack (React, Node, Python) simultaneously.
1. Open a terminal in the root directory.
2. Run:
```bash
docker-compose up --build
```
3. Access the dashboard at `http://localhost`.

### Option B: Run Locally (Development Mode)
You will need three separate terminal windows.

**Terminal 1: Start the Node Backend**
```bash
cd server
npm install
npm run dev
```

**Terminal 2: Start the Python AI Engine**
```bash
cd ai-engine
pip install -r requirements.txt
python app.py
```

**Terminal 3: Start the React Frontend**
```bash
cd client
npm install
npm run dev
```
Access the dashboard at `http://localhost:5173` (or the port Vite provides).

## 👨‍💻 Usage & Testing

1. **Login:** Use the default admin credentials `admin@cybershield.io` / `admin123`.
2. **Watch the Dashboard:** Wait ~10 seconds to see real-time dots plotting on the map and live Critical Toasts appearing.
3. **Filter and Export:** Go to *Threat Feed*, click the "Investigating" top card to filter, and click "Export CSV".
4. **AI Forensics:** Go to *Email Analyzer*, paste a scam email, and watch the Python AI engine break down the threat.

---
*Developed as a placement-ready demonstration of full-stack engineering, microservices, and AI integration.*
