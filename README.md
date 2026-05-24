# Pipeline Builder

A dynamic, node-based visual pipeline builder that allows users to create, configure, and analyze data/AI processing flows. The project consists of a React-based frontend using **React Flow** and a Python-based backend using **FastAPI**.

---

## 🚀 Features

- **Drag-and-Drop Canvas**: Drag node types from the toolbar and place them anywhere on the workspace.
- **Rich Node Library**: Includes Input, Output, LLM, Text, and other specialized nodes.
- **Interactive Connections**: Connect nodes together using handle points to establish the flow of data.
- **Backend Pipeline Parsing**: Submit the pipeline configuration (nodes and edges) to check:
  - Total number of nodes.
  - Total number of edges.
  - Whether the graph is a **Directed Acyclic Graph (DAG)** using topological sort validation.

---

## 📂 Project Structure

```text
assignment/
├── backend/                  # FastAPI Backend
│   ├── main.py               # Main application and DAG parsing logic
│   └── requirements.txt      # Python dependencies
└── frontend/                 # React Frontend
    ├── public/
    └── src/
        ├── nodes/            # Node component definitions (LLM, Text, Input, Output, etc.)
        ├── App.js            # Main React Entry Point
        ├── store.js          # Zustand store for React Flow state management
        ├── ui.js             # Canvas layout and setup
        └── submit.js         # API submission to backend
```

---

## 🛠️ Getting Started

### Prerequisites

- **Python** (version 3.8 or higher)
- **Node.js** (version 16 or higher)
- **npm** (comes packaged with Node.js)

### 1. Run the Backend

Navigate to the `backend` folder, set up your Python environment, and start the FastAPI dev server:

```bash
# Navigate to backend directory
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

The backend server will run on [http://localhost:8000](http://localhost:8000). You can view the interactive API docs at [http://localhost:8000/docs](http://localhost:8000/docs).

### 2. Run the Frontend

Navigate to the `frontend` folder, install the npm modules, and run the React app:

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open automatically in your browser at [http://localhost:3000](http://localhost:3000).

---

## 🔌 API Documentation

### **POST** `/pipelines/parse`

Validates a pipeline structure and checks if it forms a Directed Acyclic Graph (DAG).

- **Request Body Format**:
  ```json
  {
    "nodes": [
      { "id": "node-1", "type": "input" },
      { "id": "node-2", "type": "llm" }
    ],
    "edges": [
      { "source": "node-1", "target": "node-2" }
    ]
  }
  ```

- **Response Format**:
  ```json
  {
    "num_nodes": 2,
    "num_edges": 1,
    "is_dag": true
  }
  ```
