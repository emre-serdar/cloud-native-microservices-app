# Cloud-Native Microservices Platform

This repository contains a cloud-native web application developed with a **microservices architecture**, focusing on scalability, security, and flexibility. The application is designed as a platform that will host and integrate different AI models from various sources, enabling seamless interaction with AI technologies via APIs. The services are built using **Node.js**, **Java Spring Boot**, and integrated with cloud technologies like **AWS** and **Kubernetes** for scalable deployment.

## Project Overview

This platform is intended to serve as a hub for collecting and deploying different AI models, offering services to interact with them through APIs. These models can range from machine learning (ML) to natural language processing (NLP) and computer vision (CV) models. The platform is also built to accommodate AI models' integration through a microservices architecture.

Current core services implemented in this repository include:
1. **Authentication Service** (Node.js + Express)
2. **Order Management Service** (Java Spring Boot)
3. **Payment Service** (Java Spring Boot)
4. **Product Service** (Node.js + Express)

These services are designed to be generic and flexible, making them applicable to different applications, whether for an e-commerce platform or an AI model marketplace.

---

## Technologies Used

The following technologies are utilized in this project:

- **Node.js**: Used for building the backend microservices such as Authentication and Product services.
- **Express**: A fast and lightweight Node.js framework for building APIs.
- **MongoDB (MongoDB Atlas)**: A NoSQL database for storing user data and product details, integrated with the authentication service for secure storage.
- **Bcrypt**: Used for password hashing in the authentication service.
- **JWT (JSON Web Token)**: Utilized for secure user authentication and session management.
- **Jest & Supertest**: For API testing, covering endpoints in the authentication service.
- **Docker**: Containerization for microservices, enabling isolated development and deployment.
- **Kubernetes**: Orchestration for scalable deployment and management of Docker containers.
- **Java Spring Boot**: Used for order and payment services, providing a robust and scalable backend.
- **AWS**: Deployment infrastructure, utilizing services such as EC2, S3, and RDS to host and manage services.
- **React.js (Frontend planned)**: Will be used to build the frontend to interact with services, and potentially provide a user interface for the AI models platform.
  
---

## Microservices Implemented

### 1. **Authentication Service**

- **Tech Stack**: Node.js, Express, MongoDB, JWT, Bcrypt
- **Functionality**: 
  - User registration and login functionality.
  - Password hashing using **bcrypt**.
  - Token-based authentication using **JWT**.
  - Protected routes that require valid JWT tokens for access.
  - Integrated with MongoDB Atlas for secure storage of user credentials.
- **API Routes**:
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Login an existing user and return a JWT token.
  - `GET /api/auth/protected`: Access a protected route with a valid token.
  
- **Testing**:
  - Implemented using **Jest** and **Supertest** for API testing.
  - Tests for user registration, login, duplicate users, invalid credentials, and protected route access.
  
- **Current Branch**: Feature branch is `feature/authentication-service`. All commits and progress on this service are merged into the `develop` branch after testing.

### 2. **Order Management Service (Upcoming)**

- **Tech Stack**: Java Spring Boot, MongoDB, Docker
- **Planned Features**:
  - Order placement and tracking.
  - Order history and status updates.

### 3. **Payment Service (Upcoming)**

- **Tech Stack**: Java Spring Boot, Payment Gateway API
- **Planned Features**:
  - Payment integration using third-party APIs (e.g., Stripe, PayPal).
  - Secure transaction processing.

### 4. **Product Service**

- **Tech Stack**: Node.js, Express, MongoDB
- **Planned Features**:
  - CRUD functionality for managing products.
  - Integration with AI models for product recommendation.

---

## Installation and Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **MongoDB**: Ensure you have MongoDB set up (MongoDB Atlas is used for cloud database storage).
- **Docker** (Optional): For containerization and deployment.

### Clone the repository

```bash
git clone https://github.com/your-username/cloud-native-microservices-app.git
```

### Set up for Authentication Service
1. Navigate to the `authentication-service` directory.

```bash
cd services/authentication-service
```

2. Install dependencies 

```bash
npm install
```

3. Create a .env file in the authentication-service directory:

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Run the application:

```bash
npm run dev
```

This will start the authentication service on http://localhost:5000.

### Running Tests
You can run tests for the authentication service using Jest.
```bash
npm run test
```
This will test all routes and functionality, including user registration, login, and protected route access.

As the project evolves, more features and services will be added, including product, order management, and payment functionalities.

