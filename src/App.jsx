import React, { useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md';
import StikyNotes from './components/StikyNotes'

const App = () => {

  const [notes,setNotes] = useState([]);

  const addNotes =()=>{
    setNotes([...notes,{id:Date.now(),text:"Click to add text"}])
  }
  console.log(notes);
  return (
    <> 
    <div className='bg-gray-800 flex items-center justify-center gap-3 text-white'>
        <h1 className='p-4'>StikyNotes</h1>
        <MdOutlineAdd onClick={addNotes} className='font-extrabold text-4xl' />
      </div>

    <div>
      {notes.map((x)=>{
        return <StikyNotes key={x.id} id={x.id} text={x.text}/>
      })}
    </div>

    </>
  )
}

export default App