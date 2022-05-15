import React from 'react'

export default function Solutions(props) {
  return (
    <div>
      {props.displaySolutions === true ? <p>성공</p> : <p>노성공</p>}
    </div>
  );
}