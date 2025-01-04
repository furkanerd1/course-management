import React from 'react'

function NewSelect({text,name,value,onChange,list}) {
  return (
    <>
    <div className='mb-3'>
      <label className="form-label fw-bold">{text}</label>
         <select className="form-select" id="floatingSelect" name={name} value={Number(value)} onChange={onChange} >
                <option>{`Select the ${text}`}</option>
                {
                    list.map((data) => (
                         <option value={data.id} key={data.id}>
                            {data.name + ' ' + data.surName}
                         </option>
                    ))
                }
        </select>
    </div>
    </>
  )
}

export default NewSelect