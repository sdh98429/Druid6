const initialState = {
  stressTestInputs: {
    method: 'POST',
    url: '',
    body: '',
    savedResponse: [],
    savedResponseUnit: '',
    token: '',
    scenarioTitle : '',
  },
  serverInfo: {
    processInfo:'',
    osInfo: '',
    ramInfo: '',
    systemInfo: '',
    kernelVersion: '',
    kernelRelease: ''
  },
  traffic:''
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
  else if (action.type === 'updateServerInfo') {
      const key = action.payload.infos.key
      const value = action.payload.infos.value
      return {
        ...state,
        serverInfo: {
          ...state.serverInfo,
          [key]: value
        }
      }
  }else if (action.type === 'updateNetworkInfo'){
    return{
      ...state,
      traffic:action.payload.traffic.value
    }
  }
  else if(action.type === 'updateStressTestResponse') {
    const capturedResponse = action.payload.capturedResponse
    return {
      ...state,
      stressTestInputs: {
        ...state.stressTestInputs,
        savedResponse: [
          ...state.stressTestInputs.savedResponse,
          capturedResponse
        ]
      }
    }
  }

  return state;
}
