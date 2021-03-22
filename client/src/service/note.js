
import http from './http'

// * Get Notes
const getNotes = () => http.get('note')

// * Create a note
const createNote = (note) => http.post('note', note)

// * Delete a note
const deleteNote = (noteId) => http.delete(`note/${noteId}`)


export default {
    getNotes,
    createNote,
    deleteNote
}