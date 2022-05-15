const initialState = {
  stressTestInputs: {
    method: 'POST',
    url: '',
    body: '',
    savedResponse: '',
    useToken: false,
  }

};

export default function reducer(state = initialState, action) {
  if (action.type === 'updateStressTestInputs') {
    const key = action.payload.inputs.key
    const value = action.payload.inputs.value
    return {
      ...state,
      stressTestInputs: {
        ...state.stressTestInputs,
        [key]: value
      },
    };
  }
  // 여기 밑에 else if 문으로 action type 적으시면 됩니다.
  else if (true) {
    
  }

  return state;
}
