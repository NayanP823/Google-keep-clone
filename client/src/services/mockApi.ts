
// import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'google_keep_clone_data';

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getStore = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const setStore = (data: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Simulate async API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
    getNotes: async () => {
        await delay();
        const notes = getStore().filter((n: any) => !n.isDeleted && !n.isArchived);
        // Sort: pinned first, then new to old
        return { data: notes.sort((a: any, b: any) => (b.isPinned === a.isPinned ? 0 : b.isPinned ? 1 : -1) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
    },
    getTrashNotes: async () => {
        await delay();
        const notes = getStore().filter((n: any) => n.isDeleted);
        return { data: notes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
    },
    getArchivedNotes: async () => {
        await delay();
        const notes = getStore().filter((n: any) => n.isArchived && !n.isDeleted);
        return { data: notes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
    },
    createNote: async (note: any) => {
        await delay();
        const newNote = {
            ...note,
            _id: generateId(),
            isPinned: false,
            isArchived: false,
            isDeleted: false,
            color: note.color || '#fff',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const store = getStore();
        setStore([newNote, ...store]);
        return { data: newNote };
    },
    updateNote: async (id: string, updates: any) => {
        await delay();
        const store = getStore();
        const index = store.findIndex((n: any) => n._id === id);
        if (index !== -1) {
            const updatedNote = { ...store[index], ...updates, updatedAt: new Date().toISOString() };
            store[index] = updatedNote;
            setStore(store);
            return { data: updatedNote };
        }
        throw new Error('Note not found');
    },
    deleteNote: async (id: string) => {
        await delay();
        const store = getStore();
        const index = store.findIndex((n: any) => n._id === id);
        if (index !== -1) {
            store[index].isDeleted = true;
            setStore(store);
            return { data: store[index] };
        }
        throw new Error('Note not found');
    },
    restoreNote: async (id: string) => {
        await delay();
        const store = getStore();
        const index = store.findIndex((n: any) => n._id === id);
        if (index !== -1) {
            store[index].isDeleted = false;
            setStore(store);
            return { data: store[index] };
        }
        throw new Error('Note not found');
    },
    permanentDeleteNote: async (id: string) => {
        await delay();
        const store = getStore();
        const newStore = store.filter((n: any) => n._id !== id);
        setStore(newStore);
        return { message: 'Note permanently deleted' };
    }
};
