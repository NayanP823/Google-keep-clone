import React, { useState, useEffect } from 'react';
import { MdPushPin, MdImage, MdUndo, MdRedo, MdArchive, MdMoreVert, MdAddAlert, MdPersonAdd, MdPalette } from 'react-icons/md';

interface EditModalProps {
    note: any | null;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, note: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ note, isOpen, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#fff');
    const [isPinned, setIsPinned] = useState(false);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
            setColor(note.color);
            setIsPinned(note.isPinned);
        }
    }, [note]);

    const handleSave = () => {
        if (note) {
            onUpdate(note._id, { ...note, title, content, color, isPinned });
        }
        onClose();
    };

    if (!isOpen || !note) return null;

    return (
        <div style={styles.overlay} onClick={handleSave}>
            <div style={{ ...styles.modal, backgroundColor: color }} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        style={styles.titleInput}
                    />
                    <button
                        style={{ ...styles.iconButton, opacity: isPinned ? 1 : 0.5 }}
                        onClick={() => setIsPinned(!isPinned)}
                    >
                        <MdPushPin size={24} />
                    </button>
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Note"
                    style={styles.contentInput}
                />

                <div style={styles.footer}>
                    <div style={styles.leftActions}>
                        <button style={styles.iconButton}><MdAddAlert size={18} /></button>
                        <button style={styles.iconButton}><MdPersonAdd size={18} /></button>
                        <button style={styles.iconButton}><MdPalette size={18} /></button>
                        <button style={styles.iconButton}><MdImage size={18} /></button>
                        <button style={styles.iconButton}><MdArchive size={18} /></button>
                        <button style={styles.iconButton}><MdMoreVert size={18} /></button>
                        <button style={styles.iconButton}><MdUndo size={18} /></button>
                        <button style={styles.iconButton}><MdRedo size={18} /></button>
                    </div>
                    <button style={styles.closeButton} onClick={handleSave}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(229, 229, 229, 0.75)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        width: '100%',
        maxWidth: '600px',
        borderRadius: '8px',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.30), 0 2px 6px 2px rgba(60,64,67,0.15)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        maxHeight: '90vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    titleInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '22px',
        fontWeight: 500,
        backgroundColor: 'transparent',
    },
    contentInput: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        backgroundColor: 'transparent',
        resize: 'none' as 'none',
        fontFamily: 'Roboto, Arial, sans-serif',
        minHeight: '150px',
        overflowY: 'auto' as 'auto',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
    },
    leftActions: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        color: '#5f6368',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 24px',
        borderRadius: '4px',
        color: '#202124',
        fontWeight: 500,
        fontSize: '14px',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.08)'
        }
    },
};

export default EditModal;
