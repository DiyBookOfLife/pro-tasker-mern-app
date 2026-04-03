import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
    project: req.params.projectId,
  });

  res.json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
    project: req.params.projectId,
  });

  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);

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
