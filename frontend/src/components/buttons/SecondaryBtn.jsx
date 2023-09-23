import React from 'react'

const SecondaryBtn = (props) => {
    const {setInputText} = props;
  return (
    <button onClick={() => setInputText("")} className="py-2 px-10 border border-sky-400 text-white rounded-md font-medium uppercase hover:bg-sky-900 transition-all duration-200">Clear</button>
  )
}

export default SecondaryBtn
