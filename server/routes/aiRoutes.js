import "dotenv/config";
import express from "express";
import { CohereClientV2 } from "cohere-ai";

const router = express.Router();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});
console.log(
  "Cohere API key loaded:",

  Boolean(process.env.COHERE_API_KEY),
);
router.post("/project-plan", async (req, res) => {
  try {
    const { projectName, projectDescription, tasks = [] } = req.body;

    if (!projectName) {
      return res.status(400).json({
        message: "Project name is required.",
      });
    }

    const taskList =
      tasks.length > 0
        ? tasks
            .map(
              (task, index) => `${index + 1}. ${task.title} — ${task.status}`,
            )
            .join("\n")
        : "No tasks have been added yet.";

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content:
            "You are a practical project planning assistant. Give a short summary, five clear next steps, and any likely blockers.",
        },
        {
          role: "user",
          content: `
Project name: ${projectName}

Project description:
${projectDescription || "No description provided."}

Current tasks:
${taskList}
          `,
        },
      ],
    });

    const plan =
      response.message?.content
        ?.filter((item) => item.type === "text")
        .map((item) => item.text)
        .join("\n") || "No plan was generated.";

    res.status(200).json({ plan });
  } catch (error) {
    console.error("FULL COHERE ERROR:", error);

    console.error("COHERE ERROR BODY:", error?.body);

    console.error("COHERE ERROR MESSAGE:", error?.message);

    res.status(error?.statusCode || 500).json({
      message:
        error?.body?.message ||
        error?.message ||
        "Unable to generate the AI plan.",
    });
  }
});

export default router;
