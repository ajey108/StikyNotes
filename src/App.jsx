import React, { useState, useEffect } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import StikyNotes from './components/StikyNotes';


import { supabase } from './supabaseClient';
const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes()
  }, [])

  //get all rows
  const fetchNotes = async () => {
    try {

      let { data, error } = await supabase
        .from('notes')
        .select('*');
      if (error) {
        throw error;
      }

      setNotes(data || [])

    } catch (error) {
      console.log("Error fetching notes:", error.message);
    }
  }

  //add rows
  const addNotes = async () => {
    //to add rows
    try {

      const { data, error } = await supabase
        .from('notes')
        .insert([
          { text: 'Click to add text' },
        ])
        .select()
      setNotes([...notes, { id: Date.now(), text: "Click to add text" }]);


    } catch (error) {
      console.log("Error Adding notes:", error.message);
    }

  };

  const updateNote = async (id, newText) => {
    try{
      
const { data, error } = await supabase
.from('notes')
.update({text: newText })
.eq('id', id )
.select()
setNotes(prevNotes =>
  prevNotes.map(note => note.id === id ? { ...note, text: newText } : note)
);     

    } catch(error){
      console.log("Error Updating notes:", error.message);
    }


   
  };

  const deleteNote = async(id) => {
    try{
      
const { error } = await supabase
.from('notes')
.delete()
.eq('id', id)
setNotes(notes.filter(note => note.id !== id))
        
    }catch(error){
      console.log("Error Deleting note:",error.message);
    }
   
    alert('Note deleted')
  }

  return (
    <>
      <div className='bg-gray-800 flex items-center justify-center gap-3 text-white'>
        <h1 className='p-4'>StikyNotes</h1>
        <MdOutlineAdd onClick={addNotes} className='font-extrabold text-4xl' />
      </div>

      <div>
        {notes.map(note => (
          <StikyNotes
            key={note.id}
            id={note.id}
            text={note.text}
            updateNote={updateNote}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </div>
    </>
  );
};

export default App;
