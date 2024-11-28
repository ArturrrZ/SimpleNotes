import React from 'react'
import {useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'
function Home() {
  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  async function getNotes(){
    // api.get("/api/notes/")
    // .then((res)=>{setNotes(res.data);console.log(res.data)})
    // .catch((err)=>{console.log(err)})
    const res = await api.get('/api/notes/').catch((err)=>{console.log(err)})
    console.log(res)
    setNotes(res.data)
  }

  const deleteNote = (id) => {
    api
        .delete(`/api/notes/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Note deleted!");
            else alert("Failed to delete note.");
            getNotes();
        })
        .catch((error) => alert(error));
};
  function handleSubmit(e){
    e.preventDefault()
    api.post('/api/notes/', {title, content})
    .then((res)=>getNotes())
    .catch((err)=>{alert(err)})
  }
  useEffect(()=>{
    getNotes()
  },[])
  return (
    <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
                type="text"
                id="title"
                name="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br />
            <input type="submit" value="Submit"></input>
        </form>
    </div>
);
}

export default Home
