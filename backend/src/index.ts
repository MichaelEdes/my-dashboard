import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db"; // Assuming you have a database connection pool set up

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend
app.use(express.json()); // Parse JSON request bodies

// POST /notes endpoint
app.post("/notes", async (req: Request, res: Response) => {
  const { title, body, tags } = req.body; // Destructure request data

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO notes (title, body, tags) VALUES ($1, $2, $3) RETURNING *",
      [title, body, tags]
    );
    res.status(201).json(result.rows[0]); // Respond with the newly created note
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note." });
  }
});

// GET /notes endpoint to retrieve all notes
app.get("/notes", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows); // Respond with all notes
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve notes." });
  }
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
