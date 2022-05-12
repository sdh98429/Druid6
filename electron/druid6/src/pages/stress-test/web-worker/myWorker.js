/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
  let savedResponse = {}
  self.onmessage = async function( e ) {

    for (let i = 0; i < e.data.length; i++) {
      const response = await sendRequest(e.data[i])
      const saveReqResponse = e.data[i].useResponse

      for ( const res of saveReqResponse) {
        savedResponse['$.' + res] = response[res]
      }

      if (response) {
        postMessage(response)
      }
      
    }
    postMessage('work end');
    close()
  }
  
  const sendRequest = async(e) => {
    // token 값 검사
    if (e.token) {
      e.token = e.token.substr(0, 2) === "$." ? savedResponse[e.token] : e.token
    }

    // body 검사
    for (let [key, value] of Object.entries(e.body)){
      if (typeof value === 'string' && value.substr(0,2) === "$.") {
        e.body[key] = savedResponse[value]
      }
    }
    // url 검사 후 response 내부 변수 사용시 변경
    e.url = checkUrl(e.url)

    try {
      const response = await fetch(e.url, {
        method: e.method,
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + e.token
        },
        body: JSON.stringify(
          e.body
        )
      })
      postMessage(response.status)
      const statusCode = (response.status + '')[0]
      if ( e.useResponse.length && statusCode !== '4' && statusCode !== '5' ) {
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
};