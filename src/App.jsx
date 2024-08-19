import React, { useState, useEffect } from 'react';
import { MdOutlineAdd } from 'react-icons/md';
import StikyNotes from './components/StikyNotes';
import Auth from './components/Auth';
import { supabase } from './supabaseClient';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if a user session exists
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  //Get Notes
  const fetchNotes = async () => {
    if (session) {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', session.user.id); // Fetch notes for the logged-in user

      if (error) {
        console.error('Error fetching notes:', error);
      } else {
        setNotes(data);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [session]);


  //addNotes

  const addNotes = async () => {
    if (session) {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ text: "Click to add text", user_id: session.user.id }])
        .select();

      if (error) {
        console.error('Error adding note:', error);
      } else {
        setNotes([data[0], ...notes]);
      }
    }
  };


  //updateNote

  const updateNote = async (id, newText) => {
    if (session) {
      const { data, error } = await supabase
        .from('notes')
        .update({ text: newText })
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error updating note:', error);
      } else {
        setNotes(prevNotes =>
          prevNotes.map(note => note.id === id ? { ...note, text: newText } : note)
        );
      }
    }
  };


  //DeleteNote

  const deleteNote = async (id) => {
    if (session) {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Error deleting note:', error);
      } else {
        setNotes(notes.filter(note => note.id !== id));
      }
    }
  };


  //Logout

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error logging out:', error);
    setSession(null);
  };



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {!session ? (
        <Auth setSession={setSession} />
      ) : (
        <>
          <div className='flex flex-col md:flex-row md:justify-between items-center bg-gray-800 text-white p-4 rounded-lg mb-6'>
            <h1 className='text-lg md:text-xl font-bold mb-4 md:mb-0'>StikyNotes</h1>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <MdOutlineAdd onClick={addNotes} className='text-3xl md:text-4xl cursor-pointer hover:text-gray-400' />
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200'
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
      )}
    </div>
  );
};

export default App;
