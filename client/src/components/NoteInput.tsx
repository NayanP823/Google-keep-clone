import React, { useState, useRef, useEffect } from 'react';
import { MdCheckBox, MdBrush, MdImage, MdPushPin, MdUndo, MdRedo, MdArchive, MdMoreVert, MdAddAlert, MdPersonAdd, MdPalette } from 'react-icons/md';

interface NoteInputProps {
    onCreate: (note: any) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ onCreate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const colors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

    const handleClose = () => {
        if (title.trim() || content.trim()) {
            onCreate({ title, content, color });
        }
        setTitle('');
        setContent('');
        setColor('#ffffff');
        setIsExpanded(false);
        setShowColorPicker(false);
    };

    const handleImageAdd = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            setContent((prev) => prev + `\n![Image](${url})`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded, title, content, color]);

    return (
        <div style={styles.container}>
            <div ref={containerRef} style={{ ...styles.inputBox, backgroundColor: color, boxShadow: isExpanded ? '0 1px 2px 0 rgba(60,64,67,0.30), 0 2px 6px 2px rgba(60,64,67,0.15)' : '0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15)' }}>
                {isExpanded && (
                    <div style={styles.titleContainer}>
                        <input
                            type="text"
                            placeholder="Title"
                            style={styles.inputTitle}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button style={styles.iconButton}>
                            <MdPushPin size={24} />
                        </button>
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Take a note..."
                    style={styles.inputContent}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onClick={() => setIsExpanded(true)}
                />

                {isExpanded ? (
                    <div style={styles.footer}>
                        <div style={styles.leftActions}>
                            <button style={styles.iconButton}><MdAddAlert size={20} /></button>
                            <button style={styles.iconButton}><MdPersonAdd size={20} /></button>
                            <div style={{ position: 'relative' }}>
                                <button
                                    style={styles.iconButton}
                                    onClick={() => setShowColorPicker(!showColorPicker)}
                                >
                                    <MdPalette size={20} />
                                </button>
                                {showColorPicker && (
                                    <div style={styles.colorPicker}>
                                        {colors.map((c) => (
                                            <div
                                                key={c}
                                                style={{ ...styles.colorCircle, backgroundColor: c, border: color === c ? '2px solid #5f6368' : '1px solid #e0e0e0' }}
                                                onClick={() => { setColor(c); setShowColorPicker(false); }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button style={styles.iconButton} onClick={handleImageAdd}><MdImage size={20} /></button>
                            <button style={styles.iconButton}><MdArchive size={20} /></button>
                            <button style={styles.iconButton}><MdMoreVert size={20} /></button>
                            <button style={styles.iconButton}><MdUndo size={20} /></button>
                            <button style={styles.iconButton}><MdRedo size={20} /></button>
                        </div>
                        <button style={styles.closeButton} onClick={handleClose}>
                            Close
                        </button>
                    </div>
                ) : (
                    <div style={styles.collapsedIcons}>
                        <button style={styles.iconButton}><MdCheckBox size={24} /></button>
                        <button style={styles.iconButton}><MdBrush size={24} /></button>
                        <button style={styles.iconButton}><MdImage size={24} /></button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    // ... existing styles ...
    container: {
        display: 'flex',
        justifyContent: 'center',
        margin: '32px 0 16px',
        padding: '0 16px',
    },
    inputBox: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '700px',
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column' as 'column',
        position: 'relative' as 'relative',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px 0 16px',
    },
    inputTitle: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        fontWeight: 500,
        backgroundColor: 'transparent',
        padding: '4px 0',
    },
    inputContent: {
        width: '100%',
        border: 'none',
        outline: 'none',
        fontSize: '14px',
        backgroundColor: 'transparent',
        padding: '12px 48px 12px 16px',
        resize: 'none' as 'none',
        fontFamily: 'Roboto, Arial, sans-serif',
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 8px 8px 8px',
    },
    leftActions: {
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        color: '#5f6368',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '34px',
        height: '34px',
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
    },
    collapsedIcons: {
        position: 'absolute' as 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        gap: '2px',
    },
    colorPicker: {
        position: 'absolute' as 'absolute',
        bottom: '100%',
        left: 0,
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap' as 'wrap',
        width: '140px',
        zIndex: 10,
    },
    colorCircle: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        cursor: 'pointer',
    }
};

export default NoteInput;
