import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

// Retrieve all tasks
export const getTasks = () => axios.get(API_URL);

// Create task
export const createTask
    = (task) => axios.post(API_URL, task);

// Update task details
export const updateTask
    = (id, task) => axios.put(`${API_URL}/${id}`, task);

// Update completion status
export const updateTaskStatus
    = (id, completed) => axios.patch(
        `${API_URL}/${id}/status`, {completed});

// Delete task
export const deleteTask
    = (id) => axios.delete(`${API_URL}/${id}`);