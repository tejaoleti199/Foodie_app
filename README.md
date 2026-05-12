# Foodie App 🍔

A modern full-stack food ordering and restaurant management web application built using the MERN stack with containerization and deployment support using Docker and Kubernetes.

---

## 📌 Project Overview

Foodie App is an online food ordering platform that allows users to browse restaurants, explore menus, add items to cart, and place orders seamlessly. The application also provides admin functionalities for managing restaurants, food items, and customer orders.

The project focuses on scalable full-stack development practices along with modern deployment technologies.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login Authentication
* Browse Restaurants and Food Items
* Search and Filter Food Items
* Add to Cart Functionality
* Place Orders Online
* Responsive User Interface
* Order Tracking Interface

### 🛠️ Admin Features

* Add/Edit/Delete Restaurants
* Manage Food Menu Items
* View and Manage Orders
* Dashboard for Restaurant Management

---

## 🧰 Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Bootstrap / Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### DevOps & Deployment

* Docker
* Kubernetes

---

## 📂 Project Structure

```bash
foodie-app/
│
├── frontend/          # React frontend
├── backend/           # Node.js & Express backend
├── database/          # MongoDB configurations
├── docker/            # Docker configuration files
├── kubernetes/        # Kubernetes deployment files
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/foodie-app.git
cd foodie-app
```

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm start
```

The application will run on:

* Frontend: `http://localhost:3000`
* Backend: `http://localhost:5000`

---

## 🐳 Docker Setup

### Build Docker Images

```bash
docker build -t foodie-frontend ./frontend
docker build -t foodie-backend ./backend
```

### Run Containers

```bash
docker run -p 3000:3000 foodie-frontend
docker run -p 5000:5000 foodie-backend
```

---

## ☸️ Kubernetes Deployment

### Apply Kubernetes Configuration

```bash
kubectl apply -f kubernetes/
```

### Check Running Pods

```bash
kubectl get pods
```

---

## 📸 Modules Included

* Authentication Module
* Restaurant Management Module
* Cart Module
* Order Management Module
* Admin Dashboard
* API Integration

---

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Full Stack Web Development
* REST API Development
* Database Design & Integration
* Frontend-Backend Communication
* Docker Containerization
* Kubernetes Deployment
* Version Control using Git & GitHub

---

## 🔮 Future Enhancements

* Online Payment Gateway Integration
* Real-time Order Tracking
* AI-based Food Recommendation System
* Push Notifications
* Mobile Application Support

---

## 👨‍💻 Author

Contact : oletiteja199@gmail.com
Developed by Teja Oleti.

---

## 📄 License

This project is created for educational and internship purposes.
