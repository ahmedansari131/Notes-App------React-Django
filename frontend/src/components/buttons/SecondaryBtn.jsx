import React from 'react'

const SecondaryBtn = (props) => {
    const {setInputText, text} = props;
  return (
    <button onClick={() => setInputText("")} className="py-2 px-6 w-full border border-green-700 text-white rounded-md font-normal hover:bg-green-800  transition-all duration-200">{text}</button>
  )
}

export default SecondaryBtn
