function TaskList({tasks, onEdit, onDelete, onToggleStatus})
{
    if (tasks.length === 0) {
        return (
            <section className="task-list">
            <h2>My Tasks</h2>
            <p>No tasks available. Add your first task.</p>
            </section>
        );
    }
    
    return (
        <section className="task-list">
        <h2>My Tasks</h2>
        
        <div className="task-grid">
        {tasks.map((task) => (
            <div
            key = {task.id} className
            = {`task-card ${
                task.completed ? "completed" : ""}`}
                > <div className = "task-header">
                <h3>{task.title}</h3>
                
                <span
                className={`status ${
                    task.completed ? "done" : "pending"
                }`}
                >
                {task.completed ? "Completed" : "Pending"}
                </span>
                </div>
                
                <p>{task.description || "No description"}</p>
                
                <p className = "due-date">
                <strong>Due Date: </strong> {task.dueDate}
                </p>
                
                <div className = "task-actions"><button
                className = "status-btn"
                onClick
                = {() => onToggleStatus(task.id,
                    !task.completed)}
                    > {task.completed ? "Mark Pending"
                        : "Complete"}</button>
                        
                        <button
                        className="edit-btn"
                        onClick={() => onEdit(task)}
                        >
                        Edit
                        </button>
                        
                        < button
                        className = "delete-btn"
                        onClick
                        = {() => onDelete(task.id)}
                        > Delete</button>
                        </div>
                        </div>
                    ))}
                    </div></section>
                );
            }
            
export default TaskList;