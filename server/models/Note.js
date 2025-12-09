const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        default: '',
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String,
        default: '#ffffff', // Default white
    },
    labels: [{
        type: String,
    }],
    isArchived: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false, // For trash
    },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
