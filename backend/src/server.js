import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));


  app.use((req, res,next) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
  });
});

// app.get("/api/notes", (req, res) => {
//   res.status(200).send("You got 18 notes to read");
// });
// app.post("/api/notes", (req, res) => {
//   res.status(201).json({ message:" Notes created successfully"});
// });
// app.put("/api/notes/:id", (req, res) => {
//   res.status(201).json({ message:" Notes updated successfully"});
// });
// app.delete("/api/notes", (req, res) => {

//   res.status(201).json({ message:" Notes deleted successfully"});
// });
