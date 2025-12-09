import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteInput from './components/NoteInput';
import NoteList from './components/NoteList';
import EditModal from './components/EditModal';
import { getNotes, getTrashNotes, getArchivedNotes, createNote, updateNote, deleteNote, permanentDeleteNote, restoreNote } from './services/api';
import './index.css';

function App() {
  const [notes, setNotes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('notes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    try {
      let response;
      if (activeTab === 'notes') {
        response = await getNotes();
      } else if (activeTab === 'trash') {
        response = await getTrashNotes();
      } else if (activeTab === 'archive') {
        response = await getArchivedNotes();
      } else {
        // Default or other tabs (reminders/labels not implemented fully yet)
        response = await getNotes();
      }

      if (response && response.data) {
        setNotes(response.data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [activeTab]);

  const handleCreateNote = async (note: any) => {
    try {
      await createNote(note);
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (id: string, updatedNote: any) => {
    try {
      await updateNote(id, updatedNote);
      fetchNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleArchiveNote = async (id: string) => {
    try {
      // Toggle archive status
      const note = notes.find(n => n._id === id);
      if (note) {
        await updateNote(id, { ...note, isArchived: !note.isArchived });
        fetchNotes();
      }
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const handleRestoreNote = async (id: string) => {
    try {
      await restoreNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error restoring note:', error);
    }
  }

  const handlePermanentDelete = async (id: string) => {
    try {
      await permanentDeleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note permanently:', error);
    }
  }

  const handleNoteClick = (note: any) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedNote(null);
    setIsModalOpen(false);
  }

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        toggleView={() => setIsGridView(!isGridView)}
        isGridView={isGridView}
        toggleDarkMode={toggleDarkMode}
        onNavigate={(tab) => setActiveTab(tab)}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {activeTab === 'notes' && <NoteInput onCreate={handleCreateNote} />}

          <div style={{ width: '100%', maxWidth: '1200px', marginTop: activeTab === 'notes' ? '0' : '32px' }}>
            {activeTab === 'trash' && notes.length > 0 && (
              <div style={{ textAlign: 'center', margin: '10px 0', fontStyle: 'italic', color: '#5f6368' }}>
                Notes in Trash are deleted after 7 days.
              </div>
            )}
            <NoteList
              notes={notes}
              isGridView={isGridView}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              onArchive={handleArchiveNote}
              onRestore={handleRestoreNote}
              onPermanentDelete={handlePermanentDelete}
              onNoteClick={handleNoteClick}
            />
          </div>
        </main>
      </div>
      <EditModal
        note={selectedNote}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateNote}
      />
    </div>
  );
}

export default App;
