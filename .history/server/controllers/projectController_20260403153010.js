import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    console.log("PROJECT BODY:", req.body);
    console.log("USER:", req.user);

    const { name, description } = req.body;

    const project = await Project.create({
      title: name, // 🔥 FIX
      description,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    console.log("PROJECT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  res.json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await project.deleteOne();

  res.json({ msg: "Project deleted" });
};
