import React from 'react'

export default function Solutions(props) {
  
  const mobile = props.mobile;

  return (
    <div>
      {props.displaySolutions === true ? <p>성공</p> : <p>노성공</p>}
      <p>{JSON.stringify(mobile)}</p>
    </div>
  );
}