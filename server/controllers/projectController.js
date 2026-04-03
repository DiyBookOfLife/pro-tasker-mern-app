import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // backend uses "title", so I map frontend "name" → "title"
    const project = await Project.create({
      title: name,
      description,
      user: req.user.id, // attach project to logged-in user
    });

    res.status(201).json(project);
  } catch (err) {
    console.log("PROJECT ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
export const getProjects = async (req, res) => {
  // only return projects that belong to the logged-in user
  const projects = await Project.find({ user: req.user.id });
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // ensure user can only access their own project
  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  res.json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // protect route (ownership check)
  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  // update project and return updated version
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  // ensure only owner can delete
  if (!project || project.user.toString() !== req.user.id) {
    return res.status(403).json({ msg: "Not authorized" });
  }

  await project.deleteOne(); // remove from DB

  res.json({ msg: "Project deleted" });
};
