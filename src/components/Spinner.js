import React from 'react';
import loading from './loading.gif';


export const Spinner=()=>{
  
    return (
      <div className='text-center my-3 sm'>
        <img src={loading} alt="" />
      </div>
    )
  
}

export default Spinner
