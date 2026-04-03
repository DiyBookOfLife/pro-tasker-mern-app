import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import request from "../api";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data: newProject } = await API.post("/projects", form);

      setProjects([newProject, ...projects]);
      setForm({ name: "", description: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <h1>Pro-Tasker</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout}>Logout</button>
      </div>

      <form onSubmit={handleCreate} className="card form">
        <h2>Create Project</h2>
        <input
          name="name"
          type="text"
          placeholder="Project name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Project description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Project</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div className="grid">
          {projects.map((project) => (
            <div key={project._id} className="card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="row">
                <Link to={`/projects/${project._id}`} className="button-link">
                  Open
                </Link>
                <button onClick={() => handleDelete(project._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
