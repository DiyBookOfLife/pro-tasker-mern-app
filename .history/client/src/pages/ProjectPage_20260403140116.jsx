import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projectForm, setProjectForm] = useState({ name: "", description: "" });
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPage = async () => {
    try {
      setLoading(true);
      const [projectData, tasksData] = await Promise.all([
        request(`/projects/${projectId}`),
        request(`/projects/${projectId}/tasks`),
      ]);

      setProject(projectData);
      setProjectForm({
        name: projectData.name,
        description: projectData.description || "",
      });
      setTasks(tasksData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [projectId]);

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const updated = await request(`/projects/${projectId}`, {
        method: "PUT",
        body: JSON.stringify(projectForm),
      });
      setProject(updated);
    } catch (err) {
      setError(err.message);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await request(`/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify(taskForm),
      });

      setTasks([newTask, ...tasks]);
      setTaskForm({ title: "", description: "", status: "To Do" });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const updated = await request(`/projects/${projectId}/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });

      setTasks(tasks.map((task) => (task._id === taskId ? updated : task)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await request(`/projects/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  if (!project)
    return (
      <div className="container">
        <p>Project not found.</p>
      </div>
    );

  return (
    <div className="container">
      <Link to="/" className="back-link">
        Back
      </Link>

      <form onSubmit={updateProject} className="card form">
        <h2>Edit Project</h2>
        <input
          type="text"
          value={projectForm.name}
          onChange={(e) =>
            setProjectForm({ ...projectForm, name: e.target.value })
          }
        />
        <textarea
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({ ...projectForm, description: e.target.value })
          }
        />
        <button type="submit">Save Project</button>
      </form>

      <form onSubmit={createTask} className="card form">
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          value={taskForm.description}
          onChange={(e) =>
            setTaskForm({ ...taskForm, description: e.target.value })
          }
        />
        <select
          value={taskForm.status}
          onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {tasks.map((task) => (
          <div key={task._id} className="card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(task._id, e.target.value)}
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
