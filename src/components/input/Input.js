import React  from "react";

import './input.css'

 export const Input = ({ label, errorMessage, ...rest}) => {
    return(
        <>
            <span> {label} </span>
            <div> <input  {...rest} /></div>
            <p className='signup-error' > {errorMessage} </p>
        </>
    )
 }