import React from 'react';
import Masonry from 'react-masonry-css';
import NoteCard from './NoteCard';

interface NoteListProps {
    notes: any[];
    isGridView: boolean;
    onUpdate: (id: string, note: any) => void;
    onDelete: (id: string) => void;
    onArchive: (id: string) => void;
    onRestore?: (id: string) => void;
    onPermanentDelete?: (id: string) => void;
    onNoteClick: (note: any) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, isGridView, onUpdate, onDelete, onArchive, onRestore, onPermanentDelete, onNoteClick }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    if (!isGridView) {
        return (
            <div style={styles.listView}>
                {notes.map(note => (
                    <div key={note._id} style={styles.listContainer}>
                        <NoteCard
                            note={note}
                            onUpdate={(id, n) => onUpdate(id, n)}
                            onDelete={onDelete}
                            onArchive={onArchive}
                            onRestore={onRestore}
                            onPermanentDelete={onPermanentDelete}
                            onClick={() => onNoteClick(note)}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={styles.masonry}
        >
            {notes.map((note) => (
                <NoteCard
                    key={note._id}
                    note={note}
                    onUpdate={(id, n) => onUpdate(id, n)}
                    onDelete={onDelete}
                    onArchive={onArchive}
                    onRestore={onRestore}
                    onPermanentDelete={onPermanentDelete}
                    onClick={() => onNoteClick(note)}
                />
            ))}
        </Masonry>
    );
};

const styles = {
    masonry: {
        display: 'flex',
        marginLeft: '-16px', /* gutter size offset */
        width: 'auto',
        padding: '0 50px'
    },
    listView: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '20px'
    },
    listContainer: {
        width: '100%',
        maxWidth: '600px',
    }
};

// Add global styles for masonry (simulating it since we can't easily add css file right now without more steps, but ideally this goes in index.css)
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -16px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 16px; /* gutter size */
    background-clip: padding-box;
  }
`;
document.head.appendChild(styleTag);

export default NoteList;
