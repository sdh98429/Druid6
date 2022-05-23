/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export

let savedResponse = {}
self.onmessage = async function( e ) {

  for (let i = 0; i < e.data.length; i++) {
    const response = await sendRequest(e.data[i])
    const saveReqResponse = e.data[i].savedResponse

    for ( const res of saveReqResponse) {
      savedResponse['$.' + res] = response[res]
    }
  }
  postMessage({'workEnd' : 'workEnd'});
  close()
}

const sendRequest = async(e) => {
  const myRequest = {
    method: e.method
  }
  const headers = {
    'Content-type': 'application/json'
  }
  // token 값 검사
  if (e.token) {
    e.token = e.token.substr(0, 2) === "$." ? savedResponse[e.token] : e.token
    headers['Authorization'] = 'Bearer ' + e.token
  } 
  myRequest['headers'] = headers

  // body 검사

  if (e.body) { 

    for (let [key, value] of Object.entries(e.body)){
      if (typeof value === 'string' && value.substr(0,2) === "$.") {
        e.body[key] = savedResponse[value]
      }
    }
    myRequest['body'] = JSON.stringify(e.body)
  }
  // url 검사 후 response 내부 변수 사용시 변경
  e.url = checkUrl(e.url)

  // latency 측정용 startTime
  const startTime = Date.now()
  console.log(myRequest.body)
  try {
    const response = await fetch(e.url, myRequest)
    postMessage( { "latencySended" : Date.now()-startTime } )
    postMessage({ "statusCode" : response.status })
    const statusCode = (response.status + '')[0]
    if ( e.savedResponse.length && statusCode !== '4' && statusCode !== '5' ) {
      return response.json()
    }
    return false
  } catch (error) {
    console.error(error)
  }
  // postMessage(response.status.data)
}

const checkUrl = (url) => {
  for (let idx = 0; idx < url.length-2; idx++) {
    if (['/','='].includes(url[idx-1]) && url.substr(idx, 2) === '$.') {
      let j = 1
      while(true) {
        if (['/', '=', ':', '?'].includes(url[idx+j]) || idx+j >= url.length) {
          break
        }
        j++
      }
      let transPath = savedResponse[url.substring(idx, idx+j)]
      url = url.substring(0, idx) + transPath + url.substring(idx+j)
      idx += j
    }
  }
  return url
}
