# Real-Time Asynchronous Chat Application

A full-stack, real-time messaging platform built to demonstrate advanced full-stack architecture, asynchronous backend processing, and live state management. 

Unlike standard HTTP request/response web apps, this project utilizes WebSockets to maintain persistent, bidirectional communication tunnels between the client and the server, allowing for instant data broadcasting across multiple users.

## 🚀 Technical Architecture

### Backend (Asynchronous Python)
- **Django & Django Channels:** Handles standard routing and upgrades HTTP connections to WebSockets.
- **Daphne (ASGI):** Replaces traditional WSGI servers to handle thousands of concurrent, idle WebSocket connections asynchronously without blocking the main thread.
- **Redis:** Acts as the high-performance in-memory message broker. It manages "Channel Layers," allowing the server to instantly broadcast messages from one user's WebSocket connection to all other users in the same chat room.
- **SQLite3:** Relational database used for persistent chat history storage.

### Frontend (Modern React)
- **React (Vite):** Lightning-fast frontend tooling and component-based UI.
- **React Router:** Handles client-side navigation between the login portal and dynamic chat rooms.
- **Tailwind CSS:** Utility-first CSS framework used to build a highly responsive, modern, and accessible user interface with auto-scrolling chat bubbles.
- **Native WebSockets:** Interacts directly with the browser's native WebSocket API to stream data to and from the Django backend in real-time.

---

## ✨ Core Features
*   **Real-Time Messaging:** Sub-second message delivery using WebSocket protocols.
*   **Dynamic Chat Rooms:** Users can join isolated, room-specific broadcast groups.
*   **Persistent Memory:** Messages are saved asynchronously to the database; users rejoining a room instantly see the historical context.
*   **Responsive UI:** Mobile-friendly, auto-scrolling interface that visually distinguishes sender and receiver message bubbles.

---

## 💻 Local Setup Instructions

### Prerequisites
* Python 3.10+
* Node.js & npm
* Redis (Running natively or via Docker)

### 1. Start the Redis Broker (Docker)
```bash
docker run -p 6379:6379 -d redis
2. Boot the Django Backend
Navigate to the backend directory, activate your virtual environment, and run the ASGI server:

Bash
cd backend
python -m venv env
source env/Scripts/activate  # On Windows
pip install -r requirements.txt
python chatapp/manage.py migrate
python chatapp/manage.py runserver
3. Launch the React Frontend
Open a new terminal, navigate to the frontend directory, and start the Vite development server:

Bash
cd frontend
npm install
npm run dev
Visit http://localhost:5173 to start chatting!