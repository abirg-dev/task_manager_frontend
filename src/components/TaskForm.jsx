import {useEffect, useState} from "react";

function TaskForm({onSubmit, editingTask, onCancel})
{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [saving, setSaving] = useState(false);
    
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || "");
            setDueDate(editingTask.dueDate);
        }
        else {
            setTitle("");
            setDescription("");
            setDueDate("");
        }
    }, [ editingTask ]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!title.trim() || !dueDate) {
            return;
        }
        
        setSaving(true);
        
        try {
            const success = await onSubmit({
                title : title.trim(),
                description,
                dueDate
            });
            
            if (success && !editingTask) {
                setTitle("");
                setDescription("");
                setDueDate("");
            }
        }
        finally {
            setSaving(false);
        }
    };
    
    return (
        <section className="task-form">
        <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
        
        <form onSubmit={handleSubmit}>
        <label htmlFor="title">Task Title</label>
        <input
        id = "title"
        type = "text"
        placeholder = "Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        />
        
        <label htmlFor="description">Description</label>
        <textarea
        id="description"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        />
        
        <label htmlFor="dueDate">Due Date</label>
        <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        />
        
        <div className="form-actions">
        <button type="submit" disabled={saving}>
        {saving
            ? "Saving..."
            : editingTask
            ? "Update Task"
            : "Add Task"}
            </button>
            
            {editingTask && (
                <button
                type="button"
                className="secondary-btn"
                onClick={onCancel}
                >
                Cancel
                </button>
            )
        }
        </div>
        </form></section>
    );
}

export default TaskForm;