import React from 'react'

export const ButtonChangeDarkOrLight = (props) => {
  return (
    <div>
        <button className='w-[78px] flex items-center gap-2 cursor-pointer text-[#697c9a] outline-none'>
            {props.name}
            {props.icon}
        </button>
    </div>
  )
}
