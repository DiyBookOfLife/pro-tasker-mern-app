import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get(
      `http://localhost:5050/api/projects/${id}/tasks`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post(
      `http://localhost:5050/api/projects/${id}/tasks`,
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={createTask}>Add</button>

      {tasks.map((t) => (
        <div key={t._id}>{t.title}</div>
      ))}
    </div>
  );
}
