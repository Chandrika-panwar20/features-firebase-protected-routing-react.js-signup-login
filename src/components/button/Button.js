import React from 'react'

export const Button = ({ label, ...rest }) => {
  return ( <button {...rest}> {label} </button> )
}
