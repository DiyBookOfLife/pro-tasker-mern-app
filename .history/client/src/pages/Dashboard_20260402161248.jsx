import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5050/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post(
      "http://localhost:5050/api/projects",
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setTitle("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New project"
      />
      <button onClick={createProject}>Add</button>

      {projects.map((p) => (
        <div key={p._id}>
          <Link to={`/projects/${p._id}`}>{p.title}</Link>
        </div>
      ))}
    </div>
  );
}
