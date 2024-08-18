import React, { useState } from 'react';
import { PiPencilSimpleBold } from 'react-icons/pi';
import { RiDeleteBin3Line } from 'react-icons/ri';

const StikyNotes = ({id,text}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleShow = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = ()=>{
    setIsEdit(!isEdit);
  }

 

  return (
    <>
      

      <div className='flex gap-3 items-center m-4'>
        <PiPencilSimpleBold onClick={handleShow}  className='text-2xl cursor-pointer' />
        <RiDeleteBin3Line className='text-2xl cursor-pointer' />
        <button onClick={handleSave} className='bg-white w-[50px] rounded-sm h-9'>Save</button>
      </div>

      {
        isEdit && (
          <div className="m-4 w-[450px]">
            <textarea className='bg-yellow-100 w-[400px] h-[300px]' name="text"><p>{text}</p></textarea>
          </div>
        )
      }
    </>
  );
}

export default StikyNotes;
