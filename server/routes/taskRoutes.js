import express from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const task = await Task.create({
    ...req.body,
    project: req.params.projectId,
    user: req.user.id,
  });

  res.json(task);
});

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({
    project: req.params.projectId,
    user: req.user.id,
  });

  res.json(tasks);
});

router.get("/:taskId", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task || task.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  res.json(task);
});

router.put("/:taskId", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task || task.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    new: true,
  });

  res.json(updated);
});

router.delete("/:taskId", authMiddleware, async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task || task.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await task.deleteOne();

  res.json({ msg: "Task deleted" });
});
