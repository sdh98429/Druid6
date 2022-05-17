export function updateStressTestInputs(inputs) {
  return {
    type: 'updateStressTestInputs',
    payload: {
      inputs
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
