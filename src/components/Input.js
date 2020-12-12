import React from 'react'

const Input = props => {
  const {handleChange, id, name, placeholder, type, value} = props
    return (
      <>
        <label htmlFor={name}>{name}</label>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </>
    )
}

export default Input
