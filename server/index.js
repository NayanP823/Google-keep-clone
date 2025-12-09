require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Google Keep Clone API is running');
});

// Routes

// Get all notes (not deleted)
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find({ isDeleted: false }).sort({ isPinned: -1, createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get trash notes
app.get('/api/notes/trash', async (req, res) => {
    try {
        const notes = await Note.find({ isDeleted: true }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get archived notes
app.get('/api/notes/archive', async (req, res) => {
    try {
        const notes = await Note.find({ isArchived: true, isDeleted: false }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new note
app.post('/api/notes', async (req, res) => {
    try {
        const newNote = new Note(req.body);
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a note (Soft delete -> Move to trash)
app.delete('/api/notes/:id', async (req, res) => {
    try {
        // Check if query param 'permanent' is true for permanent delete
        if (req.query.permanent === 'true') {
            await Note.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Note permanently deleted' });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Restore note from trash
app.put('/api/notes/:id/restore', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false },
            { new: true }
        );
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
