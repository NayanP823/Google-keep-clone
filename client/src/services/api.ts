// import axios from 'axios';
import { mockApi } from './mockApi';

// Switching to Mock API since local MongoDB is not available
// const api = axios.create({
//     baseURL: 'http://127.0.0.1:5000/api',
// });

export const getNotes = () => mockApi.getNotes();
export const getTrashNotes = () => mockApi.getTrashNotes();
export const getArchivedNotes = () => mockApi.getArchivedNotes();
export const createNote = (note: any) => mockApi.createNote(note);
export const updateNote = (id: string, note: any) => mockApi.updateNote(id, note);
export const deleteNote = (id: string) => mockApi.deleteNote(id);
export const permanentDeleteNote = (id: string) => mockApi.permanentDeleteNote(id);
export const restoreNote = (id: string) => mockApi.restoreNote(id);

export default mockApi;
