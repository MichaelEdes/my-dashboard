import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db"; // Assuming you have a database connection pool set up

const app = express();

// Middleware
app.use(
  cors({
    origin: "*" // Allow all origins for testing
  })
);

app.use(express.json()); // Parse JSON request bodies

// POST /notes endpoint
app.post("/notes", async (req: Request, res: Response) => {
  const { title, body, tags } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  try {
    const now = new Date();
    const result = await pool.query(
      "INSERT INTO notes (title, body, tags, created_at, last_updated) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, body, tags, now, now]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note." });
  }
});

// GET /notes/:id endpoint to retrieve a specific note by ID
app.get("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // Extract the ID from the URL

  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.status(200).json(result.rows[0]); // Respond with the note data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve the note." });
  }
});

// PUT /notes/:id endpoint to update a note by ID
app.put("/notes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;

  console.log("Request Body:", { id, title, body, tags }); // Debugging log

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  try {
    const result = await pool.query(
      "UPDATE notes SET title = $1, body = $2, tags = $3, last_updated = NOW() WHERE id = $4::int RETURNING *",
      [title, body, tags, id]
    );

    console.log("Query Result:", result.rows); // Debugging log

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating note:", err); // Log detailed error
    res.status(500).json({ error: "Failed to update note." });
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
