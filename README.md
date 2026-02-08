# 🔭 COSMIC WATCH
### *Near-Earth Object Tracking & Risk Analysis Dashboard*

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-Prototype-success?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-MERN%20(Dockerized)-purple?style=flat-square)

> **"Bridging the gap between raw astronomical data and human understanding."**

**Cosmic Watch** is a full-stack web application that visualizes real-time asteroid telemetry from NASA's NeoWs API. It features a secure, role-based dashboard that adapts its interface for **Space Enthusiasts** (visual focus) and **Academic Researchers** (data focus).



---

## 📑 Table of Contents

1.  [🚀 Key Features](#-key-features)
2.  [🛠️ Tech Stack](#-tech-stack)
3.  [🐳 Installation (Docker - Recommended)](#-installation-docker---recommended)
4.  [⚡ Installation (Manual)](#-installation-manual)
5.  [📂 Project Structure](#-project-structure)
6.  [📡 API Documentation](#-api-documentation)

---

## 🚀 Key Features

### 1. **Role-Based Access Control (RBAC)**
The application serves two distinct user personas:
* **👨‍🚀 Enthusiast Clearance:** Visual dashboard with 3D interactive cards and "Hazard" alerts.
* **🔬 Researcher Clearance:** Exclusive access to CSV/JSON data export tools and institutional analytics.

### 2. **Real-Time NASA Integration**
* Fetches live data from the **NeoWs (Near Earth Object Web Service)** API.
* Tracks velocity, miss distance, and diameter of objects passing within 0.05 AU of Earth.

### 3. **Immersive UI/UX**
* **Glassmorphism Design:** Built with Tailwind CSS for a modern, sci-fi aesthetic.
* **Physics Animations:** Powered by `Framer Motion` for smooth transitions.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | High-performance UI rendering. |
| **Styling** | Tailwind CSS | Utility-first CSS framework. |
| **Backend** | Node.js & Express | RESTful API architecture. |
| **Database** | MongoDB | NoSQL database for user profiles. |
| **DevOps** | Docker | Containerization for easy deployment. |

---

## 🐳 Installation (Docker - Recommended)
*Best for Judges & Quick Testing*

If you have Docker installed, you can skip the manual setup steps.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/CreeperSama/Cosmic_Watch_Jupyter.git](https://github.com/CreeperSama/Cosmic_Watch_Jupyter.git)
    cd Cosmic_Watch_Jupyter
    ```

2.  **Run with Docker Compose**
    ```bash
    docker-compose up --build
    ```
    * **Frontend:** `http://localhost:5173`
    * **Backend:** `http://localhost:5000`

---

## ⚡ Installation (Manual)

If you prefer to run the project without Docker, follow these steps strictly in order.

### 🛑 Step 1: Backend Setup
Open your **first terminal window** and run:

```bash
cd backend

# Install dependencies
npm install

# Create environment file (Linux/Mac)
touch .env
# (For Windows Powershell use: new-item .env)

# Start the server
npm start
```
<br>
### 🖥️ Step 2: Frontend Setup

OPEN A NEW TERMINAL WINDOW (Do not use the previous one).
```bash
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev
```
🎉 Result:
Open http://localhost:5173 to view the Dashboard.
<br>

### 📂 Project Structure
```bash
Cosmic_Watch_Jupyter/
├── 📂 .postman/        # API Documentation & Collections
├── 📂 backend/         # Express Server & Models
│   ├── models/         # Mongoose Schemas (User, etc.)
│   ├── routes/         # API Routes (Auth, Asteroids)
│   └── server.js       # Entry Point
├── 📂 frontend/        # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Route Pages (Dashboard, Login)
│   │   └── hooks/      # Custom Hooks (useAuth)
├── docker-compose.yml  # Container Orchestration
└── README.md           # Documentation
```

<br>

### 📡 API Documentation
The backend API is fully documented. You can import the provided Postman Collection to test endpoints.
<br>
File Location: CosmicWatch_API_Collection.json (Root Directory)
```bash
Method	 Endpoint	          Description
POST	  /api/auth/register	 Register new user (Researcher/Enthusiast).
POST	  /api/auth/login	     Authenticate & receive JWT.
GET	    /api/asteroids/feed	 Get today's asteroid telemetry.
GET	    /api/user/profile	   (Protected) View user clearance level.
```
<br>

### 📄 License
This project is licensed under the MIT License.
<br>
Note: Asteroid data is provided by NASA/JPL-Caltech. This project is for educational purposes.
<br>

---

## 🏛️ System Architecture

**Cosmic Watch** operates on a **MERN Stack** (MongoDB, Express, React, Node.js) architecture, using a "Backend-for-Frontend" (BFF) pattern to securely proxy requests to NASA's public APIs.

### 1. The Backend Core (`/backend`)
The server acts as the secure bridge between the user and external data sources.

* **Entry Point (`server.js`):**
    * Initializes the Express application.
    * Connects to MongoDB using Mongoose.
    * Sets up CORS (Cross-Origin Resource Sharing) to allow the frontend to communicate with the backend.

* **Authentication Engine (`/routes/auth.js`):**
    * **Registration:** Hashes user passwords using `bcrypt` before saving them to the database. This ensures raw passwords are never stored.
    * **Login:** Verifies credentials and issues a **JSON Web Token (JWT)**. This token contains the user's role (`Researcher` or `Enthusiast`) encrypted within it.

* **NASA Proxy (`/controllers/asteroidController.js`):**
    * Instead of the frontend calling NASA directly (which would expose API keys), the Backend makes the request.
    * It fetches data from `https://api.nasa.gov/neo/rest/v1/feed`.
    * **Data Sanitation:** The backend filters the massive JSON response from NASA and sends only the relevant telemetry (velocity, diameter, miss distance) to the frontend, reducing bandwidth usage.

### 2. The Frontend Interface (`/frontend`)
The client-side is a Single Page Application (SPA) built with React and Vite.

* **State Management:**
    * Uses React **Context API** or Custom Hooks (`useAuth`) to manage the user's login state globally.
    * If a user is not logged in, they are redirected to the Landing Page.

* **Dynamic Rendering (RBAC):**
    * The dashboard checks the `user.role` from the stored JWT.
    * **If Enthusiast:** Renders `<AsteroidCard />` components with 3D visuals and hazard warnings.
    * **If Researcher:** Renders `<DataTable />` components and enables the "Export CSV" button.

* **Visualization Engine:**
    * **Framer Motion:** Handles the smooth entry animations of the asteroid cards.
    * **Tailwind CSS:** Provides the "Glassmorphism" utility classes (transparency, blur effects) for the futuristic UI.

### 3. The Data Pipeline (Step-by-Step)
Here is the exact lifecycle of a user request in the code:

1.  **User Login:**
    * User submits credentials on Frontend.
    * Backend validates and sends back a `token`.
    * Frontend stores this token in `localStorage`.

2.  **Fetching Telemetry:**
    * Frontend component `Dashboard.jsx` mounts.
    * It calls `GET /api/asteroids/feed` with the Authorization header.
    * Backend verifies the token.
    * **Backend** calls NASA API -> Receives Data -> Cleans Data -> Sends JSON to Frontend.

3.  **Risk Analysis:**
    * Frontend iterates through the asteroid array.
    * **Logic:** `if (asteroid.is_potentially_hazardous_asteroid === true)`
    * **Action:** The UI renders a specific "Red Alert" badge and changes the card border color to warn the user.

### 4. Database Schema (`/models`)
We use MongoDB to store user profiles and persistence data.

**User Schema:**
```javascript
{
  username: String,
  email: String,
  password: String, // (Hashed)
  role: String,     // ('enthusiast' | 'researcher')
  institution: String // (Optional, for Researchers only)
}
