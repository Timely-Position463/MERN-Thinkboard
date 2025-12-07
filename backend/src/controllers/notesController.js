import Note from "../models/Notes.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1});//-1 will sort in desc (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller");
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNotById controller");
    res.status(500).json({ message: "Internal server error" });
    
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error(`Error in createNotes controller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNOte = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.status(200).json(updateNotes);
    if (!updateNotes)
      return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.error(`Error in updateNotes controller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNotes(req, res) {
  try {
    const deleteNotes = await Note.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "note deleted successfully" });
    if (!deleteNotes)
      return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.error(`Error in deleteNotes controller ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}
