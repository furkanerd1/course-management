import React from 'react'

function Input({text,name,type,placeholder,maxLength,minLength,value,onChange}) {
  return (
    <>
    <div className="mb-3">
    <label className="form-label fw-bold">{text}</label>
    <input  type={type} name={name} className="form-control" placeholder={placeholder} maxLength={maxLength} minLength={minLength}
    autoComplete='off' value={value} onChange={onChange}/>  
    </div>
    </> 
  )
}

export default Input


// <label className="form-label fw-bold">Identity No</label>
// <input  type='text' className="form-control" placeholder='enter the Identity no' maxLength={11} minLength={11}
// autoComplete='off' value={getSelectedUser.identityNo} onClick={(e) => handleInputChange(e)}/>  