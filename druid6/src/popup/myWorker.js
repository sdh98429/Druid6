/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
  self.onmessage = async function( e ) {
    const response = await fetchRequest(e)
    postToMain(response)
    close()
  }
  
  const fetchRequest = async(e) => {
    const response = await fetch(e.data.url, {
      method: e.data.method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        e.data.body
      )
    })
    return response.json()
  }

  const postToMain = async(e) => {
    postMessage(e)
    postMessage('work end')
  }

};