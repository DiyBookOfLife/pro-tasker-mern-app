import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body, // includes title, description, status
    user: req.user.id, // attach to logged-in user
    project: req.params.projectId, // link to project
  });

  res.json(task);
};

export const getTasks = async (req, res) => {
  // only return tasks for this user + this project
  const tasks = await Task.find({
    user: req.user.id,
    project: req.params.projectId,
  });

  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

  // ensure user owns task AND it belongs to correct project
  if (
    !task ||
    task.user.toString() !== req.user.id ||
    task.project.toString() !== req.params.projectId
  ) {
    return res.status(403).json({ msg: "Not authorized" });
  }
  res.json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  // protect update (ownership + project match)
  if (
    !task ||
    task.user.toString() !== req.user.id ||
    task.project.toString() !== req.params.projectId
  ) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  // protect delete
  if (
    !task ||
    task.user.toString() !== req.user.id ||
    task.project.toString() !== req.params.projectId
  ) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await task.deleteOne();

  res.json({ msg: "Task deleted" });
};
