﻿# Task-Manager
Project Description: Task Manager Application
![image](https://github.com/user-attachments/assets/f2011cd3-87f0-4c8c-b0b3-17d11b19afaa)

# Overview
The Task Manager application is a robust and user-friendly tool designed to enhance productivity by enabling users to efficiently manage their tasks. Developed with a Node.js backend and a React.js frontend, this application provides an intuitive interface for users to organize their tasks seamlessly.

# Key Features
Task Creation: Effortlessly add new tasks with detailed descriptions and deadlines.
Task Management: Update task statuses (e.g., Pending, In Progress, Completed) and modify task details as needed.
Task Categorization: Organize tasks by assigning them to specific categories for better prioritization and tracking.
User Authentication: Secure authentication is implemented using JSON Web Tokens (JWT), ensuring that user data remains confidential and accessible only to authorized users.
This application aims to streamline task management for both personal and professional use, enhancing user productivity.

# Application Screenshots
![image](https://github.com/user-attachments/assets/65b47e61-c42c-4433-884c-ff26ed1ac750)
![image](https://github.com/user-attachments/assets/af076f5b-31ac-469e-9599-4af230f046b8)
![image](https://github.com/user-attachments/assets/ec5b2344-13a5-4aa8-9702-bf39cbe969f6)

# Tech Stack
Frontend: React.js
Backend: Node.js with Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)

# Getting Started
Follow these instructions to run the project locally.

# Prerequisites
Node.js (version 14 or higher)
MongoDB (cloud or local)

# Installation
# Clone the Repository:
git clone https://github.com/MohanDaz3/Task-Manager.git

# Frontend Setup:
cd frontend
npm install
npm run dev

# Environment Variables
Create a .env file in the frontend directory and add the following:
VITE_API_URL=http://localhost:5000/api
VITE_AUTH_API_URL=http://localhost:8000/api/auth
VITE_TASK_API_URL=http://localhost:8000/api/tasks
VITE_CATEGORY_API_URL=http://localhost:8000/api/categories

# Backend Setup: 
cd backend
npm install
npm start
# Environment Variables
MONGO_URI=use your mongo cluster url
PORT = 8000
JWT_SECRET="JWT_321"



