// ================= PROJECT PAGE =================

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";

const ProjectPage = () => {
  const { projectId } = useParams(); // get project ID from URL

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPage = async () => {
    try {
      // fetch project + tasks at the same time
      setLoading(true);

      const [projectRes, tasksRes] = await Promise.all([
        API.get(`/projects/${projectId}`),
        API.get(`/projects/${projectId}/tasks`),
      ]);

      setProject(projectRes.data);

      // backend uses "title", so I map it to "name" for my form
      setProjectForm({
        name: projectRes.data.title,
        description: projectRes.data.description || "",
      });

      setTasks(tasksRes.data || []); // ensure tasks is always an array
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
      const { data } = await API.put(`/projects/${projectId}`, projectForm);
      setProject(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      // create new task tied to this project
      const { data } = await API.post(`/projects/${projectId}/tasks`, taskForm);

      setTasks([data, ...tasks]);
      setTaskForm({ title: "", description: "", status: "To Do" });
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      // update task status (To Do → In Progress → Done)
      const { data } = await API.put(`/projects/${projectId}/tasks/${taskId}`, {
        status,
      });

      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/projects/${projectId}/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (!project) return <div className="container">Project not found</div>;

  return (
    <div className="container">
      <Link to="/">Back</Link>

      <form onSubmit={updateProject} className="card form">
        <h2>Edit Project</h2>
        <input
          value={projectForm.name}
          onChange={(e) =>
            setProjectForm({ ...projectForm, name: e.target.value })
          }
        />
        <textarea
          value={projectForm.description}
          onChange={(e) =>
            setProjectForm({
              ...projectForm,
              description: e.target.value,
            })
          }
        />
        <button>Save</button>
      </form>

      <form onSubmit={createTask} className="card form">
        <h2>Add Task</h2>
        <input
          placeholder="Task title"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          value={taskForm.description}
          onChange={(e) =>
            setTaskForm({
              ...taskForm,
              description: e.target.value,
            })
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
        <button>Add Task</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="grid">
        {(tasks || []).map((task) => (
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
