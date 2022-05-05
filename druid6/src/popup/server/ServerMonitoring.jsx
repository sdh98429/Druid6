import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inputFile } from './serverSlice';

export default function ServerMonitoring() {
  const dispatch = useDispatch();

  const handleChangeSaveInput = (e) => {
    dispatch(inputFile(e.target.value));
  }

  const file = useSelector(state => state.server.file);

  return (
    <div>
      <h1>서버 모니터링</h1>
      <input type="text" onChange={(e) => handleChangeSaveInput(e)}/>
      <h2>{file}</h2>
    </div>
  );
}
