export function updateStressTestInputs(inputs) {
  return {
    type: 'updateStressTestInputs',
    payload: {
      inputs
    },
  };
}
export function updateStressTestResponse(capturedResponse) {
  return {
    type: 'updateStressTestResponse',
    payload: {
      capturedResponse
    },
  };
}
export function updateServerInfo(infos){
  return {
    type : 'updateServerInfo',
    payload : {
      infos
    }
  }
}
export function updateNetworkInfo(traffic){
  return {
    type : 'updateNetworkInfo',
    payload : {
      traffic
    }
  }
}
export function updateStressTestScenarios(scenario) {
  return {
    type : 'updateStressTestScenarios',
    payload : {
      scenario
    }
  }
}
export function updateVusers(vusers) {
  return {
    type : 'updateVusers',
    payload : {
      vusers
    }
  }
}
