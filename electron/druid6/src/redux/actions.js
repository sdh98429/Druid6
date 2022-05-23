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

export function updateMenuTitle(title){
  return {
    type : 'updateMenuTitle',
    payload : {
      title
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
export function updateResponseStatus(status) {
  return {
    type: 'updateResponseStatus',
    payload : {
      status
    }
  }
}
export function updateResponseLatencies(latencies) {
  return {
    type: 'updateResponseLatencies',
    payload : {
      latencies
    }
  }
}

export function updateResponseVuserCount(vuserCount) {
  return {
    type: 'updateResponseVuserCount',
    payload : {
      vuserCount
    }
  }
}

export function updateResponseScenarioCount(scenarioCount) {
  return {
    type: 'updateResponseScenarioCount',
    payload : {
      scenarioCount
    }
  }
}
export function updateMyPageMobileData(myPageMobileData) {
  return {
    type : 'updateMyPageMobileData',
    payload : {
      myPageMobileData
    }
  }
}
export function updateMyPageDesktopData(myPageDesktopData) {
  return {
    type : 'updateMyPageDesktopData',
    payload : {
      myPageDesktopData
    }
  }
}
export function clearStressTestInputs() {
  return {
    type : 'clearStressTestInputs'
  }
}
export function replaceStressTestScenarios(scenarios) {
  return {
    type : 'replaceStressTestScenarios',
    payload : {
      scenarios
    }
  }
}