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
  traffic:'',
  currentMenuTitle: 'Druid6',
  stressTestScenarios: [],
  vusers: 1,
  stressTestResult : {
    status : {
      1 : 0,
      2 : 0,
      3 : 0,
      4 : 0,
      5 : 0
    },
    responseLatencies : [0],
    vuserCount : 0,
    scenarioCount : 0
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
  else if(action.type === 'updateMenuTitle') {
    return {
      ...state,
      currentMenuTitle : action.payload.title
    }
  }
  else if (action.type === 'updateStressTestScenarios') {
    const scenario = action.payload.scenario
    return {
      ...state,
      stressTestScenarios: [...state.stressTestScenarios, scenario]
    }
  }
  else if (action.type === 'updateVusers') {
    return {
      ...state,
      vusers: action.payload.vusers
    }
  }
  else if (action.type === 'updateResponseStatus') {
    const status = action.payload.status
    return {
      ...state,
      stressTestResult : {
        ...state.stressTestResult,
        status: status
      }
    }
  }
  else if (action.type === 'updateResponseLatencies') {
    const latencies = action.payload.latencies
    return {
      ...state,
      stressTestResult : {
        ...state.stressTestResult,
        responseLatencies : latencies
      }
    }
  }
  else if (action.type === 'updateResponseVuserCount') {
    const vuserCount = action.payload.vuserCount
    return {
      ...state,
      stressTestResult : {
        ...state.stressTestResult,
        vuserCount
      }
    }
  }
  else if (action.type === 'updateResponseScenarioCount') {
    const scenarioCount = action.payload.scenarioCount
    return {
      ...state,
      stressTestResult : {
        ...state.stressTestResult,
        scenarioCount
      }
    }
  }

  return state;
}

