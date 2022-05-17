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
