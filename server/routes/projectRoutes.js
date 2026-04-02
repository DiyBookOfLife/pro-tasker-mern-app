import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const project = await Project.create({
    ...req.body,
    user: req.user.id,
  });

  res.json(project);
});

router.get("/", authMiddleware, async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  res.json(project);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await project.deleteOne();

  res.json({ msg: "Project deleted" });
});
