import React from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import { PiPencilSimpleBold } from 'react-icons/pi'
import { RiDeleteBin3Line } from 'react-icons/ri'

const StikyNotes = () => {
  return (

        <>
        <div className='bg-gray-800 flex items-center justify-center gap-3 text-white'>
        <h1 className='p-4'> StiKyNotes</h1>
        <MdOutlineAdd className='font-extrabold text-4xl' />
        </div>
      
        <div className="flex justify-center items-center m-4">
            <textarea className='bg-yellow-100 w-[400px] h-[300px]' name="text" ></textarea>
            <span><PiPencilSimpleBold/>
            <RiDeleteBin3Line /></span>
        </div>
        

    

        </>
  

    
  )
}

export default StikyNotes