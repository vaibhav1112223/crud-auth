import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  // Fetch  tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data || []);
    } catch (err) {
      console.log("Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add  task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await API.post("/tasks", { title: title.trim(), description: description.trim() });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log("Failed to add task", err);
    }
  };

  // Updatee task
  const updateTask = async () => {
    if (!editingTask) return;
    if (!title.trim()) return;
    try {
      await API.put(`/tasks/${editingTask._id}`, { title: title.trim(), description: description.trim() });
      setEditingTask(null);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log("Failed to update task", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Failed to delete task", err);
    }
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || "");
  };

   const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/signup"); 
  };


  return (
    <div style={{ maxWidth: 500, margin: "20px auto" }}>
      <h2>Dashboard</h2>

      {/* Add and Edit Form */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: 6 }}
        />
        {editingTask ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ padding: 6, borderBottom: "1px solid #ddd" }}>
            <strong>{task.title}</strong> <br />
            <small>{task.description || "-"}</small> <br />
            <button onClick={() => startEdit(task)} style={{ marginRight: 6 }}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleLogout}>logout</button>
      <button onClick={()=>navigate("/login")}>login</button>
        <button onClick={()=>navigate("/signup")}>signup</button>
    </div>
  );
}
