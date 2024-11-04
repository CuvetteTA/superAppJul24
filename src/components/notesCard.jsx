import { useEffect, useState } from "react";
import styles from "./notesCard.module.css";


export const NotesCard = ({ note: initialNote }) => {

  const [note, setNote] = useState('');

  const handleNoteChange = (event) => {
    const newNote = event.target.value;
    setNote(newNote);
    localStorage.setItem("userNote", newNote);
  };


  useEffect(() => {
    const savedNote = localStorage.getItem('userNote');
    setNote(savedNote || initialNote || "You haven't written any notes yet. Go ahead and write one!");
  }, [initialNote]);

  return (
    <div className={styles.notesCard}>
      <h3>All notes</h3>
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Start typing your notes here..."
      ></textarea>
    </div>
  );
};
