import React from 'react'

const Input = (props) => {
    const{placeholder, icon} = props;
  return (
    <input className='p-3 rounded-md outline-none w-full bg-slate-800 text-white px-4 border-none' type="search" name="search" id="search" placeholder={placeholder}/>
  )
}

export default Input
