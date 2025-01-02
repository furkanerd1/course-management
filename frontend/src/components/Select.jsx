import React from 'react'

function Select({text,name,value,onChange,option1,option2}) {
  return (
    <>
    <div className='mb-3'>
      <label className="form-label fw-bold">{text}</label>
         <select className="form-select" id="floatingSelect" name={name} value={value} onChange={onChange} >
                <option>{`Select the ${text}`}</option>
                <option value={option1}>{option1}</option>
                <option value={option2}>{option2}</option>
        </select>
    </div>
    </>
  )
}

export default Select