import "./App.css";

import {useEffect, useState} from "react";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus
} from "./api/taskApi";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App()
{
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  
  const getErrorMessage = (err) => {
    return (
      err.response?.data?.message
      || (err.response
        ? "Request failed. Please try again."
        : "Cannot connect to the Spring Boot backend."));
      };
      
      const loadTasks = async () => {
        setLoading(true);
        
        try {
          const response = await getTasks();
          setTasks(response.data);
          setError("");
        }
        catch (err) {
          setError(getErrorMessage(err));
        }
        finally {
          setLoading(false);
        }
      };
      
      useEffect(() => { loadTasks(); }, []);
      
      const handleSave = async (task) => {
        setError("");
        setSuccess("");
        
        try {
          if (editingTask) {
            const response = await updateTask(
              editingTask.id, task);
              
              setTasks(
                (previous) => previous.map(
                  (item) => item.id === editingTask.id
                  ? response.data
                  : item));
                  
                  setEditingTask(null);
                  setSuccess("Task updated successfully.");
                }
                else {
                  const response = await createTask(task);
                  
                  setTasks((previous) => [...previous,
                    response.data]);
                    
                    setSuccess("Task created successfully.");
                  }
                  
                  return true;
                }
                catch (err) {
                  setError(getErrorMessage(err));
                  return false;
                }
              };
              
              const handleToggleStatus = async (id, completed) => {
                setError("");
                setSuccess("");
                
                try {
                  const response
                  = await updateTaskStatus(id, completed);
                  
                  setTasks((previous) => previous.map(
                    (task) => task.id === id
                    ? response.data
                    : task));
                    
                    if (editingTask?.id === id) {
                      setEditingTask(response.data);
                    }
                    
                    setSuccess("Task status updated successfully.");
                  }
                  catch (err) {
                    setError(getErrorMessage(err));
                  }
                };
                
                const handleDelete = async (id) => {
                  if (!window.confirm("Delete this task?")) {
                    return;
                  }
                  
                  setError("");
                  setSuccess("");
                  
                  try {
                    await deleteTask(id);
                    
                    setTasks((previous) => previous.filter(
                      (task) => task.id !== id));
                      
                      if (editingTask?.id === id) {
                        setEditingTask(null);
                      }
                      
                      setSuccess("Task deleted successfully.");
                    }
                    catch (err) {
                      setError(getErrorMessage(err));
                    }
                  };
                  
                  return (
                    <div className = "container"><header>
                    <h1>Task Management Application</h1>
                    <p>Manage and track your daily tasks</p>
                    </header>
                    
                    {error && (
                      <div className="alert error" role="alert">
                      {error}
                      </div>)
                    }
                    
                    {success && (
                      <div className="alert success" role="status">
                      {success}
                      </div>
                    )}
                    
                    <TaskForm
                    onSubmit={handleSave}
                    editingTask={editingTask}
                    onCancel={() => setEditingTask(null)}
                    />
                    
                    {loading ? (
                      <p>Loading tasks...</p>
                    ) : (
                      <TaskList
                      tasks={tasks}
                      onEdit={setEditingTask}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                      />
                    )}
                    </div>
                  );
                }
                
export default App;