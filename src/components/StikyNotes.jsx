import React, { useState } from 'react';
import { PiPencilSimpleBold } from 'react-icons/pi';
import { RiDeleteBin3Line } from 'react-icons/ri';

const StikyNotes = ({ id, text, updateNote, deleteNote }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleShow = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    updateNote(id, newText);
    setIsEdit(!isEdit);
  };

  const handleText = (e) => {
    setNewText(e.target.value);
  };

  return (
    <>
      <div className='flex gap-3 items-center m-4'>
        <PiPencilSimpleBold onClick={handleShow} className='text-2xl cursor-pointer' />
        <RiDeleteBin3Line onClick={deleteNote} className='text-2xl cursor-pointer' />
        <button onClick={handleSave} className='bg-white w-[50px] rounded-sm h-9'>Save</button>
      </div>

      {isEdit && (
        <div className="m-4 w-[450px]">
          <textarea
            onChange={handleText}
            className='bg-yellow-100 w-[400px] h-[300px]'
            value={newText}
          />
        </div>
      )}
    </>
  );
}

export default StikyNotes;
