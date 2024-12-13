# Cloud-Native Microservices Platform for AI Language Models

This repository hosts a cloud-native web application developed with a **microservices architecture**, focusing on providing seamless user authentication and interaction with various **Language Models (LLMs)**. The platform is designed to integrate multiple popular AI models like **Falcon**, **OpenAI GPT-4**, and **Google Gemini** (planned), allowing users to access these models through a unified interface with configurable request limits.

## Project Overview

This platform provides:
1. **User Authentication Service**: Secure and robust authentication with token-based session management.
2. **Language Model Service**: Integration with external LLM APIs, enabling dynamic responses from selected models via a dropdown.

The application is containerized using **Docker**, ensuring portability and scalability. Future work includes **Kubernetes orchestration** to further enhance scalability and management for production-grade deployments.

---

## Technologies Used

The following tools and technologies were used:

- **Node.js**: Backend framework for the authentication and LLM services.
- **Express.js**: API routing and middleware for backend services.
- **MongoDB Atlas**: NoSQL cloud database for secure storage of user data.
- **Bcrypt**: Password hashing for secure authentication.
- **JWT (JSON Web Token)**: Token-based user authentication and session management.
- **Axios**: HTTP client for seamless frontend-backend communication.
- **React.js**: Frontend framework for an interactive user experience.
- **Jest & Supertest**: Testing frameworks for API and unit testing.
- **Docker**: Containerization of services for scalable deployments.
- **CSS Styling**: Custom styling for responsive and user-friendly interfaces.

---

## Microservices Implemented

### 1. **Authentication Service**

- **Tech Stack**: Node.js, Express.js, MongoDB, JWT, Bcrypt.
- **Features**:
  - User registration and login functionality.
  - Password hashing using **Bcrypt**.
  - Token-based authentication using **JWT**.
  - Protected routes accessible only with valid JWT tokens.
  - MongoDB Atlas integration for secure storage of user credentials.
- **API Endpoints**:
  - `POST /api/auth/signup`: Registers a new user.
  - `POST /api/auth/login`: Logs in an existing user and returns a JWT token.
  - `GET /api/auth/protected`: Validates access to a protected route.
- **Testing**:
  - Unit and API testing using **Jest** and **Supertest**.
  - Validated functionality for registration, login, duplicate user prevention, and protected route access.
- **Dockerization**:
  - Fully containerized with a Dockerfile and `docker-compose.yml`.

---

### 2. **Language Model Service (LLM Service)**

- **Tech Stack**: Node.js, Express.js, Hugging Face API.
- **Features**:
  - Integrates LLMs via APIs, starting with **Falcon**.
  - Dynamic model selection via a dropdown menu on the frontend.
  - Modular architecture for adding support for future models like **OpenAI GPT-4** and **Google Gemini**.
- **Files**:
  - `llmApi.js`: Handles API requests to LLMs.
  - `chatController.js`: Manages incoming requests and API responses.
  - `chatRoutes.js`: Defines routes for LLM-related endpoints.
- **API Endpoints**:
  - `POST /api/llm/generate`: Processes user prompts and fetches responses from the selected LLM API.
- **Planned Features**:
  - User-specific request limits for LLM usage.
  - Analytics for tracking model performance and usage.

---

## Frontend Application

- **Home Page**:
  - Engaging design with a dark theme, centered "Login" and "Signup" buttons.
- **Login and Signup Pages**:
  - Consistent styling with smooth transitions to the chat page.
  - Fully functional forms integrated with the Authentication Service.
- **Chat Page**:
  - Dropdown menu for model selection (e.g., Falcon, OpenAI GPT-4, Google Gemini).
  - Interactive chat interface for user prompts and model-generated responses.
  - Dynamic message rendering with responsive design.

---

## Installation and Setup

### Prerequisites

- **Node.js**: Installed locally for running services.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Docker** (Optional): For containerized deployment.

### Clone the Repository

```bash
git clone https://github.com/emre-serdar/cloud-native-microservices-app.git
```

### Set up the Authentication Service
1. Navigate to the `authentication-service` directory.

   ```bash
   cd services/authentication-service

2. Install dependencies:

   ```bash
   npm install

3. Create a .env file in the authentication-service directory:

   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

5. Run the application:

   ```bash
   npm run dev

6. Run tests:
   ```bash
   npm run test


### Set up the LLM Service

1. Navigate to the llm-service directory:
   ```bash
   cd services/llm-service
2. Install dependencies::
   ```bash
   npm install
3. Create a .env file in the llm-service directory::
   ```bash
   HUGGING_FACE_API_KEY=your_hugging_face_api_key
4. Run the application::
   ```bash
   npm run dev

### Future Work
Containerization:
Extend Docker support to the LLM service.
Deploy services on Kubernetes for production readiness.
Advanced Features:
Implement user-specific request limits for LLM usage.
Analytics for tracking model performance and usage patterns.
Conclusion
This project successfully demonstrates a scalable, modular microservices architecture for cloud-native applications. Key achievements include:

Full implementation of user authentication with secure JWT-based sessions.
Seamless integration with external LLM APIs.
Dockerization of services for deployment.
A responsive and user-friendly frontend interface.
This platform provides a robust foundation for future development, including additional services, advanced features, and production-grade deployments using Kubernetes.
