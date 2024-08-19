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
    <div className="bg-green-100 shadow-lg rounded-lg p-4 w-full sm:w-96 mb-4">
      <div className='flex justify-between items-center  mb-2'>
        <PiPencilSimpleBold onClick={handleShow} className='text-xl cursor-pointer hover:text-green-600' />
        <RiDeleteBin3Line onClick={deleteNote} className='text-xl cursor-pointer hover:text-red-600' />
      </div>

      {isEdit ? (
        <textarea
          onChange={handleText}
          className='w-full h-40 bg-green-50 p-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500'
          value={newText}
        />
      ) : (
        <p className="text-gray-800">{newText}</p>
      )}

      {isEdit && (
        <button
          onClick={handleSave}
          className='mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200'
        >
          Save
        </button>
      )}
    </div>
  );
}

export default StikyNotes;
