import React, { useState } from 'react';
import { MdPushPin, MdColorLens, MdArchive, MdDelete, MdMoreVert, MdImage, MdRestoreFromTrash, MdDeleteForever, MdNotifications, MdPersonAdd } from 'react-icons/md';

interface NoteProps {
    note: any;
    onUpdate: (id: string, note: any) => void;
    onDelete: (id: string) => void;
    onArchive: (id: string) => void;
    onRestore?: (id: string) => void;
    onPermanentDelete?: (id: string) => void;
    onClick: () => void;
}

const NoteCard: React.FC<NoteProps> = ({ note, onUpdate, onDelete, onArchive, onRestore, onPermanentDelete, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);

    const colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

    const handleAction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };

    const handleColorSelect = (e: React.MouseEvent, color: string) => {
        e.stopPropagation();
        onUpdate(note._id, { ...note, color });
        setShowColorPicker(false);
    };

    const handleImageAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        const url = prompt('Enter image URL:');
        if (url) {
            onUpdate(note._id, { ...note, content: note.content + `\n![Image](${url})` });
        }
    };

    return (
        <div
            style={{
                ...styles.card,
                backgroundColor: note.color === '#ffffff' ? 'var(--bg-color)' : note.color,
                color: note.color !== '#ffffff' ? '#202124' : 'inherit'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setShowColorPicker(false); }}
            onClick={onClick}
        >
            <div style={styles.cardInner}>
                <div style={styles.header}>
                    {note.title && <h3 style={styles.title}>{note.title}</h3>}
                    <button
                        style={{ ...styles.pinButton, opacity: isHovered || note.isPinned ? 1 : 0 }}
                        onClick={(e) => handleAction(e, () => onUpdate(note._id, { ...note, isPinned: !note.isPinned }))}
                    >
                        <MdPushPin size={24} color={note.isPinned ? (note.color !== '#ffffff' ? '#202124' : 'var(--text-color)') : 'var(--icon-color)'} />
                    </button>
                </div>
                <div style={styles.content}>
                    {note.content.split('\n').map((line: string, index: number) => {
                        const imageMatch = line.match(/!\[Image\]\((.*?)\)/);
                        if (imageMatch) {
                            return <img key={index} src={imageMatch[1]} alt="Note attachment" style={{ maxWidth: '100%', borderRadius: '4px', marginTop: '8px' }} />;
                        }
                        return <div key={index}>{line}</div>;
                    })}
                </div>
            </div>

            <div style={{ ...styles.footer, opacity: isHovered ? 1 : 0 }}>
                {note.isDeleted ? (
                    <>
                        <button style={styles.iconButton} onClick={(e) => handleAction(e, () => onRestore && onRestore(note._id))} title="Restore">
                            <MdRestoreFromTrash size={18} />
                        </button>
                        <button style={styles.iconButton} onClick={(e) => handleAction(e, () => onPermanentDelete && onPermanentDelete(note._id))} title="Delete Forever">
                            <MdDeleteForever size={18} />
                        </button>
                    </>
                ) : (
                    <>
                        <div style={styles.actionGroup}>
                            <button style={styles.iconButton} title="Remind me">
                                <MdNotifications size={18} />
                            </button>
                            <button style={styles.iconButton} title="Collaborator">
                                <MdPersonAdd size={18} />
                            </button>
                            <div style={{ position: 'relative' }}>
                                <button
                                    style={styles.iconButton}
                                    title="Background options"
                                    onClick={(e) => { e.stopPropagation(); setShowColorPicker(!showColorPicker); }}
                                >
                                    <MdColorLens size={18} />
                                </button>
                                {showColorPicker && (
                                    <div style={styles.colorPicker} onClick={(e) => e.stopPropagation()}>
                                        {colors.map((c) => (
                                            <div
                                                key={c}
                                                style={{ ...styles.colorCircle, backgroundColor: c, border: note.color === c ? '2px solid #5f6368' : '1px solid #e0e0e0' }}
                                                onClick={(e) => handleColorSelect(e, c)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button style={styles.iconButton} title="Add image" onClick={handleImageAdd}>
                                <MdImage size={18} />
                            </button>
                            <button style={styles.iconButton} onClick={(e) => handleAction(e, () => onArchive(note._id))} title="Archive">
                                <MdArchive size={18} />
                            </button>
                            <button style={styles.iconButton} title="More">
                                <MdMoreVert size={18} />
                            </button>
                            <button style={styles.iconButton} onClick={(e) => handleAction(e, () => onDelete(note._id))} title="Delete">
                                <MdDelete size={18} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    card: {
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        marginBottom: '16px',
        width: '100%',
        cursor: 'default',
        transition: 'box-shadow 0.2s',
        position: 'relative' as 'relative',
        overflow: 'visible', // Changed to visible for color picker popout
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        justifyContent: 'space-between'
    },
    cardInner: {
        padding: '12px 16px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        margin: '0 0 8px 0',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '1.5rem',
    },
    content: {
        margin: 0,
        fontSize: '14px',
        lineHeight: '1.25rem',
        whiteSpace: 'pre-wrap' as 'pre-wrap',
        minHeight: '20px',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 8px',
        transition: 'opacity 0.2s',
    },
    actionGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'inherit',
        margin: '0 2px',
        outline: 'none',
    },
    pinButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        color: 'var(--icon-color)',
        outline: 'none',
    },
    colorPicker: {
        position: 'absolute' as 'absolute',
        bottom: '100%',
        left: 0,
        backgroundColor: 'var(--bg-color)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap' as 'wrap',
        width: '140px',
        zIndex: 10,
        border: '1px solid var(--border-color)',
    },
    colorCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        cursor: 'pointer',
    }
};

export default NoteCard;
